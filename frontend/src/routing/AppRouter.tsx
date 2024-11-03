import { observer } from "mobx-react-lite";
import { Navigate, Route, Routes } from "react-router-dom";
import { useGetUser } from "../public/user";
import { authRoutes, publicRoutes } from "./routes";
import { Path } from "./path";

export const AppRouter = observer(() => {
  const user = useGetUser();

  const authRoutesComp = authRoutes.map(({ path, component }) => {
    return <Route key={path} path={path} element={component} />;
  });
  const publicRoutesComp = publicRoutes.map(({ path, component }) => {
    return <Route key={path} path={path} element={component} />;
  });

  return (
    <Routes>
      {user.isAuth && authRoutesComp}
      {publicRoutesComp}
      <Route path="*" element={<Navigate to={Path.loginPage} />} />
    </Routes>
  );
});
