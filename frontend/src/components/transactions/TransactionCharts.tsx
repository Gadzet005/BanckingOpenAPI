import PieChartIcon from "@mui/icons-material/PieChart";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import { Box, Tab, Tabs } from "@mui/material";
import { observer } from "mobx-react-lite";
import { FC, useState } from "react";
import { TransactionStore } from "./store/transactionStore";
import { DayLineChart } from "./charts/DayLineChart";
import { WeekLineChart } from "./charts/WeekLineChart";
import { MonthLineChart } from "./charts/MonthLineChart";
import { YearLineChart } from "./charts/YearLineChart";
import { TotalLineChart } from "./charts/TotalLineChart";
import { CategoryPieChart } from "./charts/CategoryPieChart";

interface TransactionChartsProps {
  store: TransactionStore;
}

export const TransactionCharts: FC<TransactionChartsProps> = observer(
  ({ store }) => {
    const [chartNumber, setChartNumber] = useState(0);
    const [timeNumber, setTimeNumber] = useState(3);

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

    const getLineChart = () => {
      if (!store) {
        return null;
      }

      if (timeNumber == 4) {
        return <DayLineChart transactions={store.list} />;
      } else if (timeNumber == 3) {
        return <WeekLineChart transactions={store.list} />;
      } else if (timeNumber == 2) {
        return <MonthLineChart transactions={store.list} />;
      } else if (timeNumber == 1) {
        return <YearLineChart transactions={store.list} />;
      }
      return <TotalLineChart transactions={store.list} />;
    };

    const chart =
      chartNumber === 0 ? (
        getLineChart()
      ) : (
        <CategoryPieChart transactions={store.list} />
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
