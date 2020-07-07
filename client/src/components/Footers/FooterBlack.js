/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";

// core components

function FooterBlack() {
  return (
    <>
      <footer className="footer " data-background-color="black">
        <Container>
          <nav>
            <ul>
              <li>
                <a
                  // href=""
                  target="_blank"
                >
                  StoryMe
                </a>
              </li>
              <li>
                <a
                  // href=""
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
              href=""
              target="_blank"
            >
              Dima, Edison & Noubar
            </a>
            .
          </div>
        </Container>
      </footer>
    </>
  );
}

export default FooterBlack;
