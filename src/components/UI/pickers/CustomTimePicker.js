import { TimePicker } from "@mui/x-date-pickers";

const CustomTimePicker = ({ label, value, onChange }) => {
  return (
    <TimePicker
      label={label}
      value={value}
      onChange={onChange}
      ampm={false}
      slotProps={{ textField: { variant: "outlined" } }}
    />
  );
};

export default CustomTimePicker;
