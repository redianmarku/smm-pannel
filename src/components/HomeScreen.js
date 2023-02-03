import React from "react";
import BasePage from "./BasePage";
import "./HomeScreen.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SideNav from "./SideNav";
import { NavBar } from "./Navigator";

function HomeScreen() {
  return (
    <div className="homescreen">
      <NavBar />
      <div className="flex">
        <SideNav />
        <BasePage />
      </div>
    </div>
  );
}

export default HomeScreen;
