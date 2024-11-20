import { FC } from "react";
import { Container } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React from "react";
import { getTransactions } from "../../api/transactions";
import { ITransaction } from "../../public/transaction";

const columns: GridColDef[] = [
  {
    field: "amount",
    headerName: "Сумма",
    type: "number",
    width: 100,
  },
  {
    field: "type",
    headerName: "Тип",
    width: 150,
  },
  {
    field: "category",
    headerName: "Категория",
    width: 150,
  },
  {
    field: "date",
    headerName: "Дата и время",
    type: "dateTime",
    width: 200,
  },
  {
    field: "bank_name",
    headerName: "Банк",
    width: 110,
  },
  {
    field: "account_code",
    headerName: "Счет",
    width: 110,
  },
];

export const TransactionList: FC = () => {
  const [rows, setRows] = React.useState<ITransaction[]>(() => []);
  React.useEffect(() => {
    getTransactions().then((result) => {
      setRows(result);
    });
  }, []);

  return (
    <Container maxWidth="md">
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        sx={{
          bgcolor: "mochaBase.main",
        }}
      />
    </Container>
  );
};
