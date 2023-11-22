import { Box, Dialog, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const CustomDialog = ({ openDialog, handleCloseDialog, title, component }) => {
  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={openDialog}
      onClose={handleCloseDialog}
    >
      <Box sx={{ width: "100%" }}>
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <DialogTitle>{title}</DialogTitle>
          <IconButton onClick={handleCloseDialog} style={{ margin: 10 }}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>

      <Box>{component}</Box>
    </Dialog>
  );
};

export default CustomDialog;
