import { FC } from "react";
import { Box, Container, Typography } from "@mui/material";
import ChartImage from "./imgs/chartImage.png";
import { mochaColors } from "../../public/colors";

export const Home: FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            bgcolor: mochaColors.mantle,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: 5,
            p: 1,
          }}
        >
          <Typography variant="h4">Добро пожаловать!</Typography>
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            Это финансовый помощник, который может отслеживать все ваши
            банковские переводы в режиме реального времени и предоставлять
            статистику по расходам и доходам.
          </Typography>
        </Box>
      </Container>

      <Container maxWidth="lg" sx={{ height: "100%" }}>
        <Box
          sx={{ width: "100%" }}
          component="img"
          src={ChartImage}
          alt="Картинка с графиками"
        />
      </Container>
    </Box>
  );
};
