import { Box, IconButton, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  width: "90%",
};
const CustomModal = ({ modalComponent, open, handleClose }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Box
          style={{
            marginBottom: 10,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box>{modalComponent}</Box>
      </Box>
    </Modal>
  );
};

export default CustomModal;
