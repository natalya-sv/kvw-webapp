import { TextField } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";

const CustomTimePicker = ({ label, value, onChange }) => {
  return (
    <TimePicker
      label={label}
      value={value}
      onChange={onChange}
      ampm={false}
      renderInput={(params) => <TextField {...params} />}
    />
  );
};

export default CustomTimePicker;
