import PieChartIcon from "@mui/icons-material/PieChart";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import { Box, Tab, Tabs } from "@mui/material";
import { PieChart } from "@mui/x-charts";
import { observer } from "mobx-react-lite";
import { FC, useState } from "react";
import { TransactionStore } from "./store/transactionStore";
import { DayLineChart } from "./charts/DayLineChart";

interface TransactionChartsProps {
  store: TransactionStore;
}

export const TransactionCharts: FC<TransactionChartsProps> = observer(
  ({ store }) => {
    const [chartNumber, setChartNumber] = useState(0);
    const [timeNumber, setTimeNumber] = useState(4);

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
      store && store.changeState(newNumber);
      setTimeNumber(newNumber);
    };

    const chart =
      chartNumber === 0 ? (
        store && <DayLineChart transactions={store.list} />
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
    );
  },
);
