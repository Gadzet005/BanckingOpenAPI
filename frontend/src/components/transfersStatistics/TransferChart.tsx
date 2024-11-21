import PieChartIcon from "@mui/icons-material/PieChart";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import React from "react";
import { mochaColors } from "../../public/style/colors";
import { DatePeriod } from "../../public/transfer/dateUtils";
import { Transfer } from "../../public/transfer/transfer";
import { CategoryPieChart } from "./charts/CategoryPieChart";
import { TransferLineCharts } from "./charts/TransferLineCharts";

const transferChartTypeList = ["line", "pie"];
export type TransferChartType = (typeof transferChartTypeList)[number];

interface TransferChart {
  list: Transfer[];
  period?: DatePeriod;
}

export const TransferChart: React.FC<TransferChart> = ({
  list,
  period = "all",
}) => {
  const [chartType, setChartType] = React.useState(() => "line");

  const chart =
    list.length === 0 ? (
      <Typography variant="h6">Нет операций за этот период</Typography>
    ) : chartType == "line" ? (
      <TransferLineCharts list={list} period={period} />
    ) : (
      <Box sx={{ height: "100%", width: "100%", p: 3 }}>
        <CategoryPieChart list={list} />
      </Box>
    );

  const handleChangeChartType = (_: React.SyntheticEvent, num: number) => {
    setChartType(transferChartTypeList[num]);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        bgcolor: mochaColors.base,
        borderRadius: 4,
        height: "100%",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          bgcolor: mochaColors.mantle,
          borderRadius: 4,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        }}
      >
        <Tabs
          value={transferChartTypeList.indexOf(chartType)}
          onChange={handleChangeChartType}
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
      </Box>
      <Box
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {chart}
      </Box>
    </Box>
  );
};
