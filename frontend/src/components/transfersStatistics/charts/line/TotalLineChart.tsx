import React from "react";
import { LineChartProps } from "../chartProps";
import { BaseLineChart } from "./BaseLineChart";

export const TotalLineChart: React.FC<LineChartProps> = ({
  list,
  useLinearRegression = false,
}) => {
  const today = new Date();
  const curYear = today.getFullYear();

  const expenseCount = new Map<number, number>();
  const incomeCount = new Map<number, number>();

  for (let i = curYear - 5; i <= curYear; i++) {
    expenseCount.set(i, 0);
    incomeCount.set(i, 0);
  }

  list.forEach((transfer) => {
    const year = transfer.date.getFullYear();
    if (!expenseCount.has(year)) {
      expenseCount.set(year, 0);
    }
    if (!incomeCount.has(year)) {
      incomeCount.set(year, 0);
    }

    if (transfer.type == "expense") {
      expenseCount.set(year, expenseCount.get(year)! + transfer.amount);
    } else {
      incomeCount.set(year, incomeCount.get(year)! + transfer.amount);
    }
  });

  return (
    <BaseLineChart
      axisData={Array.from(expenseCount.keys())}
      axisLabel="Месяц"
      expensesData={Array.from(expenseCount.values())}
      incomesData={Array.from(incomeCount.values())}
      axisFormatter={(num) => (Number.isInteger(num) ? num.toString() : "")}
      useLinearRegression={useLinearRegression}
    />
  );
};
