import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./SideNav.css";

function SideNav() {
  return (
    <div className="sidebar">
      <div className="sidebar__buttons">
        <NavLink className="button_link" activeClassName="active" to="/">
          {" "}
          Order
        </NavLink>
        <NavLink
          className="button_link"
          activeClassName="active"
          to="/services"
        >
          {" "}
          Services
        </NavLink>
        <NavLink className="button_link" activeClassName="active" to="/refill">
          {" "}
          Refill
        </NavLink>
        <NavLink className="button_link" activeClassName="active" to="/funds">
          {" "}
          Add Funds
        </NavLink>
        <NavLink className="button_link" activeClassName="active" to="/api">
          {" "}
          API
        </NavLink>
        <NavLink className="button_link" activeClassName="active" to="/ticket">
          {" "}
          Tickets
        </NavLink>
      </div>
    </div>
  );
}

export default SideNav;
