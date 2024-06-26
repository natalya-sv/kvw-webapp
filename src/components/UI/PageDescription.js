import { Typography, Box } from "@mui/material";
import React from "react";

const PageDescription = ({ text }) => {
  return (
    <Box
      style={{
        width: "90%",
        alignContent: "center",
        marginBottom: 20,
        marginTop: 20,
      }}
      display="flex"
      justifyContent={"center"}
    >
      <Typography variant="h6">{text}</Typography>
    </Box>
  );
};

export default PageDescription;
