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
import { logoutUser } from "../../features/userSlice";
import { auth } from "../../firebase";

export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const toggle = () => setIsOpen(!isOpen);
  const user = useSelector((state) => state.data.user);

  const handleLogout = async () => {
    await signOut(auth);
    dispatch(logoutUser());
  };

  return (
    <Navbar fixed="top" color="light" light expand="md">
      <NavbarBrand
        style={{ fontSize: "25px", fontWeight: "bolder", color: "grey" }}
        className="navbar__title"
      >
        SMMAlbania
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          {user.user ? (
            <>
              <NavItem>
                <NavLink href="">
                  {user.user ? user.user.username : " "}
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="">Balanca: ${user.balance.toFixed(3)}</NavLink>
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
                <NavLink href="#login">Sign In</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#signup">Sign Up</NavLink>
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
