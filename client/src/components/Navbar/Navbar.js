import React, { useState, useEffect, useCallback } from "react";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useStyle from "./styles";
import { jwtDecode } from 'jwt-decode';
import memories from "../../images/memories.png";
import { useDispatch } from "react-redux";

const Navbar = () => {
  const classes = useStyle();
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const logout = useCallback(() => {
    dispatch({ type: 'LOGOUT' });
    navigate('/');
    setUser(null);
  }, [dispatch, navigate]); // Added dependencies

  useEffect(() => {
    const token = user?.token;
    if(token){
      const decodedToken = jwtDecode(token);

      if(decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location, logout, user?.token]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography
          component={Link}
          to="/"
          className={classes.heading}
          variant="h2"
          align="center"
        >
          Memories
        </Typography>
        <img
          className={classes.image}
          src={memories}
          alt="memories"
          height="60"
        />
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.result.name}
              src={user.result.picture}
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.result.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
