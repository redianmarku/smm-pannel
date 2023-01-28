import React from "react";
import BasePage from "./BasePage";
import "./HomeScreen.css";
import Navbar from "./Navbar";
import SideNav from "./SideNav";

function HomeScreen() {
  return (
    <div className="homescreen">
      <Navbar />
      <SideNav />
      <BasePage />
    </div>
  );
}

export default HomeScreen;
