import React from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useEffect } from 'react';
// core components
import Footer from "components/Footers/Footer";
import EditFixedNavbar from 'components/Navbars/EditFixedNavbar';

// reactstrap components
import {
  Button,
  Container,
  Row,
  Col,
} from "reactstrap";





const EmailConfirmed = (props) => {

  useEffect((props) => {
    axios.get(`/api/confirmation/${props.match.params.token}`)
      .then((res) => {
        props.updateUser(res.data)
      })
  }, [])

  return (
    <>
      <div data-background-color="black">
        <EditFixedNavbar currentUser={props.currentUser} updateUser={props.updateUser} />
        <div style={{ height: '75px' }}></div>
        <div className="wrapper ">
          <div className="section text-center text-dark">
            <Container>
              <Row>
                <Col className="ml-auto mr-auto text-center text-dark" md="8">
                  <h1 className="title text-dark">Your Email has been confirmed</h1>
                  <h5 className="description text-dark" style={{ color: 'black' }}>
                    Thanks for confirming your email! You are now ready to discover the most exciting
                    stories from your favourite independent Writers & Poets!!
                </h5>
                <div className="justify-content-center d-flex">
              <Button className="nav-link btn-round"
                color='info'><Link to='/' style={{ color: "black", textDecoration: "none" }}>
                  <b>Keep discovering</b></Link></Button>
              </div>   
                </Col>
              </Row>
            </Container>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default EmailConfirmed;
