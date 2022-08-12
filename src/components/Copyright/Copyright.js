import React from "react";
import Typography from "@mui/material/Typography";

const Copyright = (props) => {
  return (
    <Typography variant='body2' color='text.secondary' align='center' {...props}>
      {"© Jean-Noël Prouteau 2022."}
    </Typography>
  );
};

export default Copyright;
