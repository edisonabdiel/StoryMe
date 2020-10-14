// core components
import React, { Component } from 'react'
import Footer from "components/Footers/Footer.js";
import ScrollTransparentNavbar from "components/Navbars/ScrollTransparentNavbar";
import BodyClassName from "react-body-classname";
import { Link } from 'react-router-dom'
import axios from 'axios'
import FacebookLogin from 'react-facebook-login';
import { IoLogoFacebook } from "react-icons/io";
import { IconContext } from "react-icons";




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
    email: '',
    password: '',
    errorMessage: []
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
        this.props.updateUser(resp.data)
        this.setState({ email: "", password: "" });
      }).then(() => {
        this.props.history.push(`/profile-page/${this.props.currentUser._id}`)
      }).catch((error) => {
        this.setState({
          errorMessage: error.response.data.errors
        })
      })

  }

  responseFacebook = (response) => {
    axios.post("/api/facebook", { response })
      .then((res) => {
        this.props.updateUser(res.data)
      }).then(() => {
        this.props.history.push(`/profile-page/${this.props.currentUser._id}`)
      }).catch((error) => {

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

                      <Form onSubmit={this.handleFormSubmit}>
                        <CardHeader className="text-center">
                          <div className="logo-container">
                            <img
                              alt="..."
                              src={require("assets/img/logo.png")}
                            ></img>
                          </div>
                          {/* <FacebookLogin
                            appId="565328274160052"
                            // autoLoad={true}
                            fields="name,email,picture"
                            callback={this.responseFacebook}
                            icon={<IconContext.Provider value={{ size: "2em" }}><IoLogoFacebook /></IconContext.Provider>}
                            onClick={this.componentClicked}
                            textButton=' '
                          /> */}
                        </CardHeader>
                        {this.state.errorMessage && this.state.errorMessage.map((m) =>
                          <p key={m} style={{ textAlign: 'center', color: "red" }}>{m}</p>
                        )}
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

