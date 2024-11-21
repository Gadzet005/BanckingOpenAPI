import CloseIcon from "@mui/icons-material/Close";
import {
  Alert,
  IconButton,
  Snackbar,
  SnackbarCloseReason,
} from "@mui/material";
import React from "react";

interface NotificationProps {
  message: string;
  severity?: "success" | "error" | "warning" | "info";
  opened?: boolean;
  onClose?: () => void;
}

export const Notification: React.FC<NotificationProps> = ({
  message,
  severity = "info",
  opened = false,
  onClose = () => {},
}) => {
  const handleNotificationClose = (
    _: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === "clickaway") {
      return;
    }
    onClose();
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="Закрыть"
        color="inherit"
        onClick={handleNotificationClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Snackbar
      open={opened}
      autoHideDuration={5000}
      onClose={handleNotificationClose}
      message="Добавлена новая транзакция"
      action={action}
      anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
    >
      <Alert
        onClose={handleNotificationClose}
        severity={severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
