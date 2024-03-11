import { useContext, useState } from "react";
import AuthContext from "../context/auth-context";
import { LOGIN, PASSWORD, USERNAME } from "../helpers/constants";
import { Box } from "@mui/material";
import TextInput from "../components/TextInput";
import CustomButton from "../components/CustomButton";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { onLogin } = useContext(AuthContext);

  const login = () => {
    if (username && password) {
      onLogin(username, password);
    }
  };

  return (
    <Box
      width="100%"
      display="flex"
      justifyContent="center"
      alignContent="center"
    >
      <Box width="40%" display="flex" flexDirection="column" gap="10px 10px">
        <TextInput
          id="username"
          label={USERNAME}
          value={username}
          onChange={setUsername}
        />
        <TextInput
          id="password"
          label={PASSWORD}
          value={password}
          type={"password"}
          onChange={setPassword}
        />
        <CustomButton
          id={"login-button"}
          onClick={login}
          title={LOGIN}
          disabled={username === "" || password === ""}
        />
      </Box>
    </Box>
  );
};
export default Login;
