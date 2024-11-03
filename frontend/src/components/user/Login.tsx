import { observer } from "mobx-react-lite";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../api/user";
import { Path } from "../../routing/path";
import { useGetUser } from "../../public/user";
import { EmailField, PasswordField, SubmitButton } from "../form/FormItems";
import { MessageManager } from "../message/messageManager";

export const Login = observer(() => {
  const user = useGetUser();
  const [messageManager] = useState(() => new MessageManager());
  const navigate = useNavigate();

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    messageManager.clearMessages();

    const formData = new FormData(event.target as HTMLFormElement);
    const email: string = formData.get("email") as string;
    const password: string = formData.get("password") as string;

    messageManager.addPrimary("Выполняется вход...");

    login(email, password).then((result) => {
      messageManager.clearMessages();
      if (result["ok"]) {
        user.tryLogin();
        navigate(Path.accountPage);
      } else {
        result.messages?.forEach((message) => {
          messageManager.addError(message);
        });
      }
    });
  };

  return (
    <div className="d-flex flex-column">
      <h1 className="d-flex justify-content-center">Вход</h1>
      <div className="d-flex justify-content-center">
        <p className="me-2">Нет аккаунта?</p>{" "}
        <Link className="text-decoration-none" to={Path.registerPage}>
          Страница регистрации
        </Link>
      </div>

      <div className="d-flex justify-content-center my-3">
        <div className="d-grid text-center gap-1">{messageManager.view}</div>
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
