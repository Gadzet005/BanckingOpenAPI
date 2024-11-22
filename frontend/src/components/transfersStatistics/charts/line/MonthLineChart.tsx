import React from "react";
import { getDaysInCurrentMonth } from "../../../../public/transfer/dateUtils";
import { LineChartProps } from "../chartProps";
import { BaseLineChart } from "./BaseLineChart";

export const MonthLineChart: React.FC<LineChartProps> = ({
  list,
  useLinearRegression = false,
}) => {
  const daysInMonth = getDaysInCurrentMonth();
  const axisValues: Array<number> = [...Array(daysInMonth).keys()];

  const expenseCount = new Array<number>(daysInMonth).fill(0);
  const incomeCount = new Array<number>(daysInMonth).fill(0);

  list.forEach((transfer) => {
    const day = transfer.date.getDate();
    if (transfer.type == "expense") {
      expenseCount[day - 1] += transfer.amount;
    } else {
      incomeCount[day - 1] += transfer.amount;
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
};
