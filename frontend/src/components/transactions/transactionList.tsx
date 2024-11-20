import { FC } from "react";
import { Container } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React from "react";
import { getTransactions } from "../../api/transactions";
import { ITransaction } from "../../public/transaction";
import { mochaColors } from "../../public/colors";

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
    <Container maxWidth="md" sx={{ maxHeight: "80%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
          sorting: {
            sortModel: [{ field: "date", sort: "desc" }],
          },
        }}
        pageSizeOptions={[10, { value: -1, label: "Все" }]}
        sx={{
          bgcolor: mochaColors.base,
        }}
      />
    </Container>
  );
};
