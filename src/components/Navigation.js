import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { logout } from "../redux/actions/authAction";

const Navigation = () => {
  const selectAuth = (state) => state.auth;
  const auth = useSelector(selectAuth);
  const dispatch = useDispatch();
  const history = useHistory();

  const [isOpen, setIsOpen] = useState(false);

  const logOut = () => {
    dispatch(logout());
    history.push("/");
  };

  const toggle = () => setIsOpen(!isOpen);
  return (
    <div>
      {auth.isAuthenticated ? (
        <Navbar id="auth" dark expand="md" fixed="top">
          <NavbarToggler onClick={toggle} />
          <NavbarBrand href="/">Destination Finder</NavbarBrand>
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink href="/search">Search</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/saved">Saved</NavLink>
              </NavItem>
              <NavItem id="logout">
                <NavLink onClick={() => logOut()} href="#">
                  Logout
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      ) : (
        <Navbar id="notAuth" dark expand="sm" fixed="top">
          <NavbarToggler onClick={toggle} />
          <NavbarBrand href="/">Destination Finder</NavbarBrand>
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink href="/search">Search</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/saved">Saved</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/login">Login</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/Signup">Signup</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      )}
    </div>
  );
};

export default Navigation;
