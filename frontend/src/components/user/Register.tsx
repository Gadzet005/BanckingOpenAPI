import {
  Alert,
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Link,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../api/user";
import { useGetUser } from "../../public/user";
import { Path } from "../../routing/path";
import { PasswordField } from "../form/PasswordField";

interface RegisterFormState {
  formError?: string;
  emailError?: string;
  phoneNumberError?: string;
  passwordError?: string;
  repeatPasswordError?: string;
}

export const Register = observer(() => {
  const user = useGetUser();
  const navigate = useNavigate();

  const [state, setState] = useState<RegisterFormState>(() => ({}));
  const [waitingRegistration, setWaitingRegistration] = useState<boolean>(
    () => false,
  );

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const email: string = formData.get("email") as string;
    const phone_number: string = formData.get("phone_number") as string;
    const password: string = formData.get("password") as string;
    const passwordRepeat: string = formData.get("passwordRepeat") as string;

    if (password !== passwordRepeat) {
      setState((state) => ({
        ...state,
        repeatPasswordError: "Пароли не совпадают.",
      }));
      return;
    }

    setWaitingRegistration(() => true);
    register(email, phone_number, password).then((result) => {
      setWaitingRegistration(() => false);
      if (result.ok) {
        user.tryLogin();
        navigate(Path.accountPage);
      } else {
        setState(() => ({
          formError: result.message,
          emailError: result.emailMessages?.[0],
          phoneNumberError: result.phoneNumberMessages?.[0],
          passwordError: result.passwordMessages?.[0],
        }));
      }
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Container
        sx={{ mx: 1, borderRadius: 4, p: 3, bgcolor: "mochaBase.main" }}
        maxWidth="sm"
      >
        <Box sx={{ textAlign: "center", mb: 2 }}>
          <Typography variant="h3">Регистрация</Typography>
          <Typography component="span" variant="subtitle1">
            Уже есть аккаунт?
          </Typography>
          <Link
            sx={{ textDecoration: "none", ml: 1 }}
            variant="subtitle1"
            href={Path.loginPage}
          >
            Страница входа
          </Link>
        </Box>

        {state.formError && (
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <Alert severity="error" variant="filled">
              {state.formError}
            </Alert>
          </Box>
        )}

        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          onSubmit={submitHandler}
        >
          <TextField
            name="email"
            variant="outlined"
            label="Email"
            type="email"
            error={state.emailError !== undefined}
            helperText={state.emailError}
          />
          <TextField
            name="phone_number"
            variant="outlined"
            label="Номер телефона"
            type="tel"
            error={state.phoneNumberError !== undefined}
            helperText={state.phoneNumberError}
          />
          <PasswordField
            name="password"
            error={state.passwordError !== undefined}
            helperText={state.passwordError}
          />
          <PasswordField
            name="passwordRepeat"
            label="Повторите пароль"
            error={state.repeatPasswordError !== undefined}
            helperText={state.repeatPasswordError}
          />
          <Button
            variant="contained"
            type="submit"
            size="large"
            disabled={waitingRegistration}
          >
            Зарегистрироваться
          </Button>
        </Box>
      </Container>
    </Box>
  );
});
