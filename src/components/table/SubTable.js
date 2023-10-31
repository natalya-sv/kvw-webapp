import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import React, { useState } from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Checkbox from "@mui/material/Checkbox";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomTableCell from "./CustomTableCell";
import { EDIT, REMOVE } from "../../helpers/constants";
const SubTable = ({
  row,
  isSelected,
  handleClick,
  tableDefinition,
  onEditItem,
  onEditSubRowItem,
  subRowItemsDefinition,
  subTableTitle,
  subTableListName,
  hasAddButton,
  onAddNewSubRowItem,
  hasEditButton,
  onRemoveSubRowItem,
}) => {
  const [open, setOpen] = useState(false);
  const isItemSelected = isSelected(row.id);

  return (
    <>
      <TableRow key={row.id}>
        <TableCell width={10}>
          <Checkbox
            onChange={(event) => handleClick(event, row.id)}
            color="primary"
            checked={isItemSelected}
          />
        </TableCell>
        <TableCell width={10}>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {tableDefinition.map((t, i) => {
          if (t.type === "empty") {
            return null;
          }
          return <CustomTableCell key={t.id} value={row[t.id]} type={t.type} />;
        })}
        {hasEditButton && (
          <TableCell align={"center"} width={50}>
            <IconButton onClick={() => onEditItem(row.id)}>
              <ModeEditIcon />
            </IconButton>
          </TableCell>
        )}
        {hasAddButton && (
          <TableCell align={"center"} width={50}>
            <IconButton onClick={() => onAddNewSubRowItem(row.id)}>
              <AddCircleIcon />
            </IconButton>
          </TableCell>
        )}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" style={{ fontWeight: "bold" }}>
                {subTableTitle}
              </Typography>
              <Table>
                <TableHead>
                  <TableRow key={row.id}>
                    {subRowItemsDefinition.map((itemDef) => {
                      return (
                        <CustomTableCell
                          value={itemDef.label}
                          key={itemDef.id}
                          type={"subHeader"}
                        />
                      );
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row[subTableListName].map((subTableItem) => (
                    <TableRow key={subTableItem.id}>
                      {subRowItemsDefinition.map((subRowDef) => (
                        <CustomTableCell
                          key={subRowDef.id}
                          type={subRowDef.type}
                          value={subTableItem[subRowDef.id]}
                        />
                      ))}
                      <TableCell>
                        <Tooltip title={EDIT}>
                          <IconButton
                            onClick={() =>
                              onEditSubRowItem(subTableItem.id, row.id)
                            }
                          >
                            <ModeEditIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>

                      <TableCell>
                        <Tooltip title={REMOVE}>
                          <IconButton
                            onClick={() => onRemoveSubRowItem(subTableItem.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};
export default SubTable;
