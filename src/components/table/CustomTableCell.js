import { IconButton, TableCell } from "@mui/material";
import ImageView from "../ImageView";
import "dayjs/locale/nl";
import dayjs from "dayjs";
const CustomTableCell = ({ type, value, onClick, icon }) => {
  let content = null;
  let fontWeight = "normal";
  let fontSize = 14;

  switch (type) {
    case "header":
    case "subHeader":
    case "tableButton":
      content = value.toUpperCase();
      fontWeight = "bold";
      fontSize = 12;
      break;
    case "rowButton":
      content = <IconButton onClick={onClick}>{icon}</IconButton>;
      break;
    case "image":
      content = value ? (
        <ImageView image={value} width={100} height={70} text={value} />
      ) : (
        "---"
      );
      break;
    case "array": {
      if (value.length > 0) {
        content = value.join(", ");
      } else {
        content = "";
      }
      break;
    }
    case "date":
    case "date-time":
      if (type === "date") {
        content = dayjs(value).locale("nl").format("DD-MMMM-YYYY");
      }
      if (type === "date-time") {
        content = dayjs(value).locale("nl").format("DD-MMMM-YYYY, HH:mm");
      }
      break;
    case "icon":
    case "text":
      content = value;
      break;
    default:
      content = "";
  }

  return (
    <TableCell
      style={{
        fontWeight: fontWeight,
        fontSize,
      }}
    >
      {content}
    </TableCell>
  );
};

export default CustomTableCell;
