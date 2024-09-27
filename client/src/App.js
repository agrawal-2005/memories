import React from "react";
import { Container } from "@material-ui/core";
import Navbar from "./components/Navbar/Navbar.js";
import useStyles from "./styles";
import Home from "./components/Home/Home.js";
import Auth from "./components/Auth/Auth.js";
import { Routes, Route } from "react-router-dom"; // No BrowserRouter or Router here

const App = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="lg" className={classes.container}>
      <Navbar />
      <Routes>
        <Route path="/" exact Component={Home} />
        <Route path="/Auth" exact Component={Auth} />
      </Routes>
    </Container>
  );
};

export default App;
