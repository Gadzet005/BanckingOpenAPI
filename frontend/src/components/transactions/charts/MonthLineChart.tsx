import { FC } from "react";
import { ChartProps } from "./chartProps";
import { BaseLineChart } from "./BaseLineChart";
import { getDaysInCurrentMonth } from "./common";
import { observer } from "mobx-react-lite";

export const MonthLineChart: FC<ChartProps> = observer(
  ({ store, useLinearRegression = false }) => {
    const transactions = store.list;

    const daysInMonth = getDaysInCurrentMonth();
    const axisValues: Array<number> = [...Array(daysInMonth).keys()];

    const expenseCount = new Array<number>(daysInMonth).fill(0);
    const incomeCount = new Array<number>(daysInMonth).fill(0);

    transactions.forEach((transaction) => {
      const day = transaction.date.getDate();
      if (transaction.type == "expense") {
        expenseCount[day - 1] += transaction.amount;
      } else {
        incomeCount[day - 1] += transaction.amount;
      }
    });

    return (
      <BaseLineChart
        axisData={axisValues}
        axisLabel="Число"
        expensesData={expenseCount}
        incomesData={incomeCount}
        axisFormatter={(num) => (num + 1).toString()}
        useLinearRegression={useLinearRegression}
      />
    );
  },
);
