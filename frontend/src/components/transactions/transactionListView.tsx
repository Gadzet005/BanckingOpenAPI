import { FC, useEffect, useState } from "react";
import { getTransactions } from "../../api/transactions";
import { TransactionStore } from "./transactionStore";
import { observer } from "mobx-react-lite";
import { LineChart } from "@mui/x-charts";

export const TransactionListView: FC = observer(() => {
  const [store, setStore] = useState<TransactionStore | null>(() => null);

  useEffect(() => {
    getTransactions().then((transactions) => {
      setStore(new TransactionStore(transactions));
    });
  }, []);

  return (
    <div className="d-flex flex-wrap">
      <div className="col-8 px-3">
        <div className="d-flex justify-content-center">
          <LineChart
            xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
            series={[
              {
                data: [2, 5.5, 2, 8.5, 1.5, 5],
                area: true,
              },
            ]}
            width={1000}
            height={500}
          />
        </div>
      </div>
      <div className="col-4 px-3">
        <ul className="list-group gap-2">{store?.view}</ul>
      </div>
    </div>
  );
});
