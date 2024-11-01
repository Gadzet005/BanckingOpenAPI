import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login, register } from "../../api/user";
import { ACCOUNT_PAGE, LOGIN_PAGE } from "../../routing/path";
import { UserContext } from "../../state/context";
import {
  EmailField,
  PasswordField,
  PhoneField,
  SubmitButton,
} from "../form/FormItems";
import { ErrorState } from "./state";

export const Register = observer(() => {
  const user = useContext(UserContext);
  const [errors] = useState(() => new ErrorState());
  const navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();
    errors.clearMessages();

    const formData = new FormData(event.target);
    const email = formData.get("email");
    const phone_number = formData.get("phone_number");
    const password = formData.get("password");
    const passwordRepeat = formData.get("passwordRepeat");

    if (password !== passwordRepeat) {
      errors.addMessages("Пароли не совпадают");
      return;
    }

    register(email, phone_number, password).then((result) => {
      if (!result["ok"]) {
        errors.addMessages(...result["messages"]);
        return;
      }

      login(email, password).then((loginResult) => {
        if (loginResult["ok"]) {
          user.tryLogin();
          navigate(ACCOUNT_PAGE);
        } else {
          errors.addMessages(...loginResult["messages"]);
        }
      });
    });
  };

  return (
    <div className="d-flex flex-column">
      <h1 className="d-flex justify-content-center">Регистрация</h1>
      <div className="d-flex justify-content-center">
        <p className="me-2">Уже есть аккаунт?</p>{" "}
        <Link className="text-decoration-none" to={LOGIN_PAGE}>
          Страница входа
        </Link>
      </div>

      <div className="d-flex justify-content-center my-3">
        <div className="d-grid text-center gap-1">{errors.view}</div>
      </div>

      <div className="d-flex justify-content-center">
        <form className="d-grid gap-3 col-4" onSubmit={submitHandler}>
          <EmailField />
          <PhoneField />
          <PasswordField name="password" />
          <PasswordField name="passwordRepeat" label="Повторите пароль" />
          <div className="d-flex justify-content-center">
            <div className="col-6">
              <SubmitButton label="Зарегистрироваться" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
});
