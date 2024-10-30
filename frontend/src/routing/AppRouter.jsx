import { Navigate, Route, Routes } from "react-router-dom";
import { publicRoutes } from "./routes";

export const AppRouter = () => {
  const publicRoutesComp = publicRoutes.map(({ path, component }) => {
    return <Route key={path} path={path} element={component} />;
  });

  return (
    <Routes>
      {publicRoutesComp}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};