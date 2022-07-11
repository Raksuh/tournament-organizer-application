import React from "react";
import { TextField, Grid, InputAdornment, IconButton } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const Input = ({ type, name, handleChange, label, autoFocus, handleShowPassword, half }) => (
  <Grid item xs={12} sm={half ? 6 : 12}>
    <TextField
      type={type}
      name={name}
      label={label}
      onChange={handleChange}
      variant='outlined'
      required
      fullWidth
      labe={label}
      autoFocus={autoFocus}
      InputProps={
        type === "password"
          ? {
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton onClick={handleShowPassword}>
                    {type === "password" ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }
          : null
      }
    />
  </Grid>
);

export default Input;
