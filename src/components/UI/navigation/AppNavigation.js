import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../../context/auth-context";
import { Breadcrumbs, Typography, Box, Button } from "@mui/material";
import { devColor, mainColor } from "../../../global";
import { routes } from "./routes";
import LogoutIcon from "@mui/icons-material/Logout";
const isDev = process.env.REACT_APP_API_URL.includes(
  process.env.REACT_APP_DEV_PREFIX
);

const AppNavigation = () => {
  const auth = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState("KVW");

  const logoutHandler = () => {
    auth.onLogout();
  };

  useEffect(() => {
    if (auth.isLoggedIn) {
      document.title = currentPage;
    } else {
      document.title = "Login";
    }
    return function () {
      document.title = "KVW web app";
    };
  }, [currentPage, auth.isLoggedIn]);

  return (
    <Box
      width={"100%"}
      paddingLeft={10}
      paddingTop={3}
      display="flex"
      flexDirection={"row"}
      justifyContent={"space-between"}
      style={{ backgroundColor: isDev ? devColor : mainColor }}
    >
      <Breadcrumbs aria-label="breadcrumb">
        {auth.isLoggedIn &&
          routes.map((routeItem) => (
            <NavLink
              key={routeItem.id}
              color="black"
              isActive={(_, location) => location.pathname === routeItem.url}
              style={{
                color: "black",
                textDecoration: "none",
              }}
              onClick={() => setCurrentPage(routeItem.name)}
              activeStyle={{ color: "white", fontWeight: "bold" }}
              to={routeItem.url}
            >
              <Box display={"flex"} flexDirection={"row"} textAlign={"center"}>
                <Typography variant="subtitle1">{routeItem.name}</Typography>
              </Box>
            </NavLink>
          ))}
      </Breadcrumbs>

      <Box style={{ marginBottom: 10, marginRight: 10, alignItems: "center" }}>
        {auth.isLoggedIn && (
          <Button
            size="small"
            onClick={logoutHandler}
            variant="contained"
            startIcon={<LogoutIcon />}
          >
            Logout
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default AppNavigation;
