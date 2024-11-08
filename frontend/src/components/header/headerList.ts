import { Path } from "../../routing/path";
import { HeaderListElem, HeaderElemType } from "./interfaces";

export const headerList: Array<HeaderListElem> = [
    {
        name: "Главная",
        path: Path.homePage,
        type: HeaderElemType.forAll,
    },
    {
        name: "Вход",
        path: Path.loginPage,
        type: HeaderElemType.onlyForAnonymous,
    },
    {
        name: "Регистрация",
        path: Path.registerPage,
        type: HeaderElemType.onlyForAnonymous,
    },
    {
        name: "Транзакции",
        path: Path.transactions,
        type: HeaderElemType.onylForAuth,
    },
    {
        name: "Профиль",
        path: Path.accountPage,
        type: HeaderElemType.onylForAuth,
    },
];
