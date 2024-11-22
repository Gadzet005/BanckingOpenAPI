import { Path } from "./path";
import { Home } from "../components/home/Home";
import { Login } from "../components/user/Login";
import { Register } from "../components/user/Register";
import { Account } from "../components/user/Account";
import { TransferStatistics } from "../components/transfersStatistics/TransferStatistics";
import { Transfers } from "../components/transfers/transfers";
import { BankAccounts } from "../components/bankAccounts/BankAccounts";

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
    path: Path.transferStatistics,
    component: <TransferStatistics />,
  },
  {
    path: Path.transfers,
    component: <Transfers />,
  },
  {
    path: Path.bankAccounts,
    component: <BankAccounts />,
  },
];
