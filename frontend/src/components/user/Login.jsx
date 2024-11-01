import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../api/user";
import { ACCOUNT_PAGE, REGISTER_PAGE } from "../../routing/path";
import { UserContext } from "../../state/context";
import { EmailField, PasswordField, SubmitButton } from "../form/FormItems";
import { ErrorState } from "./state";

export const Login = observer(() => {
  const user = useContext(UserContext);
  const [errors] = useState(() => new ErrorState());
  const navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();
    errors.clearMessages();

    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");

    login(email, password).then((result) => {
      if (result["ok"]) {
        user.tryLogin();
        navigate(ACCOUNT_PAGE);
      } else {
        errors.addMessages(...result["messages"]);
      }
    });
  };

  return (
    <div className="d-flex flex-column">
      <h1 className="d-flex justify-content-center">Вход</h1>
      <div className="d-flex justify-content-center">
        <p className="me-2">Нет аккаунта?</p>{" "}
        <Link className="text-decoration-none" to={REGISTER_PAGE}>
          Страница регистрации
        </Link>
      </div>

      <div className="d-flex justify-content-center my-3">
        <div className="d-grid text-center gap-1">{errors.view}</div>
      </div>

      <div className="d-flex justify-content-center">
        <form className="d-grid gap-3 col-4" onSubmit={submitHandler}>
          <EmailField />
          <PasswordField />
          <div className="d-flex justify-content-center">
            <div className="col-6">
              <SubmitButton label="Войти" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
});
