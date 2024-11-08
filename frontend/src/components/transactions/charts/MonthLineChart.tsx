import { FC } from "react";
import { ChartProps } from "./chartProps";
import { BaseLineChart } from "./BaseLineChart";

function getDaysInCurrentMonth() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();

  const lastDayOfMonth = new Date(year, month + 1, 0);

  return lastDayOfMonth.getDate();
}
export const MonthLineChart: FC<ChartProps> = ({ transactions }) => {
  const daysInMonth = getDaysInCurrentMonth();

  const axisValues: Array<number> = [];
  for (let i = 0; i < daysInMonth; i++) {
    axisValues.push(i);
  }

  const expenseCount = new Array<number>(daysInMonth).fill(0);
  const incomeCount = new Array<number>(daysInMonth).fill(0);

  transactions.forEach((transaction) => {
    const day = transaction.date.getDate();
    if (transaction.type == "expense") {
      expenseCount[day] += transaction.amount;
    } else {
      incomeCount[day] += transaction.amount;
    }
  });

  return (
    <BaseLineChart
      axisData={axisValues}
      axisLabel="День месяца"
      expensesData={expenseCount}
      incomesData={incomeCount}
    />
  );
};
