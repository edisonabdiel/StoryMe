/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";

// core components

const FooterDefault = () => {
  return (
    <>
      <footer className="footer footer-default" >
        <div style={{ color: 'black' }}>
        <Container >
          <nav>
            <ul >
              <li>
                <a
                 to="/"
                  target="_blank"
                >
                  StoryMe
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                >
                  Blog
                </a>
              </li>
            </ul>
          </nav>
          <div className="copyright" id="copyright" style={{ color: 'black' }}>
            © {new Date().getFullYear()}
            . Coded by{" "}
            <a
              href="https://github.com/edisonabdiel/StoryMe"
              target="_blank"
            >
              Dima, Noubar & Edison
            </a>
            .
          </div>
        </Container>

        </div>
      </footer>
    </>
  );
}

export default FooterDefault;
