import { observer } from "mobx-react-lite";
import { useGetUser } from "../../public/user";
import { HeaderItem } from "./HeaderItem";
import { headerList } from "./headerList";
import { HeaderElemType } from "./interfaces";

export const Header = observer(() => {
  const user = useGetUser();
  const isAuth = user.isAuth;

  const items = headerList.map(({ name, path, type, related }) => {
    if (
      (isAuth && type === HeaderElemType.onlyForAnonymous) ||
      (!isAuth && type === HeaderElemType.onylForAuth)
    ) {
      return null;
    }
    return <HeaderItem key={name} name={name} path={path} related={related} />;
  });

  return (
    <div className="navbar nav-underline navbar-expand-lg mb-4 mocha-bg-mantle navbar-dark">
      <div className="container-fluid">
        <div className="collapse navbar-collapse justify-content-center">
          <div className="navbar-nav fs-4">{items}</div>
        </div>
      </div>
    </div>
  );
});
