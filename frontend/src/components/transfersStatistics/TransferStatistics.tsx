import { Box, Button, ButtonGroup, Tab, Tabs } from "@mui/material";
import { observer } from "mobx-react-lite";
import React from "react";
import { getTransfers } from "../../api/transfer.ts";
import { ITransfer } from "../../public/transfer/itransfer";
import { TransferStore } from "../../public/transfer/transferStore";
import { TransferChart } from "./TransferChart";
import { Notification } from "../public/notification/Notification";
import { TransferWebSocket } from "../../public/transfer/websocket";
import { DatePeriod } from "../../public/transfer/dateUtils";
import { mochaColors } from "../../public/style/colors";
import { TransferAggregation } from "./TransfersAggregation";

export const TransferStatistics: React.FC = observer(() => {
  const [store, setStore] = React.useState<TransferStore | null>(null);
  const [periodType, setChartPeriodType] = React.useState<DatePeriod>("month");
  const [transferType, setTransferType] = React.useState("all");
  const [isNotificationOpened, setIsNotificationOpened] = React.useState(false);

  React.useEffect(() => {
    getTransfers().then((transfers) => {
      const newStore = new TransferStore(transfers);
      newStore.filterByPeriod(periodType);
      setStore(newStore);
    });
  }, []);

  const handleNewTransfer = (transfer: ITransfer) => {
    if (store) {
      const ok = store.add(transfer);
      if (ok) {
        setIsNotificationOpened(true);
      }
    }
  };

  React.useEffect(() => {
    const transferWebSocket = new TransferWebSocket(handleNewTransfer);
    return () => transferWebSocket.close();
  }, [store]);

  const handleChangePeriod = (_: React.SyntheticEvent, period: DatePeriod) => {
    store && store.filterByPeriod(period);
    setChartPeriodType(() => period);
  };

  const handleChangeTransferType = (type: "all" | "income" | "expense") => {
    store && store.filterByTransferType(type);
    setTransferType(() => type);
  };

  return (
    <Box sx={{ display: "flex", px: 2, pb: 3, height: "100%" }}>
      <Box sx={{ height: "100%", width: "100%", mr: 3 }}>
        {store && <TransferChart list={store.list} period={periodType} />}
      </Box>
      <Box
        sx={{
          bgcolor: mochaColors.base,
          height: "100%",
          borderRadius: 4,
        }}
      >
        <Box
          sx={{
            bgcolor: mochaColors.mantle,
            borderRadius: 4,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          }}
        >
          <Tabs value={periodType} onChange={handleChangePeriod}>
            <Tab
              label="Все"
              sx={{
                borderRadius: 4,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                borderTopRightRadius: 0,
              }}
              value="all"
            />
            <Tab label="Год" value="year" />
            <Tab label="Месяц" value="month" />
            <Tab label="Неделя" value="week" />
            <Tab
              sx={{
                borderRadius: 4,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                borderTopLeftRadius: 0,
              }}
              label="День"
              value="day"
            />
          </Tabs>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
          <ButtonGroup variant="outlined">
            <Button
              onClick={() => handleChangeTransferType("all")}
              disabled={transferType == "all"}
            >
              Все
            </Button>
            <Button
              onClick={() => handleChangeTransferType("expense")}
              disabled={transferType == "expense"}
            >
              Расходы
            </Button>
            <Button
              onClick={() => handleChangeTransferType("income")}
              disabled={transferType == "income"}
            >
              Доходы
            </Button>
          </ButtonGroup>
        </Box>
        <TransferAggregation list={store?.list} />
      </Box>
      <Notification
        message="Добавлена новая транзакция"
        severity="info"
        opened={isNotificationOpened}
        onClose={() => setIsNotificationOpened(false)}
      />
    </Box>
  );
});
