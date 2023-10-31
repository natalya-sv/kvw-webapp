import { Box, Button } from "@mui/material";

const CustomButton = ({ onClick, title, disabled, startIcon, width }) => {
  return (
    <Box
      sx={{
        width: width ?? "100%",
        marginTop: 3,
        marginBottom: 5,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Button
        size="large"
        onClick={onClick}
        variant="contained"
        disabled={disabled}
        startIcon={startIcon ?? null}
      >
        {title}
      </Button>
    </Box>
  );
};
export default CustomButton;
