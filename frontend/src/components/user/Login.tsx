import {
  Alert,
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/user";
import { useGetUser } from "../../public/user";
import { Path } from "../../routing/path";
import { PasswordField } from "../form/PasswordField";
import { mochaColors } from "../../public/colors";

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
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Container
        sx={{ mx: 1, borderRadius: 4, p: 3, bgcolor: mochaColors.base }}
        maxWidth="sm"
      >
        <Box sx={{ textAlign: "center", mb: 2 }}>
          <Typography variant="h3">Вход</Typography>
          <Typography component="span" variant="subtitle1">
            Нет аккаунта?
          </Typography>
          <Link
            sx={{ textDecoration: "none", ml: 1 }}
            variant="subtitle1"
            href={Path.registerPage}
          >
            Страница регистрации
          </Link>
        </Box>

        {formError && (
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <Alert severity="error" variant="filled">
              {formError}
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
        </Box>
      </Container>
    </Box>
  );
});
