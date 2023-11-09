import { Alert, Snackbar, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { ERROR_UPDATING, SUCCESS_UPDATE_API } from "../../store/constants";

const AlertNotification = ({ isSuccess, errorMessage, isError }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState();

  const handleCloseSnackBar = (_event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    if (isSuccess) {
      setMessage(SUCCESS_UPDATE_API);
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
  }, [errorMessage, isError, isSuccess]);

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
            {isSuccess && message && `${message?.title}, ${message?.message}`}
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
