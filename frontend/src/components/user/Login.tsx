import { Alert, Button, TextField } from "@mui/material";
import { observer } from "mobx-react-lite";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../api/user";
import { useGetUser } from "../../public/user";
import { Path } from "../../routing/path";
import { PasswordField } from "../form/PasswordField";

export const Login = observer(() => {
  const user = useGetUser();
  const navigate = useNavigate();

  const [formError, setFormError] = useState<string | null>(() => null);
  const [waitingLogin, setWaitingLogin] = useState<boolean>(() => false);

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const email: string = formData.get("email") as string;
    const password: string = formData.get("password") as string;

    setWaitingLogin(() => true);
    login(email, password).then((result) => {
      setWaitingLogin(() => false);
      if (result.ok) {
        user.tryLogin();
        navigate(Path.accountPage);
      } else {
        setFormError(() => result.message!);
      }
    });
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="col-lg-4 col-md-6 col-sm-8 border rounded-3 p-4 bg-light">
        <div className="text-center">
          <h1>Вход</h1>
          <span className="fs-6 me-2">Нет аккаунта?</span>
          <Link className="fs-6 text-decoration-none" to={Path.registerPage}>
            Страница регистрации
          </Link>
        </div>

        <div className="d-flex justify-content-center my-3">
          {formError && <Alert severity="error">{formError}</Alert>}
        </div>

        <form className="d-grid gap-3" onSubmit={submitHandler}>
          <TextField
            name="email"
            variant="outlined"
            label="Email"
            type="email"
          />
          <PasswordField />
          <Button
            variant="contained"
            type="submit"
            size="large"
            disabled={waitingLogin}
          >
            Вход
          </Button>
        </form>
      </div>
    </div>
  );
});
