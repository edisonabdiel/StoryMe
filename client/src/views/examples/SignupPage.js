import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BodyClassName from 'react-body-classname';
import defaultAvatar from "assets/img/placeholder.jpg";
import FacebookLogin from 'react-facebook-login';
import defaultAvatarBg from "assets/img/dense-spider-web.jpg";

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
import ScrollTransparentNavbar from "components/Navbars/ScrollTransparentNavbar.js";
import FooterBlack from "components/Footers/FooterBlack";

class SignupPage extends React.Component {
  state = {
    email: '',
    checked: false,
    errorMessages: [],
    password: '',
    userName: '',
    passwordFocus: false,
    emailFocus: false,
    userNameFocus: false

  }
  setChecked = (bool) => {
    this.setState({
      checked: bool
    })
  }
  setPasswordFocus = (bool) => {
    this.setState({
      passwordFocus: bool
    })
  }
  setEmailFocus = (bool) => {
    this.setState({
      emailFocus: bool
    })
  }
  setUserNameFocus = (bool) => {
    this.setState({
      emailFocus: bool
    })
  }
  handleChange = (event) => {
    const { name, value } = event.target;
    const checked = event.target.checked
    this.setState({
      [name]: value,
      checked: checked
    });
  }

  responseFacebook = (response) => {
    console.log("outPut: SignupPage -> responseFacebook -> resp", response)
    const email = response.email
    axios.get("/api/auth/facebook", { email })
      .then((res) => {
        console.log("outPut: SignupPage -> responseFacebook -> res", res)
        // console.log("outPut: SignupPage -> responseFacebook -> res", res)
        //   this.props.updateUser(res.data)
        //   console.log("outPut: SignupPage -> user", this.props.currentUser)
        // }).then(() => {
        //   this.props.history.push(`/email-sent`)
      }).catch((error) => {
        console.log("outPut: facebook -> handleFormSubmit -> error", error)
        // this.setState({
        //   errorMessages: error.response.data.errors,
        // })
      })
  }

  componentClicked = () => {
    console.log('is clicked facebook')
  }

  handleFormSubmit = (event) => {
    event.preventDefault()
    const email = this.state.email
    const password = this.state.password
    const checked = this.state.checked
    const image = defaultAvatar
    const bgImage = defaultAvatarBg
    const userName = this.state.userName
    axios.post("/api/signup", { email, password, checked, image, bgImage, userName })
      .then((res) => {
        this.props.updateUser(res.data)

        this.setState({
          checked: false,
          email: "",
          password: "",
          errorMessages: []
        })
      }).then(() => {
        this.props.history.push(`/email-sent`)
      }).catch((error) => {
        this.setState({
          errorMessages: error.response.data.errors,
        })
      })
  }

  render() {
    return (
      <BodyClassName className="signup-page sidebar-collapse">
        <div>
          <ScrollTransparentNavbar updateUser={this.props.updateUser} />
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
                        <img
                          style={{ height: "40px", width: '40px' }}
                          alt="..."
                          src={require("assets/img/logo.png")}
                        ></img>
                        <CardTitle className="text-center" tag="h4">
                          Register
                    </CardTitle>
                        <div className="social text-center">
                          <FacebookLogin
                            appId="591193318424358"
                            autoLoad={true}
                            fields="name,email,picture"
                            callback={this.responseFacebook}
                            cssClass="my-facebook-button-class"
                            icon="fa-facebook"
                            onClick={this.componentClicked}
                          />
                          {/* <Button className="btn-icon btn-round"
                            color="facebook">
                            <i className="fab fa-facebook"></i>
                          </Button> */}
                          <h5 className="card-description">or go old school</h5>
                        </div>
                        <Form className="form" onSubmit={this.handleFormSubmit}>
                          {this.state.errorMessages && this.state.errorMessages.map((m) =>
                            <h6 key={m} style={{ color: "red", margin: '0px' }}>{m}</h6>
                          )}
                          <h6 style={{ color: "red", margin: '0px' }}>{this.state.logInError}</h6>
                          <InputGroup
                            className={this.emailFocus ? "input-group-focus" : ""}
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
                              onFocus={() => this.setEmailFocus(true)}
                              onBlur={() => this.setEmailFocus(false)}
                              name="email"
                              value={this.state.email}
                              onChange={this.handleChange}
                            ></Input>
                          </InputGroup>
                          <InputGroup
                            className={this.passwordFocus ? "input-group-focus" : ""}
                          >
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="now-ui-icons ui-1_lock-circle-open"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              autoComplete="password"
                              placeholder="Password..."
                              type="password"
                              onFocus={() => this.setPasswordFocus(true)}
                              onBlur={() => this.setPasswordFocus(false)}
                              name="password"
                              value={this.state.password}
                              onChange={this.handleChange}
                            ></Input>
                          </InputGroup>
                          <InputGroup
                            className={this.userNameFocus ? "input-group-focus" : ""}
                          >
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="now-ui-icons users_single-02"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              autoComplete="userName"
                              placeholder="Your user name..."
                              type="text"
                              onFocus={() => this.setUserNameFocus(true)}
                              onBlur={() => this.setUserNameFocus(false)}
                              name="userName"
                              value={this.state.userName}
                              onChange={this.handleChange}
                            ></Input>
                          </InputGroup>
                          <FormGroup check>
                            <Label check>
                              <Input type="checkbox" onChange={this.handleChange}></Input>
                              <span className="form-check-sign"></span>
                              <Link to='/terms-and-conditions'>
                                I agree to
                                the terms and conditions.
                          </Link>
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
            <FooterBlack />
          </div>

        </div>
      </BodyClassName>
    )
  }
}

export default SignupPage;