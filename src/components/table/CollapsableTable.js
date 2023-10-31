import { Table, Box } from "@mui/material";
import { useState } from "react";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import TableHeader from "./TableHeader";
import TableToolbar from "./TableToolbar";
import SubTable from "./SubTable";

const CollapsableTable = ({
  items,
  tableDefinition,
  title,
  onRemoveItems,
  buttons,
  onEditItem,
  onEditSubRowItem,
  subRowItemsDefinition,
  subTableTitle,
  subTableListName,
  onAddNewSubRowItem,
  onRemoveSubRowItem,
}) => {
  const [selected, setSelected] = useState([]);
  const isSelected = (id) => selected.indexOf(id) !== -1;
  const removeSelectedItems = (selectedIds) => {
    onRemoveItems(selectedIds);
  };
  const hasDeleteButton = buttons && buttons.includes("delete");
  const hasEditButton = buttons && buttons.includes("edit");
  const hasAddButton = buttons && buttons.includes("add");

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = items.map((n) => n.id);
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
          title={title}
          numSelected={selected.length}
          removeSelectedItems={removeSelectedItems}
          selected={selected}
          hasDeleteItemsButton={hasDeleteButton}
        />
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={"small"}
          >
            <TableHeader
              hasEditButton={hasEditButton}
              hasAddButton={hasAddButton}
              headCells={tableDefinition}
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={items.length}
            />
            <TableBody>
              {items.map((row, index) => {
                return (
                  <SubTable
                    key={row.id}
                    row={row}
                    isSelected={isSelected}
                    handleClick={handleClick}
                    tableDefinition={tableDefinition}
                    onEditItem={onEditItem}
                    onEditSubRowItem={onEditSubRowItem}
                    subRowItemsDefinition={subRowItemsDefinition}
                    subTableTitle={subTableTitle}
                    subTableListName={subTableListName}
                    hasAddButton={hasAddButton}
                    onAddNewSubRowItem={onAddNewSubRowItem}
                    hasEditButton={hasEditButton}
                    onRemoveSubRowItem={onRemoveSubRowItem}
                  />
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default CollapsableTable;
