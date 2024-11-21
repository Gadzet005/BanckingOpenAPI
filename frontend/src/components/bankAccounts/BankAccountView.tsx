import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { mochaColors } from "../../public/style/colors";
import { BankAccount } from "../../public/bankAccount/BankAccount";

interface BankAccountViewProps {
  account: BankAccount;
  hideToggleButtonDisabled?: boolean;
  onHideToggleClick?: (accountCode: number) => void;
}

export const BankAccountView: React.FC<BankAccountViewProps> = ({
  account,
  hideToggleButtonDisabled = false,
  onHideToggleClick = () => {},
}) => {
  return (
    <Box
      sx={{
        bgcolor: mochaColors.base,
        p: 3,
        borderRadius: 4,
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box>
        <Typography variant="h6">Банк: {account.bankName}</Typography>
        <Typography variant="subtitle1">Счет: {account.code}</Typography>
      </Box>
      <Typography variant="h4" sx={{ color: mochaColors.blue }}>
        {account.balance} руб.
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Typography>{account.isHide ? "Скрыт" : "Отслеживается"}</Typography>
        <Button
          variant="contained"
          disabled={hideToggleButtonDisabled}
          onClick={() => onHideToggleClick(account.code)}
        >
          {account.isHide ? "Отслеживать" : "Скрыть"}
        </Button>
      </Box>
    </Box>
  );
};
