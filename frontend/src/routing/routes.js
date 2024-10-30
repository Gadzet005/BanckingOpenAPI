import { HOME, SOME_PAGE } from "./path";
import { Home } from "../components/home/Home";
import { SomePage } from "../components/some_page/SomePage";

export const publicRoutes = [
    {
        path: HOME,
        component: <Home />,
    },
    {
        path: SOME_PAGE,
        component: <SomePage />,
    },
];
