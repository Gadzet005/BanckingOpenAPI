import { useGetUser } from "../../public/user";
import { observer } from "mobx-react-lite";
import {
  Avatar,
  Box,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { mochaColors } from "../../public/colors";

export const Account = observer(() => {
  const user = useGetUser();

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
        <Stack spacing={3}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Avatar sx={{ bgcolor: mochaColors.blue, width: 64, height: 64 }}>
              {user.email![0].toUpperCase()}
            </Avatar>
          </Box>
          <Box>
            <Typography variant="h4" sx={{ mb: 3, textAlign: "center" }}>
              Основная информация
            </Typography>
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
          </Box>
        </Stack>
      </Container>
    </Box>
  );
});
