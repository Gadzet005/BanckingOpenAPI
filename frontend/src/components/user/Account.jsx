import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN_PAGE } from "../../routing/path";
import { UserContext } from "../../state/context";

export const Account = () => {
  const user = useContext(UserContext);
  const navigate = useNavigate();

  const logoutHandler = () => {
    user.logout();
    navigate(LOGIN_PAGE);
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="d-grid gap-2">
        <p className="fs-5">Email: {user.email}</p>
        <p className="fs-5">Номер телефона: {user.phoneNumber}</p>
        <div>
          <button className="btn btn-danger" onClick={logoutHandler}>
            Выйти
          </button>
        </div>
      </div>
    </div>
  );
};
