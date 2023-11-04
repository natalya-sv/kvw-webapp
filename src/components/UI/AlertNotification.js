import { Alert, Snackbar, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import {
  ERROR_FETCHING,
  ERROR_UPDATING,
  SUCCESS_UPDATE_API,
} from "../../store/constants";

const AlertNotification = ({
  successUpdating,
  errorFetching,
  subMessage,
  errorUpdating,
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
    if (successUpdating) {
      setMessage(SUCCESS_UPDATE_API);
      setOpen(true);
    }
    if (errorFetching) {
      setMessage(ERROR_FETCHING);
      setOpen(true);
    }
    if (errorUpdating) {
      setMessage(ERROR_UPDATING);
      setOpen(true);
    }
    return () => {
      setOpen(false);
    };
  }, [successUpdating, errorFetching, errorUpdating]);

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
            severity={message?.severity}
            sx={{ width: "100%" }}
          >
            {`${message?.title} ${message?.message} ${subMessage ?? ""}`}
          </Alert>
        </Snackbar>
      </Grid>
    </Box>
  );
};

export default AlertNotification;
