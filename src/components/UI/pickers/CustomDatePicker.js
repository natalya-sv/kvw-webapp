import { DesktopDatePicker } from "@mui/x-date-pickers";

const CustomDatePicker = ({ label, value, format, onChange, disabled }) => {
  return (
    <DesktopDatePicker
      label={label}
      value={value}
      onChange={onChange}
      inputFormat={format}
      slotProps={{ textField: { variant: "outlined" } }}
      disabled={disabled}
    />
  );
};

export default CustomDatePicker;
