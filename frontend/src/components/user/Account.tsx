import { useNavigate } from "react-router-dom";
import { Path } from "../../routing/path";
import { useGetUser } from "../../public/user";
import { observer } from "mobx-react-lite";
import { Avatar, Button, Stack, TextField } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

export const Account = observer(() => {
  const user = useGetUser();
  const navigate = useNavigate();

  const logoutHandler = () => {
    user.logout();
    navigate(Path.loginPage);
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="col-lg-4 col-md-6 col-sm-8 rounded-4 p-4 mocha-bg-base">
        <Stack spacing={3}>
          <div className="d-flex justify-content-center">
            <Avatar sx={{ bgcolor: "#cba6f7", width: 64, height: 64 }}>
              {user.email![0].toUpperCase()}
            </Avatar>
          </div>
          <div>
            <p className="fs-2 mb-3 text-center">Основная информация</p>
            <Stack spacing={2}>
              <TextField
                variant="outlined"
                label="Email"
                defaultValue={user.email}
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
              />
              <TextField
                variant="outlined"
                label="Номер телефона"
                defaultValue={user.phoneNumber}
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
              />
            </Stack>
          </div>
          <div className="d-flex justify-content-center">
            <Button
              variant="contained"
              color="error"
              size="large"
              onClick={logoutHandler}
              startIcon={<ExitToAppIcon sx={{ color: "#1e1e2e" }} />}
              fullWidth
            >
              Выйти
            </Button>
          </div>
        </Stack>
      </div>
    </div>
  );
});
