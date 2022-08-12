import React from "react";
// import decode from "jwt-decode";
import { default as MuiAppBar } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
// import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

import { useAuthenticationContext } from "../../providers/AuthProvider";
import { LOGIN } from "../../navigation/Routes";
import { Link } from "react-router-dom";

const AppBar = () => {
  const { connectedUser, handleLogout } = useAuthenticationContext();

  return (
    <MuiAppBar
      position='absolute'
      color='default'
      elevation={0}
      sx={{
        position: "relative",
        borderBottom: (t) => `1px solid ${t.palette.divider}`,
      }}
    >
      <Toolbar>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          Niort GAA
        </Typography>
        <Typography
          component={Link}
          to='/'
          variant='h6'
          sx={{ flexGrow: 1, textDecoration: "none" }}
        >
          Tournament organizer
        </Typography>
        {connectedUser ? (
          <>
            {/* <Box sx={{ display: { xs: "none", md: "flex" } }}> */}
            {/* <Avatar alt={connectedUser.result.name} src={connectedUser.result.imageUrl}>
              {connectedUser.result.name.charAt(0)}
            </Avatar> */}
            {/* <Typography variant='h6'>{connectedUser.result.name}</Typography> */}
            <Button variant='inherit' color='secondary' onClick={handleLogout}>
              Logout
            </Button>
            {/* </Box> */}
          </>
        ) : (
          <Button color='inherit' href={LOGIN}>
            Login
          </Button>
        )}
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
