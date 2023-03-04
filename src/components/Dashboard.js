import React from "react";
import BasePage from "./BasePage";
import "./Dashboard.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SideNav from "./navigator/SideNav";

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="flex">
        <SideNav />
        <BasePage />
      </div>
    </div>
  );
}

export default Dashboard;
