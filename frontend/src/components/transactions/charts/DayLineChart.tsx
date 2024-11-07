import { LineChart } from "@mui/x-charts";
import { FC } from "react";
import { Transaction } from "../store/transaction";

interface LineChartProps {
  transactions: Transaction[];
}

export const DayLineChart: FC<LineChartProps> = ({ transactions }) => {
  const axisValues = new Array<number>(24);
  for (let i = 0; i < 24; i++) {
    axisValues[i] = i;
  }

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
    <LineChart
      xAxis={[
        {
          data: axisValues,
          label: "Время",
          valueFormatter: (value) => `${value}:00`,
        },
      ]}
      series={[
        {
          label: "Доходы",
          data: incomeCount,
          color: "#a6e3a1",
          valueFormatter: (value) => `${value}₽`,
        },
        {
          label: "Расходы",
          data: expenseCount,
          color: "#f38ba8",
          valueFormatter: (value) => `${value}₽`,
        },
      ]}
      grid={{ vertical: true, horizontal: true }}
    />
  );
};
