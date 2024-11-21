import { Path } from "../../routing/path";
import { internal } from "./internal";

export const navList: Array<internal.HeaderLinkItem> = [
    {
        name: "Обзор",
        path: Path.transferStatistics,
        type: internal.HeaderItemType.onlyForAuth,
    },
    {
        name: "Переводы",
        path: Path.transfers,
        type: internal.HeaderItemType.onlyForAuth,
    },
    {
        name: "Счета",
        path: Path.bankAccounts,
        type: internal.HeaderItemType.onlyForAuth,
    },
];

export const userMenuList: Array<internal.HeaderLinkItem> = [
    {
        name: "Вход",
        type: internal.HeaderItemType.onlyForAnonymous,
        path: Path.loginPage,
    },
    {
        name: "Регистрация",
        type: internal.HeaderItemType.onlyForAnonymous,
        path: Path.registerPage,
    },
    {
        name: "Профиль",
        type: internal.HeaderItemType.onlyForAuth,
        path: Path.accountPage,
    },
    {
        name: "Выход",
        type: internal.HeaderItemType.onlyForAuth,
        onClick: (context) => {
            context.user.logout();
            context.navigate(Path.loginPage);
        },
    },
];
