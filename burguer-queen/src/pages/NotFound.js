import React from "react";
import { Box } from "@mui/material";

const NotFound = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <h1>No encontrado</h1>
    </Box>
  );
};

export default NotFound;
