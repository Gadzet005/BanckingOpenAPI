import { observable, action, makeObservable, computed } from "mobx";
import { Transaction } from "../../public/transaction";
import { TransactionView } from "./transactionView";

export class TransactionList {
  list: Transaction[] = [];
  inited: boolean = false;

  constructor() {
    makeObservable(this, {
      list: observable,
      inited: observable,
      add: action,
      init: action,
      empty: computed,
      view: computed,
    });
  }

  init(transactions: Transaction[]) {
    this.list = transactions;
    this.inited = true;
  }

  add(transaction: Transaction) {
    this.list.push(transaction);
  }

  get empty() {
    return this.list.length === 0;
  }

  get view() {
    return this.list.map((transaction) => (
      <TransactionView key={transaction.id} transaction={transaction} />
    ));
  }
}
