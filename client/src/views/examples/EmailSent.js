import React from "react";

// reactstrap components
import {
  Button,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import ScrollTransparentNavbar from 'components/Navbars/ScrollTransparentNavbar.js'
import Footer from "components/Footers/Footer";

const EmailSent = () => {
  const [pills, setPills] = React.useState("1");
  const [firstFocus, setFirstFocus] = React.useState(false);
  const [emailFocus, setEmailFocus] = React.useState(false);
  React.useEffect(() => {
    document.body.classList.add("landing-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("landing-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, []);
  return (
    <>
      <ScrollTransparentNavbar />
      <div className="wrapper">
        <div className="section section-about-us">
          <Container>
            <Row>
              <Col className="ml-auto mr-auto text-center" md="8">
                <h1 className="title">Hey! Check your email!</h1>
                <h5 className="description" style={{color: 'black'}}>
                </h5>
                <div >
                  <h3 >Didn't get an email?</h3>
                  <ul className="text-left">
                    <li>The email is in your spam folder. (Sometimes things get lost in there.)</li>
                    <li>The email address you entered had a mistake or typo. (Happens to the best of us.)</li>
                    <li>You accidentally gave us another email address. (Usually a work or personal one instead of the one you meant.)</li>
                    <li>We can’t deliver the email to this address. (Usually because of corporate firewalls or filtering.)</li>
                  </ul>
                </div>
              </Col>
            </Row>
            <div className="separator separator-info"></div>
          </Container>
        </div>
        </div>
        <Footer />
    </>
  );
}

export default EmailSent;
