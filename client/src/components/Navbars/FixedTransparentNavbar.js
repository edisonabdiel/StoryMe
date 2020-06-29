/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Button,
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  Nav,
  Container
} from "reactstrap";

function FixedTransparentNavbar() {
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  return (
    <>
      {collapseOpen ? (
        <div
          id="bodyClick"
          onClick={() => {
            document.documentElement.classList.toggle("nav-open");
            setCollapseOpen(false);
          }}
        />
      ) : null}
      <Navbar className="navbar-absolute navbar-transparent" expand="lg">
        <Container>
          <div className="navbar-translate">
            <NavbarBrand to="/" tag={Link} id="navbar-brand">
              StoryMe
            </NavbarBrand>
            <button
              onClick={() => {
                document.documentElement.classList.toggle("nav-open");
                setCollapseOpen(!collapseOpen);
              }}
              aria-expanded={collapseOpen}
              className="navbar-toggler"
            >
              <span className="navbar-toggler-bar top-bar"></span>
              <span className="navbar-toggler-bar middle-bar"></span>
              <span className="navbar-toggler-bar bottom-bar"></span>
            </button>
          </div>
          <Collapse isOpen={collapseOpen} navbar>
            <Nav className="ml-auto" id="ceva" navbar>
                  <Link to="/" nav><i className="now-ui-icons objects_globe p-md-3"></i></Link>
                  <Link to="/profile-page" nav><i
                    aria-hidden={true}
                    className="now-ui-icons users_single-02 p-md-3"
                  ></i></Link>
              <Link to="/contact-us"><i
                    aria-hidden={true}
                    className="now-ui-icons ui-1_email-85 p-md-3"
                  ></i></Link>
              <NavItem>
                <Button
                  className="nav-link btn-success"
                  color="success"
                  href=""
                  target="_blank"
                >
                  <p>PUBLISH</p>
                </Button>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default FixedTransparentNavbar;
