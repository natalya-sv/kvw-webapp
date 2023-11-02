import React, { useState } from "react";
import { LOGIN, LOGOUT } from "../APIData";

const AuthContext = React.createContext({
  isLoggedIn: false,
  token: null,
  onLogin: (username, password) => {},
  onLogout: () => {},
});
export const AuthContextProvider = (props) => {
  const initToken = localStorage.getItem("userToken");
  const [token, setToken] = useState(initToken);
  const isLoggedIn = !!token;

  const loginHandler = async (username, enteredPassword) => {
    let loginToken;
    try {
      const response = await fetch(LOGIN, {
        method: "POST",
        body: JSON.stringify({
          username: username,
          password: enteredPassword,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        loginToken = response.headers.get(process.env.REACT_APP_TOKEN_NAME);
        localStorage.setItem("userToken", loginToken);
        setToken(loginToken);
      } else {
        alert("Password and email do not match");
      }
    } catch (error) {
      alert("Server is not available", error);
    }
  };

  const logoutHandler = async () => {
    try {
      await fetch(LOGOUT);
    } catch (error) {
      console.error(error);
    } finally {
      setToken(null);
      localStorage.removeItem("userToken");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token: token,
        isLoggedIn: isLoggedIn,
        onLogin: loginHandler,
        onLogout: logoutHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
