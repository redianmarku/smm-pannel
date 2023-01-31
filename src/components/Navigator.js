import React from "react";
import "./Navbar.css";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

function Navigator() {
  return (
    <div className="navbar">
      <div className="navbar__content">
        <h2>SMMPANNEL.NET</h2>
        <div className="navbar__content__links">
          <a href="">Sign In</a>
          <a href="">Sign Up</a>
          <a href="">Services</a>
          <a href="">About</a>
        </div>
      </div>
    </div>
  );
}

export default Navigator;
