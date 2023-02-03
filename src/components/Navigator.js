import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  Row,
  Col,
} from "reactstrap";

export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar fixed="top" color="light" light expand="md">
      <NavbarBrand
        style={{ fontSize: "25px", fontWeight: "bolder", color: "grey" }}
        className="navbar__title"
      >
        SMMPannel
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink href="">Sign In</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="">Sign Up</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="">About</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="">Balance</NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};
