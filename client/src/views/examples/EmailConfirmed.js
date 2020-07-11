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
import Footer from "components/Footers/Footer";

const EmailConfirmed = () => {
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
        <Footer />
      </div>
    </>
  );
}

export default EmailConfirmed;
