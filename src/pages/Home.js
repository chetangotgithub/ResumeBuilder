import React from "react";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <>
      <section
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1>Home Page</h1>
        <Link to={`/signUp`}>
          <Button variant="outlined" color="primary">
            Sign Up
          </Button>
        </Link>
        <Link to={`/signIn`}>
          <Button variant="outlined" color="primary">
            Sign In
          </Button>
        </Link>
      </section>
    </>
  );
};

export default Home;
