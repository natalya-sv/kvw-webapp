import React, { useState } from "react";
import { LOGIN, LOGOUT } from "../APIData";

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogin: (username, password) => {},
  onLogout: () => {},
});
export const AuthContextProvider = (props) => {
  const initToken = localStorage.getItem("userToken");
  const [isLoggedIn, setIsLoggedIn] = useState(initToken);

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
        setIsLoggedIn(true);
      } else {
        throw new Error(response);
      }
    } catch (error) {
      alert("Something went wrong..." + error.message);
      setIsLoggedIn(false);
    }
  };

  const logoutHandler = async () => {
    try {
      await fetch(LOGOUT);
    } catch (error) {
      console.error("logout:", error);
    } finally {
      setIsLoggedIn(false);
      localStorage.removeItem("userToken");
    }
  };

  return (
    <AuthContext.Provider
      value={{
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
