import { FC, useEffect, useState } from "react";
import { getTransactions } from "../../api/transactions";
import { TransactionList } from "./transactionList";
import { observer } from "mobx-react-lite";

export const TransactionListView: FC = observer(() => {
  const [transactionList] = useState(() => new TransactionList());

  useEffect(() => {
    getTransactions().then((transactions) => {
      if (!transactionList.inited) {
        transactionList.init(transactions);
      }
    });
  }, []);

  const listView =
    transactionList.empty && transactionList.inited ? (
      <p className="fs-4 text-center">Список пуст.</p>
    ) : (
      <div className="d-flex justify-content-center">
        <ul className="col-6 list-group">{transactionList.view}</ul>
      </div>
    );

  return (
    <div>
      <h1 className="text-center mb-5">Список транзакций</h1>
      {listView}
    </div>
  );
});
