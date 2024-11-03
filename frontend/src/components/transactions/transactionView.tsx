import { FC } from "react";
import { Transaction } from "../../public/transaction";

interface Props {
  transaction: Transaction;
}

export const TransactionView: FC<Props> = ({ transaction }) => {
  const amountView =
    transaction.type === "income" ? (
      <span className="fs-4 text-success">+ {transaction.amount}₽</span>
    ) : (
      <span className="fs-4 text-danger">- {transaction.amount}₽</span>
    );

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const datetimeString = transaction.date.toLocaleString("ru", options);

  return (
    <li className="list-group-item">
      <div className="d-flex justify-content-between">
        {amountView}
        <span>{datetimeString}</span>
      </div>
    </li>
  );
};
