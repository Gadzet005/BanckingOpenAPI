import { Box, Button, ButtonGroup } from "@mui/material";
import React from "react";
import { DatePeriod } from "../../../public/transfer/dateUtils";
import { ChartProps, LineChartProps } from "./chartProps";
import { DayLineChart } from "./line/DayLineChart";
import { MonthLineChart } from "./line/MonthLineChart";
import { TotalLineChart } from "./line/TotalLineChart";
import { WeekLineChart } from "./line/WeekLineChart";
import { YearLineChart } from "./line/YearLineChart";

const lineChartList: Array<{
  period: DatePeriod;
  component: React.FC<LineChartProps>;
}> = [
  {
    period: "day",
    component: DayLineChart,
  },
  {
    period: "week",
    component: WeekLineChart,
  },
  {
    period: "month",
    component: MonthLineChart,
  },
  {
    period: "year",
    component: YearLineChart,
  },
  {
    period: "all",
    component: TotalLineChart,
  },
];

interface TransferLineChartsProps extends ChartProps {
  period: DatePeriod;
}

export const TransferLineCharts: React.FC<TransferLineChartsProps> = ({
  list,
  period,
}) => {
  const [useLinearRegression, setUseLinearRegression] = React.useState(false);

  const elem = lineChartList.find((value) => value.period == period);
  const LineChart = elem ? elem.component : lineChartList[0].component;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center", pt: 1, gap: 1 }}>
        <ButtonGroup>
          <Button
            onClick={() => setUseLinearRegression(() => false)}
            variant={!useLinearRegression ? "contained" : "outlined"}
          >
            Данные
          </Button>
          <Button
            onClick={() => setUseLinearRegression(() => true)}
            variant={useLinearRegression ? "contained" : "outlined"}
          >
            Приближение
          </Button>
        </ButtonGroup>
      </Box>
      <Box sx={{ height: "100%", p: 3 }}>
        <LineChart list={list} useLinearRegression={useLinearRegression} />
      </Box>
    </Box>
  );
};
