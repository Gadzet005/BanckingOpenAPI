import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export const HeaderItem = ({ name, path, related = [] }) => {
  const location = useLocation();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(
      path === location.pathname ||
        (related && related.includes(location.pathname)),
    );
    // eslint-disable-next-line
  }, [location.pathname]);

  if (isActive) {
    return <p className="nav-link active mx-3 my-0">{name}</p>;
  }

  return (
    <Link className="nav-link mx-3" to={path}>
      {name}
    </Link>
  );
};
