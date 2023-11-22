import { Typography, Box } from "@mui/material";
import React from "react";
import { alpha } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import { REMOVE, SELECTED } from "../../helpers/constants";
const TableToolbar = ({ title, onRemoveItems, selected, extraButtons }) => {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(selected.length > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {selected.length > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="subtitle1"
          component="div"
        >
          {selected.length} {SELECTED}
        </Typography>
      ) : (
        <Typography sx={{ flex: "1 1 100%" }} variant="h6" component="div">
          {title}
        </Typography>
      )}
      {extraButtons && selected.length > 0 && (
        <Box display={"flex"} flexDirection={"row"} marginRight={5}>
          {extraButtons.map((btn) => (
            <Tooltip title={btn.title} key={btn.id}>
              <IconButton onClick={() => btn.action(selected, btn.status)}>
                {btn.icon}
              </IconButton>
            </Tooltip>
          ))}
        </Box>
      )}
      {onRemoveItems && selected.length > 0 && (
        <Tooltip title={REMOVE} key={"btn-remove"}>
          <IconButton onClick={() => onRemoveItems(selected)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

export default TableToolbar;
