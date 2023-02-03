import React from "react";
import BasePage from "./BasePage";
import "./HomeScreen.css";
import Navigator from "./Navigator";
import SideNav from "./SideNav";

function HomeScreen() {
  return (
    <div className="homescreen">
      <Navigator />
      {/* <SideNav /> */}
      {/* <BasePage /> */}
    </div>
  );
}

export default HomeScreen;
