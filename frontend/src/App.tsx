import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Header } from "./components/header/Header";
import { AppRouter } from "./routing/AppRouter";
import { User, UserContext } from "./state/user";

const App = () => {
  const [user] = useState(() => {
    const user = new User();
    user.tryLogin();
    return user;
  });

  return (
    <div>
      <UserContext.Provider value={user}>
        <BrowserRouter>
          <Header />
          <AppRouter />
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
};

export default App;
