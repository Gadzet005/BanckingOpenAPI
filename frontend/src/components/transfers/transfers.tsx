import React from "react";
import { Box, Container, Typography } from "@mui/material";
import {
  DataGrid,
  gridClasses,
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { getTransfers } from "../../api/transfer.ts";
import { ITransfer } from "../../public/transfer/itransfer";
import { mochaColors } from "../../public/style/colors";
import { TransferWebSocket } from "../../public/transfer/websocket";
import { TransferStore } from "../../public/transfer/transferStore";
import { Notification } from "../public/notification/Notification";
import { observer } from "mobx-react-lite";
import { formatDate } from "../../public/transfer/dateUtils";

const columns: GridColDef[] = [
  {
    field: "type",
    headerName: "Тип",
    width: 100,
    cellClassName: (params) => params.row.type,
    valueFormatter: (value) => {
      return value == "income" ? "Доход" : "Расход";
    },
    sortable: false,
    align: "center",
    headerAlign: "center",
    filterable: false,
  },
  {
    field: "amount",
    headerName: "Сумма",
    type: "number",
    width: 150,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "category",
    headerName: "Категория",
    width: 150,
    align: "center",
    headerAlign: "center",
    sortable: false,
    filterable: false,
    display: "flex",
    renderCell: (params: GridRenderCellParams<any, any>) => (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {params.value.icon}
        <Typography>{params.value.name}</Typography>
      </Box>
    ),
  },
  {
    field: "date",
    headerName: "Дата и время",
    type: "dateTime",
    width: 200,
    align: "center",
    headerAlign: "center",
    valueFormatter: (date) => formatDate(date),
  },
  {
    field: "account_code",
    headerName: "Номер счета",
    width: 120,
    align: "center",
    headerAlign: "center",
    filterable: false,
    sortable: false,
  },
  {
    field: "bank_name",
    headerName: "Банк",
    width: 80,
    align: "center",
    headerAlign: "center",
    headerClassName: "hideRightSeparator",
    filterable: false,
    sortable: false,
  },
];

export const Transfers: React.FC = observer(() => {
  const [store, setStore] = React.useState<TransferStore | null>(null);
  const [isNotificationOpened, setIsNotificationOpened] = React.useState(false);

  React.useEffect(() => {
    getTransfers().then((transfers) => {
      const newStore = new TransferStore(transfers);
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

  const rows = store?.list.map((transfer, idx) => {
    return {
      id: idx,
      type: transfer.type,
      amount: transfer.amount,
      category: {
        name: transfer.formattedCategory,
        icon: transfer.categoryIcon,
      },
      date: transfer.date,
      account_code: transfer.account_code,
      bank_name: transfer.bank_name,
    };
  });

  return (
    <Container maxWidth="md" sx={{ height: "76.5%" }}>
      <DataGrid
        sx={{
          bgcolor: mochaColors.base,
          [`.${gridClasses.cell}.income`]: {
            backgroundColor: mochaColors.green,
            color: mochaColors.base,
          },
          [`.${gridClasses.cell}.expense`]: {
            backgroundColor: mochaColors.red,
            color: mochaColors.base,
          },
          "& .hideRightSeparator > .MuiDataGrid-columnSeparator": {
            display: "none",
          },
        }}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 8,
            },
          },
          sorting: {
            sortModel: [{ field: "date", sort: "desc" }],
          },
        }}
        pageSizeOptions={[8, 20, { value: -1, label: "Все" }]}
        rowHeight={65}
        loading={!store}
        slotProps={{
          loadingOverlay: {
            variant: "skeleton",
            noRowsVariant: "skeleton",
          },
        }}
      />
      <Notification
        message="Добавлена новая транзакция"
        severity="info"
        opened={isNotificationOpened}
        onClose={() => setIsNotificationOpened(false)}
      />
    </Container>
  );
});
