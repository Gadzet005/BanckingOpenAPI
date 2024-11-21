import React from "react";
import { weekDays } from "../../../../public/transfer/dateUtils";
import { LineChartProps } from "../chartProps";
import { BaseLineChart } from "./BaseLineChart";

const axisValues: Array<number> = [...Array(7).keys()];

export const WeekLineChart: React.FC<LineChartProps> = ({
  list,
  useLinearRegression = false,
}) => {
  const expenseCount = new Array<number>(7).fill(0);
  const incomeCount = new Array<number>(7).fill(0);

  list.forEach((transfer) => {
    const rawDay = transfer.date.getDay();
    const day = rawDay == 0 ? 6 : rawDay - 1;

    if (transfer.type == "expense") {
      expenseCount[day] += transfer.amount;
    } else {
      incomeCount[day] += transfer.amount;
    }
  });

  return (
    <BaseLineChart
      axisData={axisValues}
      axisLabel="День недели"
      axisFormatter={(num) => (Number.isInteger(num) ? weekDays[num] : "")}
      expensesData={expenseCount}
      incomesData={incomeCount}
      useLinearRegression={useLinearRegression}
    />
  );
};
