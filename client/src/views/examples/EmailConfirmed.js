import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Button,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import ScrollTransparentNavbar from 'components/Navbars/ScrollTransparentNavbar.js'
import FooterBlack from "components/Footers/FooterBlack";

const LandingPage = () => {
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
                <h1 className="title">Your Email has been confirmed</h1>
                <h5 className="description" style={{color: 'black'}}>
                  Thanks for confirming your email! You are now ready to discover the most exciting 
                    stories from your favourite independent Writers & Poets!!
                </h5>
              </Col>
            </Row>
            <div className="separator separator-info"></div>
            <Button  className="nav-link btn-round"
              color='info'><Link to='/' style={{color: "black", textDecoration: "none"}}>
             <b>Keep discovering</b></Link></Button>
          </Container>
        </div>
        <FooterBlack />
      </div>
    </>
  );
}

export default LandingPage;
