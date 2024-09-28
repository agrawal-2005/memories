import React from "react";
import { Container } from "@material-ui/core";
import Navbar from "./components/Navbar/Navbar.js";
import useStyles from "./styles";
import Home from "./components/Home/Home.js";
import Auth from "./components/Auth/Auth.js";
import { Routes, Route, Navigate } from "react-router-dom"; // Correct import
import PostDetails from "./components/PostDetails/PostDetails.jsx";

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const classes = useStyles();

  return (
    <Container maxWidth="xl" className={classes.container}>
      <Navbar />
      <Routes>
        {/* Redirect from "/" to "/posts" */}
        <Route path="/" exact element={<Navigate to="/posts" />} />
        {/* Main posts route */}
        <Route path="/posts" exact element={<Home />} />
        {/* Route for search posts */}
        <Route path="/posts/search" exact element={<Home />} />
        {/* Route for post details */}
        <Route path="/posts/:id" exact element={<PostDetails />} />
        {/* Auth route: if user is logged in, redirect to /posts, otherwise show Auth */}
        <Route path="/auth" exact element={!user ? <Auth /> : <Navigate to="/posts" />} />
      </Routes>
    </Container>
  );
};

export default App;
