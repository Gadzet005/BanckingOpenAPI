import { FC } from "react";
import { ChartProps } from "./chartProps";
import { PieChart } from "@mui/x-charts";
import { categoryInfo } from "../store/category";
import { observer } from "mobx-react-lite";

export const CategoryPieChart: FC<ChartProps> = observer(({ store }) => {
  const transactions = store.list;
  const categoryMap = new Map<string, number>();

  transactions.forEach((transaction) => {
    categoryMap.set(
      transaction.getCategory(),
      (categoryMap.get(transaction.getCategory()) || 0) + transaction.amount,
    );
  });

  const pieData: Array<{ name: string; value: number }> = Array.from(
    categoryMap.entries(),
  ).map(([category, amount]) => ({
    name: category,
    value: amount,
  }));

  return (
    <PieChart
      series={[
        {
          data: pieData.map((cat, idx) => {
            const info = categoryInfo[cat.name];
            return {
              id: idx,
              label: info.name,
              value: cat.value,
              color: info.color,
            };
          }),
        },
      ]}
    />
  );
});
