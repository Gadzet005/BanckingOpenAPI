import { FC } from "react";
import { Transaction } from "./transaction";

interface Props {
  transaction: Transaction;
}

export const TransactionView: FC<Props> = ({ transaction }) => {
  const amountView =
    transaction.type === "income" ? (
      <span className="fs-5 text-success">{transaction.formattedAmount}</span>
    ) : (
      <span className="fs-5 text-danger">{transaction.formattedAmount}</span>
    );

  return (
    <li className="list-group-item border border-2 rounded-3 bg-light">
      <div className="row d-flex align-items-center">
        <div className="col-2 px-2">
          <div>
            <div className="d-flex justify-content-center">
              {transaction.categoryIcon}
            </div>
            <p className="d-flex justify-content-center">
              {transaction.formattedCategory}
            </p>
          </div>
        </div>
        <div className="col-10 d-flex justify-content-center">
          <div>
            <div className="d-flex justify-content-center">{amountView}</div>
            <p className="d-flex justify-content-center">
              {transaction.formattedDate}
            </p>
          </div>
        </div>
      </div>
    </li>
  );
};
