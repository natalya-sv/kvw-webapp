import { Alert, Snackbar, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import {
  ERROR_UPDATING,
  SUCCESS_CREATING_API,
  SUCCESS_DELETING_API,
  SUCCESS_UPDATE_API,
} from "../../store/constants";

const AlertNotification = ({
  isSuccessCreating,
  isSuccessUpdating,
  isSuccessDeleting,
  errorMessage,
  isError,
}) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState();

  const handleCloseSnackBar = (_event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    if (isSuccessUpdating) {
      setMessage(SUCCESS_UPDATE_API);
      setOpen(true);
    }
    if (isSuccessCreating) {
      setMessage(SUCCESS_CREATING_API);
      setOpen(true);
    }
    if (isSuccessDeleting) {
      setMessage(SUCCESS_DELETING_API);
      setOpen(true);
    }
    if (isError && errorMessage) {
      const errMessage = {
        ...ERROR_UPDATING,
        subMessage: errorMessage?.data.message,
      };
      setMessage(errMessage);
      setOpen(true);
    }

    return () => {
      setOpen(false);
      setMessage("");
      handleCloseSnackBar();
    };
  }, [
    errorMessage,
    isError,
    isSuccessCreating,
    isSuccessDeleting,
    isSuccessUpdating,
  ]);

  return (
    <Box sx={{ width: "50%" }}>
      <Grid item xs={12} textAlign="right">
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleCloseSnackBar}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert
            onClose={handleCloseSnackBar}
            severity={isError ? "error" : "success"}
            sx={{ width: "100%" }}
          >
            {(isSuccessCreating || isSuccessDeleting || isSuccessUpdating) &&
              message &&
              `${message?.title}, ${message?.message}`}
            {isError &&
              message &&
              `${message?.title} ${message?.message}. ${message.subMessage}`}
          </Alert>
        </Snackbar>
      </Grid>
    </Box>
  );
};

export default AlertNotification;
