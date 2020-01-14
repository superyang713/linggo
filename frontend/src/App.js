import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import Routes from "./Routes";

export default function App() {
    return (
        <div>
          <Navbar>
            <Navbar.Brand>
              <Link to="/">AdPo</Link>
            </Navbar.Brand>
            <Nav.Link href="/login">Login</Nav.Link>
            <Navbar.Toggle />
          </Navbar>
          <Routes />
        </div>
    );
}
