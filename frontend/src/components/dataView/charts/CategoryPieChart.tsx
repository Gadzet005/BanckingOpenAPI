import { FC } from "react";
import { ChartProps } from "./chartProps";
import { pieArcLabelClasses, PieChart } from "@mui/x-charts";
import { categoryInfo } from "../store/category";
import { observer } from "mobx-react-lite";
import { mochaColors } from "../../../public/colors";

export const CategoryPieChart: FC<ChartProps> = observer(({ store }) => {
  const transactions = store.list;
  const categoryMap = new Map<string, number>();

  transactions.forEach((transaction) => {
    categoryMap.set(
      transaction.getCategory(),
      (categoryMap.get(transaction.getCategory()) || 0) + transaction.amount,
    );
  });

  const totalAmount = transactions.reduce((sum, transaction) => {
    return sum + transaction.amount;
  }, 0);

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
          arcLabel: (category) =>
            `${Math.round((category.value / totalAmount) * 100)}%`,
          arcLabelMinAngle: 10,
          arcLabelRadius: "60%",
          highlightScope: { fade: "global", highlight: "item" },
          faded: {
            innerRadius: 30,
            additionalRadius: -30,
            color: "gray",
          },
          valueFormatter: (item) => `${item.value}₽`,
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fontWeight: "bold",
          fill: mochaColors.mantle,
        },
      }}
    />
  );
});
