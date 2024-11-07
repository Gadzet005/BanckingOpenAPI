import { FC, useEffect, useState } from "react";
import { getTransactions } from "../../api/transactions";
import { TransactionStore } from "./transactionStore";
import { observer } from "mobx-react-lite";
import { LineChart, PieChart } from "@mui/x-charts";
import { Box, Stack, Tab, Tabs } from "@mui/material";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import PieChartIcon from "@mui/icons-material/PieChart";

export const TransactionListView: FC = observer(() => {
  const [store, setStore] = useState<TransactionStore | null>(null);
  const [chartNumber, setChartNumber] = useState(0);
  const [timeNumber, setTimeNumber] = useState(2);

  useEffect(() => {
    getTransactions().then((transactions) => {
      console.log(transactions);
      transactions.sort((a, b) => b.date.getTime() - a.date.getTime());
      setStore(new TransactionStore(transactions));
    });
  }, []);

  const handleChangeChartNumber = (
    _: React.SyntheticEvent,
    newNumber: number,
  ) => {
    setChartNumber(newNumber);
  };

  const handleChangeTimeNumber = (
    _: React.SyntheticEvent,
    newNumber: number,
  ) => {
    setTimeNumber(newNumber);
  };

  const chart =
    chartNumber === 0 ? (
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
        grid={{ vertical: true, horizontal: true }}
      />
    ) : (
      <PieChart
        className="w-75 h-75"
        series={[
          {
            data: [
              { id: 0, value: 10, label: "series A" },
              { id: 1, value: 15, label: "series B" },
              { id: 2, value: 20, label: "series C" },
            ],
          },
        ]}
      />
    );

  return (
    <Box className="d-flex m-3 h-75 mt-5">
      <div className="col-lg-8 col-md-7 col-sm-6 pe-3 h-100">
        <div className="mocha-bg-base rounded-4 h-100">
          <div className="d-flex justify-content-between mocha-bg-mantle rounded-top-4">
            <Tabs
              value={chartNumber}
              onChange={handleChangeChartNumber}
              aria-label="icon tabs example"
            >
              <Tab className="rounded-top-4" icon={<ShowChartIcon />} />
              <Tab className="rounded-top-4" icon={<PieChartIcon />} />
            </Tabs>

            <Tabs
              value={timeNumber}
              onChange={handleChangeTimeNumber}
              aria-label="icon tabs example"
            >
              <Tab className="rounded-top-4" label="Все время" />
              <Tab className="rounded-top-4" label="Год" />
              <Tab className="rounded-top-4" label="Месяц" />
              <Tab className="rounded-top-4" label="Неделя" />
              <Tab className="rounded-top-4" label="День" />
            </Tabs>
          </div>
          <div className="d-flex justify-content-center p-3 h-100">
            <Box className="d-flex align-items-center h-100 w-100 pb-5">
              {chart}
            </Box>
          </div>
        </div>
      </div>
      <div className="col-lg-4 col-md-5 col-sm-6 h-100">
        <div className="mocha-bg-base rounded-4 p-2 h-100">
          <Stack spacing={1}>{store?.view}</Stack>
        </div>
      </div>
    </Box>
  );
});
