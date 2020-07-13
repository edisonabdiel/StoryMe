// core components
import React, { Component } from 'react'
import Footer from "components/Footers/Footer.js";
import ScrollTransparentNavbar from "components/Navbars/ScrollTransparentNavbar";
import BodyClassName from "react-body-classname";
import { Link } from 'react-router-dom'
import axios from 'axios'

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col,
  Row,
} from "reactstrap";



export class LoginPage extends Component {
  state = {
    nameFocus: false,
    passwordFocus: false,
    modalLogin: false,
    email: '',
    password: '',
    errorMessage: ''
  }
  setNameFocus = (bool) => {
    this.setState({
      nameFocus: bool
    })
  }
  setPasswordFocus = (bool) => {
    this.setState({
      passwordFocus: bool
    })
  }
  setModalLogin = (bool) => {
    this.setState({
      modalLogin: bool
    })
  }
  loginHandler = (e) => {
    e.preventDefault();
    console.log("Im a modal, and i work")
  }
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }
  handleFormSubmit = (event) => {
    event.preventDefault()
    const email = this.state.email
    const password = this.state.password

    // {!this.props.currentUser

    axios.post("/api/login", { email, password })
      .then((resp) => {
        console.log("outPut: LoginPage -> handleFormSubmit -> resp", resp)
        this.props.updateUser(resp.data)
        console.log('USER DATA UPDATED', this.props.currentUser);
        this.setState({ email: "", password: "" });
      }).then(() => {
        this.props.history.push('/profile-page')
      }).catch((error) => {
        console.log("Error!!");
        console.log(error.response);
        this.setState({
          errorMessage: error.response.data.message
        })
      })

  }

  render() {
    return (
      <BodyClassName className="login-page ">
        <div>

          <ScrollTransparentNavbar updateUser={this.props.updateUser} />
          <div className="page-header header-filter" filter-color="blue">
            <div
              className="page-header-image"
              style={{
                backgroundImage: "url(" + require("assets/img/green-universe.jpg") + ")",
              }}
            ></div>
            <div className="content">
              <Container>
                <Row>
                  <Col className="ml-auto mr-auto" md="5">
                    <Card className="card-login card-plain">
                      {this.state.errorMessage ? <p style={{ textAlign: 'center', color: "red" }}>{this.state.errorMessage}</p> : null}
                      <Form onSubmit={this.handleFormSubmit}>
                        <CardHeader className="text-center">
                          <div className="logo-container">
                          </div>
                        </CardHeader>
                        <CardBody>
                          <InputGroup
                            className={
                              "no-border input-lg" +
                              (this.state.nameFocus ? " input-group-focus" : "")
                            }
                          >
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="now-ui-icons ui-1_email-85"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Email...."
                              name="email"
                              value={this.state.email}
                              type="text"
                              onFocus={() => this.setNameFocus(true)}
                              onBlur={() => this.setNameFocus(false)}
                              onChange={this.handleChange}
                            ></Input>
                          </InputGroup>
                          <InputGroup
                            className={
                              "no-border input-lg" +
                              (this.state.passwordFocus ? " input-group-focus" : "")
                            }
                          >
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="now-ui-icons ui-1_lock-circle-open"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Password..."
                              name="password"
                              value={this.state.password}
                              type="password"
                              onFocus={() => this.setPasswordFocus(true)}
                              onBlur={() => this.setPasswordFocus(false)}
                              onChange={this.handleChange}
                            ></Input>
                          </InputGroup>
                        </CardBody>
                        <CardFooter className="text-center">
                          <Button
                            block
                            className="btn-round"
                            color="info"
                            size="lg"
                          >
                            Get Started
                        </Button>
                        </CardFooter>
                        <div className="pull-left">

                          <Link
                            className="link footer-link"
                            to={'/sign-up'}
                          >
                            <h6> Create Account</h6>
                          </Link>
                        </div>
                      </Form>
                    </Card>
                  </Col>
                </Row>
              </Container>
            </div>
            <Footer />
          </div>
        </div>
      </BodyClassName>

    );
  }
}

export default LoginPage

// old code
// const LoginPage = () => {
//   const [firstFocus, setFirstFocus] = React.useState(false);
//   const [lastFocus, setLastFocus] = React.useState(false);
//   React.useEffect(() => {
//     document.body.classList.add("login-page");
//     document.body.classList.add("sidebar-collapse");
//     document.documentElement.classList.remove("nav-open");
//     window.scrollTo(0, 0);
//     document.body.scrollTop = 0;
//     return function cleanup() {
//       document.body.classList.remove("login-page");
//       document.body.classList.remove("sidebar-collapse");
//     };
//   }, []);
//   return (
//     <BodyClassName className="login-page sidebar-collapse">

//       <ScrollTransparentNavbar />
//       <div className="page-header header-filter" filter-color="blue">
//         <div
//           className="page-header-image"
//           style={{
//             backgroundImage: "url(" + require("assets/img/green-universe.jpg") + ")",
//           }}
//         ></div>
//         <div className="content">
//           <Container>
//             <Row>
//               <Col className="ml-auto mr-auto" md="5">
//                 <Card className="card-login card-plain">
//                   <Form action="" className="form" method="">
//                     <CardHeader className="text-center">
//                       <div className="logo-container">
//                         <img
//                           alt="..."
//                           src={require("assets/img/now-logo.png")}
//                         ></img>
//                       </div>
//                     </CardHeader>
//                     <CardBody>
//                       <InputGroup
//                         className={
//                           "no-border input-lg" +
//                           (firstFocus ? " input-group-focus" : "")
//                         }
//                       >
//                         <InputGroupAddon addonType="prepend">
//                           <InputGroupText>
//                             <i className="now-ui-icons users_circle-08"></i>
//                           </InputGroupText>
//                         </InputGroupAddon>
//                         <Input
//                           placeholder="First Name..."
//                           type="text"
//                           onFocus={() => setFirstFocus(true)}
//                           onBlur={() => setFirstFocus(false)}
//                         ></Input>
//                       </InputGroup>
//                       <InputGroup
//                         className={
//                           "no-border input-lg" +
//                           (lastFocus ? " input-group-focus" : "")
//                         }
//                       >
//                         <InputGroupAddon addonType="prepend">
//                           <InputGroupText>
//                             <i className="now-ui-icons text_caps-small"></i>
//                           </InputGroupText>
//                         </InputGroupAddon>
//                         <Input
//                           placeholder="Last Name..."
//                           type="text"
//                           onFocus={() => setLastFocus(true)}
//                           onBlur={() => setLastFocus(false)}
//                         ></Input>
//                       </InputGroup>
//                     </CardBody>
//                     <CardFooter className="text-center">
//                       <Button
//                         block
//                         className="btn-round"
//                         color="info"
//                         href="#pablo"
//                         onClick={(e) => e.preventDefault()}
//                         size="lg"
//                       >
//                         Get Started
//                       </Button>
//                     </CardFooter>
//                     <div className="pull-left">
//                       <h6>
//                         <a
//                           className="link footer-link"
//                           href="#pablo"
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           Create Account
//                         </a>
//                       </h6>
//                     </div>
//                     <div className="pull-right">
//                       <h6>
//                         <a
//                           className="link footer-link"
//                           href="#pablo"
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           Need Help?
//                         </a>
//                       </h6>
//                     </div>
//                   </Form>
//                 </Card>
//               </Col>
//             </Row>
//           </Container>
//         </div>
//         <Footer />
//       </div>
//     </BodyClassName>

//   );
// }

// export default LoginPage;
