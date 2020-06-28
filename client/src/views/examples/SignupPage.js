import React, { Component } from 'react';
import axios from 'axios';



// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Label,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import FixedTransparentNavbar from "components/Navbars/FixedTransparentNavbar.js";
import Footer from "components/Footers/Footer.js";

// const [firstFocus, setFirstFocus] = React.useState(false);
// //   const [lastFocus, setLastFocus] = React.useState(false);
// //   const [emailFocus, setEmailFocus] = React.useState(false);
// export class SignupPage extends Component {
//   useEffect = (() => {
//     document.body.classList.add("signup-page");
//     document.body.classList.add("sidebar-collapse");
//     document.documentElement.classList.remove("nav-open");
//     window.scrollTo(0, 0);
//     document.body.scrollTop = 0;
//     return function cleanup() {
//       document.body.classList.remove("signup-page");
//       document.body.classList.remove("sidebar-collapse");
//     };
//   }, []);
//   render() {
//     return (
//       <>
//         <FixedTransparentNavbar />
//         <div className="page-header header-filter" filter-color="black">
//           <div
//             className="page-header-image"
//             style={{
//               backgroundImage: "url(" + require("assets/img/universe-bg.png") + ")",
//             }}
//           ></div>
//           <div className="content">
//             <Container>
//               <Row>
//                 <Col className="ml-auto mr-auto" md="6" lg="4">
//                   <div className="info info-horizontal">
//                     <div className="icon icon-info">
//                       <i className="now-ui-icons media-2_sound-wave"></i>
//                     </div>
//                     <div className="description">
//                       <h5 className="info-title">StoryMe</h5>
//                       <p className="description">
//                         Here is where your stories become alive
//                     </p>
//                     </div>
//                   </div>
//                   <div className="info info-horizontal">
//                     <div className="icon icon-info">
//                       <i className="now-ui-icons media-1_button-pause"></i>
//                     </div>
//                     <div className="description">
//                       <h5 className="info-title">Easy and Fast</h5>
//                       <p className="description">
//                         It only takes a 2 clicks and a few seconds to share
//                         your creations with the rest of the world
//                     </p>
//                     </div>
//                   </div>
//                   <div className="info info-horizontal">
//                     <div className="icon icon-info">
//                       <i className="now-ui-icons users_single-02"></i>
//                     </div>
//                     <div className="description">
//                       <h5 className="info-title">Built Audience</h5>
//                       <p className="description">
//                         Reach thousands of readers around the world by simply
//                         publishing your beloved writings
//                     </p>
//                     </div>
//                   </div>
//                 </Col>
//                 <Col className="mr-auto" md="6" lg="4">
//                   <Card className="card-signup" >
//                     <CardBody>
//                       <CardTitle className="text-center" tag="h4">
//                         Register
//                     </CardTitle>
//                       <div className="social text-center">
//                         <Button
//                           className="btn-icon btn-round mr-2"
//                           color="twitter"
//                         >
//                           <i className="fab fa-twitter"></i>
//                         </Button>
//                         <Button
//                           className="btn-icon btn-round mr-2"
//                           color="instagram"
//                         >
//                           <i className="fab fa-instagram"></i>
//                         </Button>
//                         <Button className="btn-icon btn-round"
//                           color="facebook">
//                           <i className="fab fa-facebook"></i>
//                         </Button>
//                         <h5 className="card-description">or go old school</h5>
//                       </div>
//                       <Form action="" className="form" method="">
//                         <InputGroup
//                           className={firstFocus ? "input-group-focus" : ""}
//                         >
//                           <InputGroupAddon addonType="prepend">
//                             <InputGroupText>
//                               <i className="now-ui-icons users_circle-08"></i>
//                             </InputGroupText>
//                           </InputGroupAddon>
//                           <Input
//                             autoComplete="fullname"
//                             placeholder="First Name..."
//                             type="text"
//                             onFocus={() => setFirstFocus(true)}
//                             onBlur={() => setFirstFocus(false)}
//                           ></Input>
//                         </InputGroup>
//                         <InputGroup
//                           className={lastFocus ? "input-group-focus" : ""}
//                         >
//                           <InputGroupAddon addonType="prepend">
//                             <InputGroupText>
//                               <i className="now-ui-icons text_caps-small"></i>
//                             </InputGroupText>
//                           </InputGroupAddon>
//                           <Input
//                             autoComplete="name"
//                             placeholder="Last Name..."
//                             type="text"
//                             onFocus={() => setLastFocus(true)}
//                             onBlur={() => setLastFocus(false)}
//                           ></Input>
//                         </InputGroup>
//                         <InputGroup
//                           className={emailFocus ? "input-group-focus" : ""}
//                         >
//                           <InputGroupAddon addonType="prepend">
//                             <InputGroupText>
//                               <i className="now-ui-icons ui-1_email-85"></i>
//                             </InputGroupText>
//                           </InputGroupAddon>
//                           <Input
//                             autoComplete="email"
//                             placeholder="Your Email..."
//                             type="text"
//                             onFocus={() => setEmailFocus(true)}
//                             onBlur={() => setEmailFocus(false)}
//                           ></Input>
//                         </InputGroup>
//                         <FormGroup check>
//                           <Label check>
//                             <Input type="checkbox"></Input>
//                             <span className="form-check-sign"></span>I agree to
//                           the terms and{" "}
//                             <a href="#pablo" onClick={(e) => e.preventDefault()}>
//                               conditions
//                           </a>
//                           .
//                         </Label>
//                         </FormGroup>
//                         <CardFooter className="text-center">
//                           <Button
//                             className="btn-round"
//                             color="info"
//                             href="#pablo"
//                             onClick={(e) => e.preventDefault()}
//                             size="lg"
//                           >
//                             Get Started
//                         </Button>
//                         </CardFooter>
//                       </Form>
//                     </CardBody>
//                   </Card>
//                 </Col>
//               </Row>
//             </Container>
//           </div>
//           <Footer />
//         </div>
//       </>
//     )
//   }
// }

// export default SignupPage


function SignupPage(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  // const [firstFocus, setFirstFocus] = React.useState(false);
  const [passwordFocus, setPasswordFocus] = React.useState(false);
  const [emailFocus, setEmailFocus] = React.useState(false);
  React.useEffect(() => {
    document.body.classList.add("signup-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("signup-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, []);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // setUser({ email, password })
    // console.log("outPut: handleFormSubmit -> setUser", setUser)

    axios.post("/api/signup", { email, password })
      .then((resp) => {
        console.log("outPut: handleFormSubmit -> resp", resp)
        props.updateUser(resp.data)
        setEmail("")
        setPassword("")
      })
  }
  return (
    <>
      <FixedTransparentNavbar />
      <div className="page-header header-filter" filter-color="black">
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + require("assets/img/universe-bg.png") + ")",
          }}
        ></div>
        <div className="content">
          <Container>
            <Row>
              <Col className="ml-auto mr-auto" md="6" lg="4">
                <div className="info info-horizontal">
                  <div className="icon icon-info">
                    <i className="now-ui-icons media-2_sound-wave"></i>
                  </div>
                  <div className="description">
                    <h5 className="info-title">StoryMe</h5>
                    <p className="description">
                      Here is where your stories become alive
                    </p>
                  </div>
                </div>
                <div className="info info-horizontal">
                  <div className="icon icon-info">
                    <i className="now-ui-icons media-1_button-pause"></i>
                  </div>
                  <div className="description">
                    <h5 className="info-title">Easy and Fast</h5>
                    <p className="description">
                      It only takes a 2 clicks and a few seconds to share
                      your creations with the rest of the world
                    </p>
                  </div>
                </div>
                <div className="info info-horizontal">
                  <div className="icon icon-info">
                    <i className="now-ui-icons users_single-02"></i>
                  </div>
                  <div className="description">
                    <h5 className="info-title">Built Audience</h5>
                    <p className="description">
                      Reach thousands of readers around the world by simply
                      publishing your beloved writings
                    </p>
                  </div>
                </div>
              </Col>
              <Col className="mr-auto" md="6" lg="4">
                <Card className="card-signup" >
                  <CardBody>
                    <CardTitle className="text-center" tag="h4">
                      Register
                    </CardTitle>
                    <div className="social text-center">
                      <Button
                        className="btn-icon btn-round mr-2"
                        color="twitter"
                      >
                        <i className="fab fa-twitter"></i>
                      </Button>
                      <Button
                        className="btn-icon btn-round mr-2"
                        color="instagram"
                      >
                        <i className="fab fa-instagram"></i>
                      </Button>
                      <Button className="btn-icon btn-round"
                        color="facebook">
                        <i className="fab fa-facebook"></i>
                      </Button>
                      <h5 className="card-description">or go old school</h5>
                    </div>
                    <Form className="form" onSubmit={handleFormSubmit}>
                      {/* <InputGroup
                        className={firstFocus ? "input-group-focus" : ""}
                      >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="now-ui-icons users_circle-08"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          autoComplete="fullname"
                          placeholder="First Name..."
                          type="text"
                          onFocus={() => setFirstFocus(true)}
                          onBlur={() => setFirstFocus(false)}

                        ></Input>
                      </InputGroup> */}
                      <InputGroup
                        className={emailFocus ? "input-group-focus" : ""}
                      >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="now-ui-icons ui-1_email-85"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          autoComplete="email"
                          placeholder="Your Email..."
                          type="text"
                          onFocus={() => setEmailFocus(true)}
                          onBlur={() => setEmailFocus(false)}
                          name="email"
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                        ></Input>
                      </InputGroup>
                      <InputGroup
                        className={passwordFocus ? "input-group-focus" : ""}
                      >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="now-ui-icons ui-1_lock-circle-open"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          autoComplete="password"
                          placeholder="Password..."
                          type="text"
                          onFocus={() => setPasswordFocus(true)}
                          onBlur={() => setPasswordFocus(false)}
                          name="password"
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                        ></Input>
                      </InputGroup>
                      <FormGroup check>
                        <Label check>
                          <Input type="checkbox"></Input>
                          <span className="form-check-sign"></span>I agree to
                          the terms and{" "}
                          {/* <a onClick={(e) => e.preventDefault()}>
                            conditions
                          </a> */}
                          .
                        </Label>
                      </FormGroup>
                      <CardFooter className="text-center">
                        <Button
                          className="btn-round"
                          color="info"
                          type="submit"
                          size="lg"
                        >
                          Get Started
                        </Button>
                      </CardFooter>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default SignupPage;
