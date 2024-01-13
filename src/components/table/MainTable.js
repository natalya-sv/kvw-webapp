import { Box, Table } from "@mui/material";
import { useEffect, useState } from "react";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import TableHeader from "./TableHeader";
import TableToolbar from "./TableToolbar";
import SubTableRow from "./SubTableRow";
import SimpleTableRow from "./SimpleTableRow";

const MainTable = ({
  items,
  tableDefinition,
  title,
  onRemoveItems,
  onEditItem,
  onEditSubRowItem,
  subRowItemsDefinition,
  subTableTitle,
  subTableListName,
  onAddNewSubRowItem,
  onRemoveSubRowItem,
  extraButtons,
  successUpdating,
}) => {
  const [selected, setSelected] = useState([]);
  const isSelected = (id) => selected.indexOf(id) !== -1;

  const handleSelectAllRowsClick = (event) => {
    if (event.target.checked) {
      const newSelected = items.map((item) => item.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  useEffect(() => {
    if (successUpdating) {
      setSelected([]);
    }
  }, [successUpdating]);

  const handleRowClick = (_event, id) => {
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
      <Paper style={{ width: "100%" }}>
        <TableToolbar
          title={title}
          selected={selected}
          onRemoveItems={onRemoveItems}
          extraButtons={extraButtons}
        />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 750 }} size={"small"}>
            <TableHeader
              onEditItem={onEditItem}
              onAddNewSubRowItem={onAddNewSubRowItem}
              tableDefinition={tableDefinition}
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllRowsClick}
              rowCount={items.length}
            />
            <TableBody>
              {items.map((row) => {
                return subRowItemsDefinition ? (
                  <SubTableRow
                    key={row.id}
                    row={row}
                    isSelected={isSelected}
                    handleClick={handleRowClick}
                    tableDefinition={tableDefinition}
                    onEditItem={onEditItem}
                    onEditSubRowItem={onEditSubRowItem}
                    subRowItemsDefinition={subRowItemsDefinition}
                    subTableTitle={subTableTitle}
                    subTableListName={subTableListName}
                    onAddNewSubRowItem={onAddNewSubRowItem}
                    onRemoveSubRowItem={onRemoveSubRowItem}
                  />
                ) : (
                  <SimpleTableRow
                    tableDefinition={tableDefinition}
                    onEditItem={onEditItem}
                    handleClick={handleRowClick}
                    isSelected={isSelected}
                    row={row}
                    key={row.id}
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

export default MainTable;
