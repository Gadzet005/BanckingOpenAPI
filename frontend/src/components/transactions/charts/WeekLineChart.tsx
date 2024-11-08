import { FC } from "react";
import { ChartProps } from "./chartProps";
import { BaseLineChart } from "./BaseLineChart";

const dayOfWeek = [
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
  "Воскресенье",
];

const axisValues: Array<number> = [];
for (let i = 0; i < 7; i++) {
  axisValues.push(i);
}

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
      axisFormatter={(num) => (axisValues.includes(num) ? dayOfWeek[num] : "")}
      expensesData={expenseCount}
      incomesData={incomeCount}
    />
  );
};
