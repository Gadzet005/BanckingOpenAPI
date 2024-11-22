import React from "react";
import {
  getBankAccounts,
  toggleBankAccountVisibility,
} from "../../api/bankAccount";
import { BankAccount } from "../../public/bankAccount/BankAccount";
import { Container, Typography } from "@mui/material";
import { BankAccountView } from "./BankAccountView";

export const BankAccounts: React.FC = () => {
  const [accounts, setAccounts] = React.useState<BankAccount[]>([]);
  const [waiting, setWaiting] = React.useState<boolean>(false);

  React.useEffect(() => {
    getBankAccounts().then((result) => {
      setAccounts(result);
    });
  }, []);

  const handleToogleClick = (accountCode: number) => {
    setWaiting(true);
    toggleBankAccountVisibility(accountCode)
      .then((result) => {
        if (!result) {
          console.error("Failed to toggle visibility");
          return;
        }
        setAccounts((prevAccounts) =>
          prevAccounts.map((account) =>
            account.code === accountCode
              ? { ...account, isHide: !account.isHide }
              : account,
          ),
        );
      })
      .finally(() => {
        setWaiting(false);
      });
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
      }}
    >
      <Typography variant="h4">Список счетов</Typography>
      {accounts.length === 0 ? (
        <Typography variant="h6">Пусто...</Typography>
      ) : (
        accounts.map((account, idx) => (
          <BankAccountView
            account={account}
            key={idx}
            hideToggleButtonDisabled={waiting}
            onHideToggleClick={(accountCode) => handleToogleClick(accountCode)}
          />
        ))
      )}
    </Container>
  );
};
