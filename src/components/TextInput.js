import { TextField } from "@mui/material";

const TextInput = ({
  fullWidth,
  id,
  variant,
  value,
  label,
  onChange,
  type,
  multiline,
  disabled,
}) => {
  return (
    <TextField
      fullWidth={fullWidth}
      id={id}
      value={value}
      label={label}
      variant={variant ?? "outlined"}
      onChange={(e) => onChange(e.target.value)}
      type={type ?? "text"}
      multiline={multiline ?? false}
      disabled={disabled}
    />
  );
};
export default TextInput;
