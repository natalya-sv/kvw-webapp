import React from "react";
import { Typography, Box } from "@mui/material";
const Title = (props) => {
  return (
    <Box
      style={{
        width: "90%",
        display: "flex",
        justifyContent: "center",
        marginTop: 5,
      }}
    >
      <Typography color={"#ea507c"} variant="h4">
        {props.title}
      </Typography>
    </Box>
  );
};

export default Title;
