import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { logoutUser } from "../features/userSlice";
import { auth } from "../firebase";

export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const toggle = () => setIsOpen(!isOpen);
  const user = useSelector((state) => state.data.user);

  const handleLogout = () => {
    signOut(auth);
    dispatch(logoutUser());
  };

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
          {user ? (
            <>
              <NavItem>
                <NavLink href="">
                  {user.user ? user.user.username : " "}
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="">Balance: {user.balance}</NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={handleLogout} href="">
                  Logout
                </NavLink>
              </NavItem>
            </>
          ) : (
            <>
              <NavItem>
                <NavLink href="">Sign In</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="">Sign Up</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="">About</NavLink>
              </NavItem>
            </>
          )}
        </Nav>
      </Collapse>
    </Navbar>
  );
};
