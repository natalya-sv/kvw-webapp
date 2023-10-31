import { TableHead, TableRow, TableCell, Checkbox } from "@mui/material";
import React from "react";
import { ADD, EDIT } from "../../helpers/constants";
import CustomTableCell from "./CustomTableCell";
const TableHeader = ({
  hasEditButton,
  onSelectAllClick,
  numSelected,
  hasAddButton,
  rowCount,
  headCells,
}) => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <CustomTableCell
            type={"header"}
            value={headCell.label}
            key={headCell.id}
          />
        ))}
        {hasEditButton && (
          <CustomTableCell type={"tableButton"} value={EDIT} key={"edit"} />
        )}
        {hasAddButton && (
          <CustomTableCell type={"tableButton"} value={ADD} key={"add"} />
        )}
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
