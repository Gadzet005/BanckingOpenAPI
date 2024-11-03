import { Path } from "./path";
import { Home } from "../components/home/Home";
import { Login } from "../components/user/Login";
import { Register } from "../components/user/Register";
import { Account } from "../components/user/Account";

export const publicRoutes = [
  {
    path: Path.homePage,
    component: <Home />,
  },
  {
    path: Path.loginPage,
    component: <Login />,
  },
  {
    path: Path.RegisterPage,
    component: <Register />,
  },
];

export const authRoutes = [
  {
    path: Path.AccountPage,
    component: <Account />,
  },
];
