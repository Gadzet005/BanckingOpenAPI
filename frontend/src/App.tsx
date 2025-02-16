import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Header } from "./components/header/Header";
import { AppRouter } from "./routing/AppRouter";
import { User, UserContext } from "./public/user";
import { Box, ThemeProvider } from "@mui/material";
import { appTheme } from "./public/style/appTheme";

const App = () => {
  const [user] = useState(() => {
    const user = new User();
    user.tryLogin();
    return user;
  });

  return (
    <UserContext.Provider value={user}>
      <BrowserRouter>
        <ThemeProvider theme={appTheme}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <Header />
            <AppRouter />
          </Box>
        </ThemeProvider>
      </BrowserRouter>
    </UserContext.Provider>
  );
};

export default App;
