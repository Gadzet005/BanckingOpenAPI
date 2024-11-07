import { LineChart } from "@mui/x-charts";
import { FC } from "react";
import { Transaction } from "../transaction";

type ChartType = "day" | "week" | "month" | "year" | "all";

interface LineChartProps {
  transactions: Transaction[];
  type: ChartType;
}

export const TransactionLineChart: FC<LineChartProps> = ({
  transactions,
  type,
}) => {
  return (
    <LineChart
      series={[
        {
          data: [2, 5.5, 2.5, 8.5, 2, 5, 10, 9, 5, 7],
          color: "#a6e3a1",
        },
        {
          data: [1, 3.5, 2, 6.5, 1.5, 4, 3, 4, 8, 10],
          color: "#f38ba8",
        },
      ]}
      grid={{ vertical: true, horizontal: true }}
    />
  );
};
