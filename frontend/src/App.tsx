import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Header } from "./components/header/Header";
import { AppRouter } from "./routing/AppRouter";
import { User, UserContext } from "./public/user";
import { createTheme, ThemeProvider } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#89b4fa",
      dark: "#89b4fa",
    },
    error: {
      main: "#f38ba8",
      dark: "#f38ba8",
    },
    success: {
      main: "#a6e3a1",
      dark: "#a6e3a1",
    },
    info: {
      main: "#74c7ec",
      dark: "#74c7ec",
    },
    text: {
      secondary: "#cdd6f4",
      primary: "#cdd6f4",
    },
  },
});

const App = () => {
  const [user] = useState(() => {
    const user = new User();
    user.tryLogin();
    return user;
  });

  return (
    <UserContext.Provider value={user}>
      <BrowserRouter>
        <ThemeProvider theme={darkTheme}>
          <Header />
          <AppRouter />
        </ThemeProvider>
      </BrowserRouter>
    </UserContext.Provider>
  );
};

export default App;
