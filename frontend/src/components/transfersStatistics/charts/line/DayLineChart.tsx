import React from "react";
import { LineChartProps } from "../chartProps";
import { BaseLineChart } from "./BaseLineChart";

const axisValues = [...Array(24).keys()];

function numToTime(num: number): string {
  if (!Number.isInteger(num)) {
    return "";
  }
  return (num < 10 ? "0" : "") + num.toString() + ":00";
}

export const DayLineChart: React.FC<LineChartProps> = ({
  list,
  useLinearRegression = false,
}) => {
  const expenseCount = new Array<number>(24).fill(0);
  const incomeCount = new Array<number>(24).fill(0);

  list.forEach((transfer) => {
    const hours = transfer.date.getHours();
    if (transfer.type == "expense") {
      expenseCount[hours] += transfer.amount;
    } else {
      incomeCount[hours] += transfer.amount;
    }
  });

  return (
    <BaseLineChart
      axisData={axisValues}
      axisFormatter={(num) => numToTime(num)}
      axisLabel="Время"
      expensesData={expenseCount}
      incomesData={incomeCount}
      useLinearRegression={useLinearRegression}
    />
  );
};
