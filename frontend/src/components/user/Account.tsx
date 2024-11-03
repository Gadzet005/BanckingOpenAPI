import { useNavigate } from "react-router-dom";
import { Path } from "../../routing/path";
import { useGetUser } from "../../public/user";

export const Account = () => {
  const user = useGetUser();
  const navigate = useNavigate();

  const logoutHandler = () => {
    user.logout();
    navigate(Path.loginPage);
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
