import { Path } from "./path";
import { Home } from "../components/home/Home";
import { Login } from "../components/user/Login";
import { Register } from "../components/user/Register";
import { Account } from "../components/user/Account";
import { DataView } from "../components/dataView/dataView";
import { TransactionList } from "../components/transactions/transactionList";

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
    path: Path.registerPage,
    component: <Register />,
  },
];

export const authRoutes = [
  {
    path: Path.accountPage,
    component: <Account />,
  },
  {
    path: Path.dataView,
    component: <DataView />,
  },
  {
    path: Path.transactions,
    component: <TransactionList />,
  },
];
