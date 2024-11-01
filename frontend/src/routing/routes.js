import { HOME_PAGE, LOGIN_PAGE, REGISTER_PAGE, ACCOUNT_PAGE } from "./path";
import { Home } from "../components/home/Home";
import { Login } from "../components/user/Login";
import { Register } from "../components/user/Register";
import { Account } from "../components/user/Account";

export const publicRoutes = [
    {
        path: HOME_PAGE,
        component: <Home />,
    },
    {
        path: LOGIN_PAGE,
        component: <Login />,
    },
    {
        path: REGISTER_PAGE,
        component: <Register />,
    },
];

export const authRoutes = [
    {
        path: ACCOUNT_PAGE,
        component: <Account />,
    },
];
