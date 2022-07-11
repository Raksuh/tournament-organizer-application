import React, { useEffect, useState } from "react";
import { GoogleLogin } from "react-google-login";
import { Avatar, Button, Paper, Grid, Typography, Container } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import useStyles from "./styles";
import Input from "./Input";
import { signIn, signUp } from "../../actions/auth";
import Icon from "./icon";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    if (user) {
      navigate("/tournaments");
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(signUp(formData, navigate));
    } else {
      dispatch(signIn(formData, navigate));
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };
  const googleLoginSuccess = async (response) => {
    const profileObj = response?.profileObj;
    const token = response?.tokenId;

    try {
      dispatch({ type: "AUTH", data: { profileObj, token } });
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const googleLoginFailure = (error) => {
    console.error(error);
    console.log("Google Sign In was unsuccessful. Try Again Later");
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant='h5'>{isSignup ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  type='text'
                  name='firstName'
                  label='First Name'
                  handleChange={handleChange}
                  half
                />
                <Input
                  type='text'
                  name='lastName'
                  label='Last Name'
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input type='email' name='email' label='Email Address' handleChange={handleChange} />
            {isSignup && (
              <Input type='phone' name='phone' label='Phone Number' handleChange={handleChange} />
            )}
            <>
              <Input
                type={showPassword ? "text" : "password"}
                name='password'
                label='Password'
                handleChange={handleChange}
                handleShowPassword={handleShowPassword}
              />
              {isSignup && (
                <Input
                  type='password'
                  name='confirmPassword'
                  label='Confirm Password'
                  handleChange={handleChange}
                />
              )}
            </>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              {isSignup ? "Sign Up" : "Sign In"}
            </Button>
            <GoogleLogin
              clientId='293975928612-sapg6vhfj7rhjag5goehapvb79j503o3.apps.googleusercontent.com'
              render={(renderProps) => (
                <Button
                  className={classes.googleButton}
                  color='primary'
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  startIcon={<Icon />}
                  variant='contained'
                  fullWidth
                >
                  Sign In with
                </Button>
              )}
              onSuccess={googleLoginSuccess}
              onFailure={googleLoginFailure}
              cookiePolicy='single_host_origin'
            />
            <Grid container justifyContent='flex-end'>
              <Grid item>
                <Button variant='text' onClick={switchMode}>
                  {isSignup ? "Login to an existing account" : "Create an account"}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
