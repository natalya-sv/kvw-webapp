import { TableRow, TableCell, Checkbox, IconButton } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { EDIT } from "../../helpers/constants";
import CustomTableCell from "./CustomTableCell";

const SimpleTableRow = ({
  row,
  isSelected,
  handleClick,
  tableDefinition,
  onEditItem,
}) => {
  const isItemSelected = isSelected(row.id);
  return (
    <TableRow hover key={row.id}>
      <TableCell key={`key-${row.id}`}>
        <Checkbox
          color="primary"
          checked={isItemSelected}
          onChange={(event) => handleClick(event, row.id)}
        />
      </TableCell>

      {tableDefinition.map((headCell) => (
        <CustomTableCell
          type={headCell.type}
          value={row[headCell.id]}
          key={`${row.id}-${headCell.id}`}
        />
      ))}

      {onEditItem && (
        <TableCell width={100} key={`edit-${row.id}`}>
          <Tooltip title={EDIT}>
            <IconButton onClick={() => onEditItem(row.id)}>
              <ModeEditIcon />
            </IconButton>
          </Tooltip>
        </TableCell>
      )}
    </TableRow>
  );
};

export default SimpleTableRow;
