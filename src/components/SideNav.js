import React from "react";
import "./SideNav.css";

function SideNav() {
  return (
    <div className="sidebar">
      <div className="sidebar__buttons">
        <button className="active">New Order</button>
        <button>Services</button>
        <button>Orders</button>
        <button>Refill</button>
        <button>Add Funds</button>
        <button>API</button>
        <button>Tickets</button>
      </div>
    </div>
  );
}

export default SideNav;
