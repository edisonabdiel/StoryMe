/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";

// core components

const Footer = () => {
  return (
    <>
      <footer className="footer fixed-bottom" data-background-color="black">
        <Container>
          <nav>
            <ul>
              <li>
                <a
                  to='/'
                  target="_blank"
                >
                  StoryMe
                </a>
              </li>
              <li>
                <a
                  to='/'
                  target="_blank"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  to="/"
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
              Edison, Dima & Noubar
            </a>
            .
          </div>
        </Container>
      </footer>
    </>
  );
}

export default Footer;
