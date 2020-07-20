import React from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useEffect } from 'react';

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

const EmailConfirmed = (props) => {

  useEffect(() => {
    axios.get(`/api/confirmation/${props.match.params.token}`)
      .then((res) => {
        props.updateUser(res.data)
        console.log("outPut: SignupPage -> user", props.currentUser)
      })
      .catch((error) => {
        console.log("outPut: SignupPage -> handleFormSubmit -> error", error.response)

      })
  },[])

  return (
    <>
      <ScrollTransparentNavbar currentUser={props.currentUser} updateUser={props.updateUser} />
      <div className="wrapper">
        <div className="section section-about-us">
          <Container>
            <Row>
              <Col className="ml-auto mr-auto text-center" md="8">
                <h1 className="title">Your Email has been confirmed</h1>
                <h5 className="description" style={{ color: 'black' }}>
                  Thanks for confirming your email! You are now ready to discover the most exciting
                  stories from your favourite independent Writers & Poets!!
                </h5>
              </Col>
            </Row>
            <div className="separator separator-info"></div>
            <Button className="nav-link btn-round"
              color='info'><Link to='/' style={{ color: "black", textDecoration: "none" }}>
                <b>Keep discovering</b></Link></Button>
          </Container>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default EmailConfirmed;
