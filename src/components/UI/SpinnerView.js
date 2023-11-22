import { Box, CircularProgress } from "@mui/material";
const SpinnerView = () => {
  return (
    <Box
      style={{
        display: "flex",
        flexDrection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        marginTop: "6rem",
      }}
    >
      <CircularProgress color="success" />
    </Box>
  );
};

export default SpinnerView;
