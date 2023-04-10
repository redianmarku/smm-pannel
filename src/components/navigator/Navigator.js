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
import { Switch } from "@material-ui/core";
import "./Navigator.css";
import { setAdvancedMode } from "../../features/utilsSlice";

export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();

  const toggle = () => setIsOpen(!isOpen);
  const user = useSelector((state) => state.data.user);

  const handleLogout = async () => {
    await signOut(auth);
    dispatch(logoutUser());
  };

  const advMode = useSelector((state) => state.data.utils.advancedMode);

  return (
    <Navbar fixed="top" color="light" light expand="md">
      <NavbarBrand
        style={{ fontSize: "25px", fontWeight: "bolder", color: "grey" }}
        className="navbar__title"
      >
        <img width={200} src={process.env.PUBLIC_URL + "/logo.png"} alt="" />
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          {user.user ? (
            <>
              <NavItem>
                <NavLink href="">
                  👋 Miresevini {user.user ? user.user.username : " "}
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="">
                  🤑 Balanca: ${user.balance.toFixed(3)}
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={handleLogout} href="">
                  📤 Logout
                </NavLink>
              </NavItem>
              <NavItem style={{ display: "flex", alignItems: "center" }}>
                <span id="adv">Shaq te gjitha sherbimet 👉</span>
                <Switch
                  checked={advMode}
                  onChange={(e) => dispatch(setAdvancedMode(e.target.checked))}
                  color="default"
                />
              </NavItem>
            </>
          ) : (
            <>
              <NavItem>
                <NavLink href="#login">📥 Sign In</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#signup">💁‍♂️ Sign Up</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="">𝍕 About</NavLink>
              </NavItem>
            </>
          )}
        </Nav>
      </Collapse>
    </Navbar>
  );
};
