import PieChartIcon from "@mui/icons-material/PieChart";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import React from "react";
import { mochaColors } from "../../public/colors";
import { CategoryPieChart } from "./charts/CategoryPieChart";
import { DayLineChart } from "./charts/DayLineChart";
import { MonthLineChart } from "./charts/MonthLineChart";
import { TotalLineChart } from "./charts/TotalLineChart";
import { WeekLineChart } from "./charts/WeekLineChart";
import { YearLineChart } from "./charts/YearLineChart";
import { TransactionStore } from "./store/transactionStore";

interface TransactionChartsProps {
  store: TransactionStore;
}

export const TransactionCharts: React.FC<TransactionChartsProps> = observer(
  ({ store }) => {
    const [chartNumber, setChartNumber] = React.useState(0);
    const [timeNumber, setTimeNumber] = React.useState(2);
    const [chartType, setChartType] = React.useState(0);

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
        return (
          <DayLineChart
            store={store}
            useLinearRegression={Boolean(chartType)}
          />
        );
      } else if (timeNumber == 3) {
        return (
          <WeekLineChart
            store={store}
            useLinearRegression={Boolean(chartType)}
          />
        );
      } else if (timeNumber == 2) {
        return (
          <MonthLineChart
            store={store}
            useLinearRegression={Boolean(chartType)}
          />
        );
      } else if (timeNumber == 1) {
        return (
          <YearLineChart
            store={store}
            useLinearRegression={Boolean(chartType)}
          />
        );
      }
      return (
        <TotalLineChart
          store={store}
          useLinearRegression={Boolean(chartType)}
        />
      );
    };

    const chart =
      store.list.length === 0 ? (
        <Typography variant="h6">Нет операций за этот период</Typography>
      ) : chartNumber === 0 ? (
        <Box className="d-flex flex-column h-100 w-100">
          <Box className="d-flex justify-content-center">
            <Tabs
              value={chartType}
              onChange={(_: React.SyntheticEvent, value: number) =>
                setChartType(value)
              }
              aria-label="icon tabs example"
            >
              <Tab className="rounded-top-4" label="Данные" />
              <Tab className="rounded-top-4" label="Приближение" />
            </Tabs>
          </Box>
          <Box className="h-100 p-3">{getLineChart()}</Box>
        </Box>
      ) : (
        <Box className="h-100 w-100 p-3">
          <CategoryPieChart store={store} />
        </Box>
      );

    return (
      <Box sx={{ bgcolor: mochaColors.base, borderRadius: 4, height: "100%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            bgcolor: mochaColors.mantle,
            borderRadius: 4,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          }}
        >
          <Tabs
            value={chartNumber}
            onChange={handleChangeChartNumber}
            aria-label="icon tabs example"
          >
            <Tab
              sx={{
                borderRadius: 4,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                borderTopRightRadius: 0,
              }}
              icon={<ShowChartIcon />}
            />
            <Tab icon={<PieChartIcon />} />
          </Tabs>

          <Tabs
            value={timeNumber}
            onChange={handleChangeTimeNumber}
            aria-label="icon tabs example"
          >
            <Tab label="Все время" />
            <Tab label="Год" />
            <Tab label="Месяц" />
            <Tab label="Неделя" />
            <Tab
              sx={{
                borderRadius: 4,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                borderTopLeftRadius: 0,
              }}
              label="День"
            />
          </Tabs>
        </Box>
        <Box sx={{ height: "100%", display: "flex", justifyContent: "center" }}>
          <Box
            sx={{
              height: "100%",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              pb: 5,
            }}
          >
            {chart}
          </Box>
        </Box>
      </Box>
    );
  },
);
