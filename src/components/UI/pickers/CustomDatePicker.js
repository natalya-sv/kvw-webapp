import { TextField } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers";

const CustomDatePicker = ({ label, value, format, onChange, disabled }) => {
  return (
    <DesktopDatePicker
      label={label}
      value={value}
      onChange={onChange}
      inputFormat={format}
      renderInput={(params) => <TextField {...params} />}
      disabled={disabled}
    />
  );
};

export default CustomDatePicker;
