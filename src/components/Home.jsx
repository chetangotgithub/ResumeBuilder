import React from "react";
import { Link } from "react-router-dom";
import home from "../CSS/Home.module.css";
import img from "../CSS/img.jpg";
const Home = () => {
  return (
    <>
      <div className={home.body}>
        <div className={home.intro}>
          <h1>
            <b>RESUME BUILDER</b>
          </h1>
          <h4 style={{ fontFamily: "sans-serif" }}>
            Your Resume just a click away!!!
          </h4>
          <h6>
            Resume creates impact on recruter Build your resume for free and
            fast.
            <br /> Just add your details and BOOM!! resume is ready
          </h6>
          <br />
          <Link className={home.login_btn} to="/signin">
            Login
          </Link>
          <Link className={home.login_btn} to="/signup">
            Sign up
          </Link>
        </div>
        <div className={home.img}>
          <img src={img}></img>
        </div>
      </div>
      <div></div>
    </>
  );
};

export default Home;
