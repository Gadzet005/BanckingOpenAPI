import { action, makeObservable, computed, observable } from "mobx";
import { ITransaction } from "../../../public/transaction";
import { Transaction } from "./transaction";
import { TransactionView } from "../TransactionView";
import { getStartOfWeek } from "../../../public/utils";

const states = ["all", "year", "month", "week", "day"] as const;
type StoreState = (typeof states)[number];

export class TransactionStore {
  all: Transaction[] = [];
  pageSize: number;
  state: StoreState;

  constructor(
    list: ITransaction[],
    state: StoreState = "day",
    pageSize: number = 5,
    isSorted: boolean = false,
  ) {
    this.state = state;
    this.pageSize = pageSize;
    this.all = list.map((transaction) => new Transaction(transaction));

    if (!isSorted) {
      this.all.sort((a, b) => a.date.getTime() - b.date.getTime());
    }

    makeObservable(this, {
      all: observable,
      state: observable,
      add: action,
      total: computed,
      list: computed,
      changeState: action,
    });
  }

  getMinDateForState(): Date {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (this.state === "day") {
      return today;
    } else if (this.state === "week") {
      return getStartOfWeek(today);
    } else if (this.state === "month") {
      today.setDate(0);
      return today;
    } else if (this.state === "year") {
      today.setMonth(0);
      today.setDate(0);
      return today;
    }
    return new Date(0);
  }

  get list(): Transaction[] {
    if (this.state === "all") {
      return this.all;
    }

    const minDate = this.getMinDateForState();
    let list = [];
    for (let i = this.all.length - 1; i >= 0; i--) {
      if (this.all[i].date >= minDate) {
        list.push(this.all[i]);
      } else {
        break;
      }
    }

    return list;
  }

  get pages(): number {
    return Math.ceil(this.list.length / this.pageSize);
  }

  add(transaction: ITransaction) {
    this.all.push(new Transaction(transaction));
  }

  changeState(stateIdx: number) {
    this.state = states[stateIdx];
  }

  getView(page: number) {
    return this.list
      .slice((page - 1) * this.pageSize, page * this.pageSize)
      .map((transaction) => (
        <TransactionView key={transaction.id} transaction={transaction} />
      ));
  }

  get total(): number {
    return this.list.reduce((sum, transaction) => {
      if (transaction.type == "income") {
        return sum + transaction.amount;
      }
      return sum - transaction.amount;
    }, 0);
  }
}
