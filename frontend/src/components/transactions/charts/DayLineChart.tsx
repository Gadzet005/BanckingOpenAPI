import { FC } from "react";
import { ChartProps } from "./chartProps";
import { BaseLineChart } from "./BaseLineChart";

const axisValues = [...Array(24).keys()];

function numToTime(num: number): string {
  if (!Number.isInteger(num)) {
    return "";
  }
  return (num < 10 ? "0" : "") + num.toString() + ":00";
}

export const DayLineChart: FC<ChartProps> = ({ transactions }) => {
  const expenseCount = new Array<number>(24).fill(0);
  const incomeCount = new Array<number>(24).fill(0);

  transactions.forEach((transaction) => {
    const hours = transaction.date.getHours();
    if (transaction.type == "expense") {
      expenseCount[hours] += transaction.amount;
    } else {
      incomeCount[hours] += transaction.amount;
    }
  });

  return (
    <BaseLineChart
      axisData={axisValues}
      axisFormatter={(num) => numToTime(num)}
      axisLabel="Время"
      expensesData={expenseCount}
      incomesData={incomeCount}
    />
  );
};
