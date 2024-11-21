import { Box, Typography } from "@mui/material";
import React from "react";
import { Transfer } from "../../public/transfer/transfer";
import { mochaColors } from "../../public/style/colors";

interface TransferAggregationProps {
  list?: Transfer[];
}

export const TransferAggregation: React.FC<TransferAggregationProps> = ({
  list = [],
}) => {
  const totalQuantity = list.length;
  const totalAmount = list.reduce((sum, transfer) => {
    if (transfer.type == "income") {
      return sum + transfer.amount;
    }
    return sum - transfer.amount;
  }, 0);
  const totalAmountFormatted = `${totalAmount > 0 ? "+" : ""}${totalAmount} ₽`;

  const categories: Record<string, number> = {};
  list.forEach((transfer) => {
    const category = transfer.formattedCategory;
    categories[category] = (categories[category] || 0) + transfer.amount;
  });

  let maxCategory: string | null = null;
  let maxAmount = 0;
  for (const [key, value] of Object.entries(categories)) {
    if (value > maxAmount) {
      maxCategory = key;
      maxAmount = value;
    }
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", pt: 4, gap: 2 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" sx={{ color: mochaColors.blue }}>
          {totalQuantity}
        </Typography>
        <Typography variant="h6">Количество переводов</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: totalAmount >= 0 ? mochaColors.green : mochaColors.red,
          }}
        >
          {totalAmountFormatted}
        </Typography>
        <Typography variant="h6">Сумма</Typography>
      </Box>
      {maxCategory && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" sx={{ color: mochaColors.blue }}>
            {maxCategory}
          </Typography>
          <Typography variant="h6">Самая популярная категория</Typography>
        </Box>
      )}
    </Box>
  );
};
