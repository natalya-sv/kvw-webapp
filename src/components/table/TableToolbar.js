import { Typography, Box } from "@mui/material";
import React from "react";
import { alpha } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import { SELECTED } from "../../helpers/constants";
const TableToolbar = (props) => {
  const {
    title,
    numSelected,
    hasDeleteItemsButton,
    removeSelectedItems,
    selected,
    extraButtons,
  } = props;
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} {SELECTED}
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {title}
        </Typography>
      )}
      {extraButtons && numSelected > 0 && (
        <Box display={"flex"} flexDirection={"row"} marginRight={5}>
          {extraButtons.map((b) => {
            return (
              <Tooltip title={b.title} key={b.id}>
                <IconButton onClick={(e) => b.func(selected, b.status)}>
                  {b.icon}
                </IconButton>
              </Tooltip>
            );
          })}
        </Box>
      )}
      {hasDeleteItemsButton && numSelected > 0 && (
        <Tooltip title={"REMOVE"} key={"btn-remove "}>
          <IconButton onClick={() => removeSelectedItems(selected)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

export default TableToolbar;
