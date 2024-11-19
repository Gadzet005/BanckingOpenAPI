import { useGetUser } from "../../public/user";
import { observer } from "mobx-react-lite";
import { Avatar, Stack, TextField } from "@mui/material";

export const Account = observer(() => {
  const user = useGetUser();

  return (
    <div className="d-flex justify-content-center">
      <div className="col-lg-4 col-md-6 col-sm-8 rounded-4 p-4 mocha-bg-base">
        <Stack spacing={3}>
          <div className="d-flex justify-content-center">
            <Avatar sx={{ bgcolor: "primary.main", width: 64, height: 64 }}>
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
        </Stack>
      </div>
    </div>
  );
});
