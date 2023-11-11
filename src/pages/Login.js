import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/auth-context";
import { LOGIN, PASSWORD, USERNAME } from "../helpers/constants";
import { Box } from "@mui/material";
import TextInput from "../components/TextInput";
import CustomButton from "../components/CustomButton";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const history = useHistory();
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const login = (e) => {
    e.preventDefault();
    if (username && password) {
      auth.onLogin(username, password);
    }
  };

  useEffect(() => {
    if (auth.isLoggedIn) {
      navigate("/home");
    }
  }, [auth.isLoggedIn, navigate]);

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
          onClick={login}
          title={LOGIN}
          disabled={username === "" || password === ""}
        />
      </Box>
    </Box>
  );
};
export default Login;
