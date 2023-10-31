import {
  Table,
  Box,
  TableRow,
  TableCell,
  Checkbox,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import TableHeader from "./TableHeader";
import TableToolbar from "./TableToolbar";
import { EDIT } from "../../helpers/constants";
import CustomTableCell from "./CustomTableCell";

const SimpleTable = (props) => {
  const { items: rows, headCells, buttons } = props;
  const [selected, setSelected] = useState([]);
  const isSelected = (id) => selected.indexOf(id) !== -1;
  const hasEditButton = buttons && buttons.includes("edit");
  const hasDeleteItemsButton = buttons && buttons.includes("delete");

  const removeSelectedItems = (selectedIds) => {
    props.onRemove(selectedIds);
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (_event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  return (
    <Box style={{ width: "90%", marginBottom: 30 }}>
      <Paper style={{ width: "100%", mb: 2 }}>
        <TableToolbar
          title={props.title}
          numSelected={selected.length}
          removeSelectedItems={removeSelectedItems}
          selected={selected}
          hasDeleteItemsButton={hasDeleteItemsButton}
          extraButtons={props.extraButtons}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={"small"}
          >
            <TableHeader
              hasEditButton={hasEditButton}
              headCells={headCells}
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={rows.length}
            />
            <TableBody>
              {rows.map((row) => {
                const isItemSelected = isSelected(row.id);
                return (
                  <TableRow hover key={row.id}>
                    <TableCell key={`selected-key-${row.id}`}>
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        onChange={(event) => handleClick(event, row.id)}
                      />
                    </TableCell>

                    {headCells.map((v) => {
                      return (
                        <CustomTableCell
                          type={v.type}
                          value={row[v.id]}
                          key={`${row.id}-${v.id}`}
                        />
                      );
                    })}

                    {hasEditButton && (
                      <TableCell width={100} key={`edit-${row.id}`}>
                        <Tooltip title={EDIT}>
                          <IconButton onClick={() => props.onEditItem(row.id)}>
                            <ModeEditIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};
export default SimpleTable;
