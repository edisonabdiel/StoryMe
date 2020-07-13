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
  Container,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle
} from "reactstrap";
import Logout from "views/examples/Logout";
import Login from 'views/examples/Login';


function FixedTransparentNavbar(props) {
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
      <Navbar className="navbar-absolute" expand="lg">
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
              <Link to="/" ><i className="now-ui-icons objects_globe p-md-3"></i></Link>
              <Link to="/profile-page" ><i
                aria-hidden={true}
                className="now-ui-icons users_single-02 p-md-3"
              ></i></Link>
              <Link to="/contact-us"><i
                aria-hidden={true}
                className="now-ui-icons ui-1_email-85 p-md-3"
              ></i></Link>
              <UncontrolledDropdown>
                <DropdownMenu>
                  <i className="now-ui-icons design_image"></i>
                  <DropdownItem>
                    <Logout updateUser={props.updateUser} />
                  </DropdownItem>
                </DropdownMenu>
                <UncontrolledDropdown className="button-dropdown p-md-2" >
                  <DropdownToggle
                    caret
                    tag="a"
                    data-toggle="dropdown"
                    id="navbarDropdown"
                    onClick={(e) => e.preventDefault()}
                  >
                    <span className="button-bar"></span>
                    <span className="button-bar"></span>
                    <span className="button-bar"></span>
                  </DropdownToggle>
                  <DropdownMenu aria-labelledby="navbarDropdown" data-background-color="black">
                    <DropdownItem onClick={(e) => e.preventDefault()}>
                      <Logout size="sm" updateUser={props.updateUser} {...props} />
                    </DropdownItem>
                    <DropdownItem onClick={(e) => e.preventDefault()}>
                      <Link to="/login-page" style={{ textDecoration: 'none' }}><Login /></Link>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </UncontrolledDropdown>
              {/* <NavItem>
                <Button
                  className="nav-link btn-success"
                  color="success"
                  href=""
                  target="_blank"
                >
                  <p>PUBLISH</p>
                </Button>
              </NavItem> */}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default FixedTransparentNavbar;
