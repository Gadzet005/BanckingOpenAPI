import { FC } from "react";
import { ChartProps } from "./chartProps";
import { BaseLineChart } from "./BaseLineChart";
import { months } from "./common";
import { observer } from "mobx-react-lite";

const axisValues: Array<number> = [...Array(12).keys()];

export const YearLineChart: FC<ChartProps> = observer(
  ({ store, useLinearRegression }) => {
    const transactions = store.list;
    const expenseCount = new Array<number>(12).fill(0);
    const incomeCount = new Array<number>(12).fill(0);

    transactions.forEach((transaction) => {
      const month = transaction.date.getMonth();
      if (transaction.type == "expense") {
        expenseCount[month] += transaction.amount;
      } else {
        incomeCount[month] += transaction.amount;
      }
    });

    return (
      <BaseLineChart
        axisData={axisValues}
        axisLabel="Месяц"
        expensesData={expenseCount}
        incomesData={incomeCount}
        axisFormatter={(num) => (Number.isInteger(num) ? months[num] : "")}
        useLinearRegression={useLinearRegression}
      />
    );
  },
);
