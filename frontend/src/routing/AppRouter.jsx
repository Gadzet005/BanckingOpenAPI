import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { UserContext } from "../state/context";
import { authRoutes, publicRoutes } from "./routes";

export const AppRouter = observer(() => {
  const user = useContext(UserContext);

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
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
});
