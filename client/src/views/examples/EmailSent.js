import React from "react";
import ScrollTransparentNavbar from 'components/Navbars/ScrollTransparentNavbar.js'
import Footer from "components/Footers/Footer";
import EditFixedNavbar from 'components/Navbars/EditFixedNavbar';

// reactstrap components
import {
  Container,
  Row,
  Col,
} from "reactstrap";

// core components



const EmailSent = (props) => {
  return (
    <>
      {/* <ScrollTransparentNavbar /> */}
      <div data-background-color="black">
        <EditFixedNavbar currentUser={props.currentUser} updateUser={props.updateUser} />
        <div style={{ height: '75px' }}></div>
        <div className="wrapper" >
          <div className="section section-about-us text-dark">
            <Container>
              <Row>
                <Col className="ml-auto mr-auto text-center text-dark" md="8" >
                  <h1 className="title text-dark">Hey! Check your email! </h1>
                  <h4 className='text-dark'> Verification email has ben sent to {props.currentUser.email}</h4>
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
      </div>
      <Footer />
    </>
  );
}

export default EmailSent;
