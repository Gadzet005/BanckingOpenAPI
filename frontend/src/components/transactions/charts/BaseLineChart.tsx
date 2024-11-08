import { LineChart } from "@mui/x-charts";
import { FC } from "react";

interface BaseLineChartProps {
  axisData: number[];
  axisLabel: string;
  axisFormatter?: (value: number) => string;
  expensesData: number[];
  incomesData: number[];
  min?: number;
  max?: number;
}

export const BaseLineChart: FC<BaseLineChartProps> = ({
  axisData,
  axisLabel,
  expensesData,
  incomesData,
  axisFormatter = (num) => num.toString(),
  min,
  max,
}) => {
  return (
    <LineChart
      xAxis={[
        {
          data: axisData,
          label: axisLabel,
          valueFormatter: axisFormatter,
          min: min,
          max: max,
        },
      ]}
      series={[
        {
          label: "Расходы",
          data: expensesData,
          color: "#f38ba8",
          valueFormatter: (value) => `${value}₽`,
        },
        {
          label: "Доходы",
          data: incomesData,
          color: "#a6e3a1",
          valueFormatter: (value) => `${value}₽`,
        },
      ]}
      grid={{ vertical: true, horizontal: true }}
    />
  );
};
