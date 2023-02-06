import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./SideNav.css";

function SideNav() {
  return (
    <div className="sidebar">
      <div className="sidebar__buttons">
        <NavLink className="button_link" activeClassName="active" to="/">
          {" "}
          Krijo porosi
        </NavLink>
        <NavLink
          className="button_link"
          activeClassName="active"
          to="/services"
        >
          {" "}
          Te gjitha sherbimet
        </NavLink>
        <NavLink className="button_link" activeClassName="active" to="/refill">
          {" "}
          Porosite e mia
        </NavLink>
        <NavLink className="button_link" activeClassName="active" to="/funds">
          {" "}
          Shto lek ne llogari
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
