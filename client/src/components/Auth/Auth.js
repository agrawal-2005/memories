import React, { useState } from "react";
import { Paper, Grid, Avatar, Button, Typography, Container, Box } from "@material-ui/core";
import useStyles from "./styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Input from "./Input";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom'
import { signin, signup } from "../../actions/auth";

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }

function Auth() {
  const classes = useStyles();
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if(isSignup){
      dispatch(signup(formData, navigate))
    }else{
      dispatch(signin(formData, navigate))
    }
  };

  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value})
  };

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const googleSuccess = async (res) => {
    const token = res?.credential;
    const decodedToken = jwtDecode(token);
    // const { email, name, picture } = decodedToken;

    try {
      // console.log(decodedToken);
      // console.log(`Email: ${email}, Name: ${name}, Picture: ${picture}`);
      dispatch({ type: 'AUTH', data: { result: decodedToken, token } });
      navigate('/');
    } catch (error) {
      console.log("Error in Google Sign In:", error);
    }
  };

  const googleFailure = (error) => {
    console.log(error);
    console.log('Google Sign In was unsuccessful. Try Again Later');
  };

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5">
            {isSignup ? "Sign Up" : "Sign In"}
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {isSignup && (
                <>
                  <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                  <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                </>
              )}
              <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
              <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
              {isSignup && (
                <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />
              )}
            </Grid>
            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
              {isSignup ? "Sign Up" : "Sign In"}
            </Button>
            <Box display="flex" justifyContent="center" mt={2} mb={2} width="100%">
          <GoogleLogin onSuccess={googleSuccess} onFailure={googleFailure} render={(renderProps) => (
              <Button onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<FcGoogle />} fullWidth variant="contained"
                style={{ backgroundColor: "#4285F4", color: "white", textTransform: "none", fontSize: "16px", height: "56px" }}
              >
                Login with Google
              </Button>
            )}
          />
        </Box>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button onClick={switchMode}>
                  {isSignup
                    ? "Already have an account? Sign In"
                    : "Don't have an account? Sign Up"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </div>
  );
}

function App() {
  return (
    <GoogleOAuthProvider clientId='666699443228-ip1a946h9qtjccco77eke2j9jgn848g5.apps.googleusercontent.com'>
      <Auth />
    </GoogleOAuthProvider>
  );
}

export default App;
