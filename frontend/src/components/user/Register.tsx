import { observer } from "mobx-react-lite";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login, register } from "../../api/user";
import { Path } from "../../routing/path";
import { useGetUser } from "../../public/user";
import {
  EmailField,
  PasswordField,
  PhoneField,
  SubmitButton,
} from "../form/FormItems";
import { MessageManager } from "../message/messageManager";

export const Register = observer(() => {
  const user = useGetUser();
  const [messageManager] = useState(() => new MessageManager());
  const navigate = useNavigate();

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    messageManager.clearMessages();

    const formData = new FormData(event.target as HTMLFormElement);
    const email: string = formData.get("email") as string;
    const phone_number: string = formData.get("phone_number") as string;
    const password: string = formData.get("password") as string;
    const passwordRepeat: string = formData.get("passwordRepeat") as string;

    if (password !== passwordRepeat) {
      messageManager.addError("Пароли не совпадают");
      return;
    }

    messageManager.addPrimary("Выполняется регистрация...");

    register(email, phone_number, password).then((result) => {
      if (!result["ok"]) {
        messageManager.clearMessages();
        result.messages?.forEach((message) => {
          messageManager.addError(message);
        });
        return;
      }

      login(email, password).then((loginResult) => {
        messageManager.clearMessages();
        if (loginResult["ok"]) {
          user.tryLogin();
          navigate(Path.accountPage);
        } else {
          loginResult.messages?.forEach((message) => {
            messageManager.addError(message);
          });
        }
      });
    });
  };

  return (
    <div className="d-flex flex-column">
      <h1 className="d-flex justify-content-center">Регистрация</h1>
      <div className="d-flex justify-content-center">
        <p className="me-2">Уже есть аккаунт?</p>{" "}
        <Link className="text-decoration-none" to={Path.loginPage}>
          Страница входа
        </Link>
      </div>

      <div className="d-flex justify-content-center my-3">
        <div className="d-grid text-center gap-1">{messageManager.view}</div>
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
