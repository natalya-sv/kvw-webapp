import { Alert, Snackbar, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { notificationActions } from "../../store/notification/notification-slice";
import { useDispatch } from "react-redux";

const AlertNotification = (props) => {
  const [open, setOpen] = useState(false);
  const { severity, title, message, subMessage, isActive } =
    props?.notification;
  const dispatch = useDispatch();

  const handleCloseSnackBar = (_event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(notificationActions.hideNotification());
    setOpen(false);
  };

  useEffect(() => {
    if (title && message && isActive) {
      console.log("alert");
      setOpen(true);
    }
    return () => {
      console.log("cleaning");
      dispatch(notificationActions.hideNotification());
    };
  }, [title, message, isActive, dispatch]);

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
            severity={severity}
            sx={{ width: "100%" }}
          >
            {`${title} ${message} ${subMessage ?? ""}`}
          </Alert>
        </Snackbar>
      </Grid>
    </Box>
  );
};

export default AlertNotification;
