import { pieArcLabelClasses, PieChart } from "@mui/x-charts";
import React from "react";
import { mochaColors } from "../../../public/style/colors";
import { categoryInfo } from "../../../public/transfer/categoryInfo";
import { ChartProps } from "./chartProps";

export const CategoryPieChart: React.FC<ChartProps> = ({ list }) => {
  const categories: Record<string, number> = {};

  let totalAmount = 0;
  list.forEach((transfer) => {
    const category = transfer.getCategory();
    categories[category] = (categories[category] || 0) + transfer.amount;
    totalAmount += transfer.amount;
  });

  const pieData: Array<{ name: string; value: number }> = [];
  for (const [key, value] of Object.entries(categories)) {
    pieData.push({ name: key, value });
  }

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
      margin={{ right: 200 }}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fontWeight: "bold",
          fill: mochaColors.mantle,
        },
      }}
    />
  );
};
