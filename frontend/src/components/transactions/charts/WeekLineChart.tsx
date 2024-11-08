import { FC } from "react";
import { ChartProps } from "./chartProps";
import { BaseLineChart } from "./BaseLineChart";
import { weekDays } from "./common";

const axisValues: Array<number> = [...Array(7).keys()];

export const WeekLineChart: FC<ChartProps> = ({ transactions }) => {
  const expenseCount = new Array<number>(7).fill(0);
  const incomeCount = new Array<number>(7).fill(0);

  transactions.forEach((transaction) => {
    const rawDay = transaction.date.getDay();
    const day = rawDay == 0 ? 6 : rawDay - 1;

    if (transaction.type == "expense") {
      expenseCount[day] += transaction.amount;
    } else {
      incomeCount[day] += transaction.amount;
    }
  });

  return (
    <BaseLineChart
      axisData={axisValues}
      axisLabel="День недели"
      axisFormatter={(num) => (Number.isInteger(num) ? weekDays[num] : "")}
      expensesData={expenseCount}
      incomesData={incomeCount}
    />
  );
};
