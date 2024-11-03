import { Path } from "./path";
import { Home } from "../components/home/Home";
import { Login } from "../components/user/Login";
import { Register } from "../components/user/Register";
import { Account } from "../components/user/Account";
import { TransactionListView } from "../components/transactions/transactionListView";

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
    path: Path.transactions,
    component: <TransactionListView />,
  },
];
