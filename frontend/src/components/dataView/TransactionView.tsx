import { FC } from "react";
import { Transaction } from "./store/transaction";
import { Box, Typography } from "@mui/material";
import { mochaColors } from "../../public/colors";

interface Props {
  transaction: Transaction;
}

export const TransactionView: FC<Props> = ({ transaction }) => {
  const amountView =
    transaction.type === "income" ? (
      <Typography
        component="span"
        variant="h6"
        sx={{ color: mochaColors.green }}
      >
        {transaction.formattedAmount}
      </Typography>
    ) : (
      <Typography component="span" variant="h6" sx={{ color: mochaColors.red }}>
        {transaction.formattedAmount}
      </Typography>
    );

  return (
    <Box sx={{ borderRadius: 4, py: 1, px: 1, bgcolor: mochaColors.surface0 }}>
      <Box className="row">
        <Box sx={{ px: 2 }} className="col-4">
          <Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              {transaction.categoryIcon}
            </Box>
            <Typography sx={{ textAlign: "center" }}>
              {transaction.formattedCategory}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{ display: "flex", justifyContent: "center" }}
          className="col-8"
        >
          <Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              {amountView}
            </Box>
            <Typography sx={{ textAlign: "center" }}>
              {transaction.formattedDate}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
