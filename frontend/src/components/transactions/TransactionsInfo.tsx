import CloseIcon from "@mui/icons-material/Close";
import {
  Alert,
  Box,
  IconButton,
  Snackbar,
  SnackbarCloseReason,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import React, { FC, useEffect, useState } from "react";
import { getTransactions } from "../../api/transactions";
import { ITransaction } from "../../public/transaction";
import { TransactionStore } from "./store/transactionStore";
import { TransactionCharts } from "./TransactionCharts";
import { TransactionListView } from "./TransactionListView";

export const TransactionsInfo: FC = observer(() => {
  const [store, setStore] = useState<TransactionStore | null>(null);
  const [isNotificationOpened, setIsNotificationOpened] =
    useState<boolean>(false);

  const handleSocketMessage = (event: MessageEvent) => {
    if (!store) {
      return;
    }

    const data = JSON.parse(event.data);

    const transaction: ITransaction = {
      id: data.id,
      amount: data.amount,
      account_code: data.account_code,
      bank_name: data.bank_name,
      bank_code: data.bank_code,
      type: data.type,
      category: data.subtype || "other",
      date: new Date(data.date),
    };

    store.add(transaction);
    setIsNotificationOpened(true);
  };

  const handleNotificationClose = (
    _: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setIsNotificationOpened(false);
  };

  useEffect(() => {
    getTransactions().then((transactions) => {
      setStore(new TransactionStore(transactions));
    });
  }, []);

  useEffect(() => {
    const backendURL = import.meta.env.VITE_BACKEND_URL;
    const token = localStorage.getItem("access_token");
    const newSocket = new WebSocket(
      `${backendURL}/ws/transactions/?token=${token}`,
    );

    newSocket.onmessage = handleSocketMessage;

    return () => {
      if (newSocket.readyState) {
        newSocket.close();
      } else {
        newSocket.onopen = () => {
          newSocket.close();
        };
      }
    };
  }, [store]);

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="Закрыть"
        color="inherit"
        onClick={handleNotificationClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Box className="d-flex m-3 h-75 mt-5">
      <Box className="col-lg-8 col-md-7 col-sm-6 pe-3 h-100">
        {store && <TransactionCharts store={store} />}
      </Box>
      <Box className="col-lg-4 col-md-5 col-sm-6 h-100">
        {store && <TransactionListView store={store} />}
      </Box>

      <Snackbar
        open={isNotificationOpened}
        autoHideDuration={5000}
        onClose={handleNotificationClose}
        message="Добавлена новая транзакция"
        action={action}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      >
        <Alert
          onClose={handleNotificationClose}
          severity="info"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Добавлена новая транзакция
        </Alert>
      </Snackbar>
    </Box>
  );
});
