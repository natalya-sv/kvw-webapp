import { TableHead, TableRow, TableCell, Checkbox } from "@mui/material";
import React from "react";
import { ADD, EDIT } from "../../helpers/constants";
import CustomTableCell from "./CustomTableCell";
const TableHeader = ({
  onEditItem,
  onSelectAllClick,
  numSelected,
  onAddNewSubRowItem,
  rowCount,
  tableDefinition,
}) => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>
          <Checkbox
            color="primary"
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>
        {tableDefinition.map((headCell) => (
          <CustomTableCell
            type={"header"}
            value={headCell.label}
            key={headCell.id}
          />
        ))}
        {onEditItem && (
          <CustomTableCell type={"tableButton"} value={EDIT} key={"edit"} />
        )}
        {onAddNewSubRowItem && (
          <CustomTableCell type={"tableButton"} value={ADD} key={"add"} />
        )}
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
