import { observer } from "mobx-react-lite";
import { useContext } from "react";
import {
  ACCOUNT_PAGE,
  HOME_PAGE,
  LOGIN_PAGE,
  REGISTER_PAGE,
} from "../../routing/path";
import { UserContext } from "../../state/context";
import { HeaderItem } from "./HeaderItem";

const FOR_ALL = 0;
const ONLY_FOR_ANONYMOUS = 1;
const ONLY_FOR_AUTH = 2;

const list = [
  {
    name: "Главная",
    path: HOME_PAGE,
    type: FOR_ALL,
  },
  {
    name: "Вход",
    path: LOGIN_PAGE,
    type: ONLY_FOR_ANONYMOUS,
  },
  {
    name: "Регистрация",
    path: REGISTER_PAGE,
    type: ONLY_FOR_ANONYMOUS,
  },
  {
    name: "Личный кабинет",
    path: ACCOUNT_PAGE,
    type: ONLY_FOR_AUTH,
  },
];

export const Header = observer(() => {
  const user = useContext(UserContext);
  const isAuth = user.isAuth;

  const items = list.map(({ name, path, type, related = null }) => {
    if (
      (isAuth && type === ONLY_FOR_ANONYMOUS) ||
      (!isAuth && type === ONLY_FOR_AUTH)
    ) {
      return null;
    }
    return <HeaderItem key={name} name={name} path={path} related={related} />;
  });

  return (
    <div className="navbar nav-underline navbar-expand-lg bg-body-tertiary mb-3">
      <div className="container-fluid">
        <div className="collapse navbar-collapse justify-content-center">
          <div className="navbar-nav fs-3">{items}</div>
        </div>
      </div>
    </div>
  );
});
