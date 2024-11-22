import React from "react";
import { months } from "../../../../public/transfer/dateUtils";
import { LineChartProps } from "../chartProps";
import { BaseLineChart } from "./BaseLineChart";

const axisValues: Array<number> = [...Array(12).keys()];

export const YearLineChart: React.FC<LineChartProps> = ({
  list,
  useLinearRegression = false,
}) => {
  const expenseCount = new Array<number>(12).fill(0);
  const incomeCount = new Array<number>(12).fill(0);

  list.forEach((transfer) => {
    const month = transfer.date.getMonth();
    if (transfer.type == "expense") {
      expenseCount[month] += transfer.amount;
    } else {
      incomeCount[month] += transfer.amount;
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
};
