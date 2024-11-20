import { LineChart } from "@mui/x-charts";
import { FC } from "react";
import { linearRegressionLine, linearRegression } from "simple-statistics";
import { mochaColors } from "../../../public/colors";

interface BaseLineChartProps {
  axisData: number[];
  axisLabel: string;
  expensesData: number[];
  incomesData: number[];
  min?: number;
  max?: number;
  axisFormatter?: (value: number) => string;
  useLinearRegression?: boolean;
}

function formatAmount(amount: number | null): string {
  if (amount === null) {
    return "";
  }
  return `${amount}₽`;
}

function gerPredictList(axis: number[], series: number[]) {
  const n = axis.length;
  const points = [];
  for (let i = 0; i < n; i++) {
    points.push([axis[i], series[i]]);
  }

  const regression = linearRegression(points);
  if (isNaN(regression.b) || isNaN(regression.m)) {
    return [];
  }

  const line = linearRegressionLine(regression);

  const predictList = [];
  for (let i = 0; i < n; i++) {
    const predict = Math.round(line(axis[i]));
    predictList.push(Math.min(Math.max(0, predict), Math.max(...series)));
  }
  return predictList;
}

export const BaseLineChart: FC<BaseLineChartProps> = ({
  axisData,
  axisLabel,
  expensesData,
  incomesData,
  min,
  max,
  axisFormatter = (num) => num.toString(),
  useLinearRegression = false,
}) => {
  let series: any[] = [];

  if (!useLinearRegression) {
    series = [
      {
        data: expensesData,
        color: mochaColors.red,
        label: "Расходы",
        valueFormatter: formatAmount,
      },
      {
        data: incomesData,
        color: mochaColors.green,
        label: "Доходы",
        valueFormatter: formatAmount,
      },
    ];
  } else {
    const incomesPrediction = gerPredictList(axisData, incomesData);
    const expensesPrediction = gerPredictList(axisData, expensesData);
    series = [
      {
        data: expensesPrediction,
        color: mochaColors.red,
        label: "Расходы",
        valueFormatter: formatAmount,
      },
      {
        data: incomesPrediction,
        color: mochaColors.green,
        label: "Доходы",
        valueFormatter: formatAmount,
      },
    ];
  }

  return (
    <LineChart
      xAxis={[
        {
          data: axisData,
          label: axisLabel,
          valueFormatter: axisFormatter,
          min: min,
          max: max,
        },
      ]}
      series={series}
      grid={{ vertical: true, horizontal: true }}
    />
  );
};
