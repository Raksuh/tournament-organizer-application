import React from "react";
import { Typography } from "@mui/material";
import { ROOT } from "./Routes";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <>
      {/* <Navigate to={ROOT}>Home</Navigate> */}
      <Link to={ROOT}>Home</Link>

      <Typography variant='h2'>404: page not found!</Typography>
    </>
  );
};
