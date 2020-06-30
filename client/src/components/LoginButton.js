/*eslint-disable*/
import React from "react";
// react plugin used to create datetimepicker
import ReactDatetime from "react-datetime";
import axios from 'axios'
import { Link } from 'react-router-dom'

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Collapse,
  FormGroup,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
  PopoverBody,
  PopoverHeader,
  UncontrolledPopover,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Modal,
  ModalFooter,
} from "reactstrap";

class LoginButton extends React.Component {
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
  handleChange = () => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }
  handleFormSubmit = (event) => {
    event.preventDefault()

    const email = this.state.email
    const password = this.state.password

    axios.post("/api/login", { email, password })
      .then((resp) => {
        // this.props.getData();

        console.log('User Data', resp.data);
        this.props.updateUser(resp.data)
        this.setState({ email: "", password: "" });
      }).catch((error) => {
        console.log("Error!!");
        console.log(error.response);
        this.setState({
          errorMessage: error.response.data.message
        })
      }).then(() => {
        if (this.props.currentUser) {
          this.props.history.push('/profile-page')
        }
      })
  }

  render() {
    return (
      <div className="section section-javascript" id="javascriptComponents">
        <Container>
          <Row id="modals">
            <Col md="6">
              <Button color="info" onClick={() => this.setModalLogin(true)}>
                <i className="now-ui-icons users_single-02"></i> Login Modal
              </Button>
              <Modal
                className="modal-login"
                modalClassName="modal-info"
                isOpen={this.state.modalLogin}
                toggle={() => this.setModalLogin(false)}
              >
                <Card
                  className="card-login card-plain"
                  data-background-color=""
                >
                  <div className="modal-header justify-content-center">
                    <button
                      aria-hidden={true}
                      className="close"
                      onClick={() => this.setModalLogin(false)}
                      type="button"
                    >
                      <i className="now-ui-icons ui-1_simple-remove"></i>
                    </button>
                    <div className="header header-info text-center">
                      <div className="logo-container">
                        <img
                          alt="..."
                          src={require("assets/img/now-logo.png")}
                        ></img>
                      </div>
                    </div>
                  </div>
                  <div className="modal-body">
                    {this.state.errorMessage ? <p style={{ textAlign: 'center' }}>{this.state.errorMessage}</p> : null}
                    <Form action="" className="form" method="" onSubmit={this.handleFormSubmit}>
                      <CardBody>
                        <InputGroup
                          className={
                            this.state.nameFocus
                              ? "no-border input-lg input-group-focus"
                              : "no-border input-lg"
                          }
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="now-ui-icons users_circle-08"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="First Name..."
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
                            this.state.passwordFocus
                              ? "no-border input-lg input-group-focus"
                              : "no-border input-lg"
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
                      <ModalFooter className="text-center">
                        <Button

                          block
                          className="btn-neutral btn-round"
                          color="info"
                          // href=""
                          type="submit"
                          size="lg"
                        >
                          Get Started
                        </Button>
                      </ModalFooter>
                    </Form>
                    <p>Do not have Account?
                         <Link to={"/sign-up"} style={{ fontWeight: 'bold' }}> Sign up</Link>
                    </p>

                  </div>

                </Card>

              </Modal>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }

}

export default LoginButton;