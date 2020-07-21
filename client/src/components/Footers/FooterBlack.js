/*eslint-disable*/
import React from "react";
import { Link } from 'react-router-dom';

// reactstrap components
import { Container, NavbarBrand } from "reactstrap";

// core components

function FooterBlack() {
  return (
    <>
      <footer className="footer align-items-baseline" data-background-color="black">
        <Container className='justify-content-center'>
          <nav>
            <ul>
              <li>
              <NavbarBrand to="/" tag={Link} id="navbar-brand">
              StoryMe
            </NavbarBrand>
              </li>
              <li>
                <a
                  href="https://github.com/edisonabdiel/StoryMe"
                  target="_blank"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  // href=""
                  target="_blank"
                >
                  Blog
                </a>
              </li>
            </ul>
          </nav>
          <div className="copyright" id="copyright">
            © {new Date().getFullYear()}
            . Coded by{" "}
            <a
              href="http://www.github.com/edisonabdiel"
              target="_blank"
            >
              Edison
            </a>,
            <a
              href="http://www.github.com/dkoushha"
              target="_blank"
            >
              Dima
            </a>,
            <a
              href="http://www.github.com/noutop"
              target="_blank"
            >
              Noubar
            </a>
            .
          </div>
        </Container>
      </footer>
    </>
  );
}

export default FooterBlack;
