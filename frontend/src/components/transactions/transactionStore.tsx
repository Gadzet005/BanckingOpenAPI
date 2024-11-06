import { observable, action, makeObservable, computed } from "mobx";
import { ITransaction } from "../../public/transaction";
import { Transaction } from "./transaction";
import { TransactionView } from "./transactionView";

export class TransactionStore {
  list: Transaction[] = [];

  constructor(transactionList: ITransaction[]) {
    this.list = transactionList.map(
      (transaction) => new Transaction(transaction),
    );

    makeObservable(this, {
      list: observable,
      add: action,
      isEmpty: computed,
      view: computed,
    });
  }

  add(transaction: ITransaction) {
    this.list.push(new Transaction(transaction));
  }

  get isEmpty(): boolean {
    return this.list.length === 0;
  }

  get view() {
    return this.list.map((transaction) => (
      <TransactionView key={transaction.id} transaction={transaction} />
    ));
  }
}
