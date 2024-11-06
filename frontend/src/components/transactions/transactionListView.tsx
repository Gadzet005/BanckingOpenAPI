import { FC, useEffect, useState } from "react";
import { getTransactions } from "../../api/transactions";
import { TransactionStore } from "./transactionStore";
import { observer } from "mobx-react-lite";
import { LineChart } from "@mui/x-charts";
import { Stack } from "@mui/material";

export const TransactionListView: FC = observer(() => {
  const [store, setStore] = useState<TransactionStore | null>(() => null);

  useEffect(() => {
    getTransactions().then((transactions) => {
      console.log(transactions);
      transactions.sort((a, b) => b.date.getTime() - a.date.getTime());
      setStore(new TransactionStore(transactions));
    });
  }, []);

  return (
    <div className="d-flex">
      <div className="col-lg-8 col-md-7 col-sm-6 px-3">
        <div className="d-flex justify-content-center mocha-bg-base rounded-4">
          <LineChart
            series={[
              {
                data: [2, 5.5, 2.5, 8.5, 2, 5, 10, 9, 5, 7],
                color: "#a6e3a1",
              },
              {
                data: [1, 3.5, 2, 6.5, 1.5, 4, 3, 4, 8, 10],
                color: "#f38ba8",
              },
            ]}
            width={1000}
            height={500}
            grid={{ vertical: true, horizontal: true }}
          />
        </div>
      </div>
      <div className="col-lg-4 col-md-5 col-sm-6 pe-3">
        <div className="mocha-bg-base rounded-4 p-2">
          <Stack spacing={1}>{store?.view}</Stack>
        </div>
      </div>
    </div>
  );
});
