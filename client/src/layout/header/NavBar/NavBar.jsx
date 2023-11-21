import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavBar = ({ user }) => {
  return (
    <Navbar
      className="justify-content-between"
      style={{ background: "linear-gradient(to right, pink, white)" }}
      expand="lg"
    >
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <div className="d-flex justify-content-between w-100">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/home">
              דף הבית
            </Nav.Link>
            <Nav.Link as={Link} to="/contact">
              צור קשר
            </Nav.Link>
            <Nav.Link as={Link} to="/gallery">
              גלריה
            </Nav.Link>
            <Nav.Link as={Link} to="/about">
              שו"ת
            </Nav.Link>
            {user && user.biz && (
              <Nav.Link as={Link} to="my-cards">
                הקינוחים שלי
              </Nav.Link>
            )}
            {user && (
              <Nav.Link as={Link} to="my-fav-cards">
                מועדפים
              </Nav.Link>
            )}
          </Nav>
          <Nav>
            {!user && (
              <>
                <Nav.Link as={Link} to="/login">
                  התחבר
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  הירשם
                </Nav.Link>
              </>
            )}
            {user && <Nav.Link href="logout">התנתק</Nav.Link>}
          </Nav>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
