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
  CardBody,
  Container,
  Row,
  Col,
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
    email: '',
    password: '',
    errorMessages: []
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

    axios.post("/api/login", { email, password })
      .then((resp) => {
        this.props.updateUser(resp.data)
        console.log('USER DATA UPDATED', this.props.currentUser);
        this.setState({ email: "", password: "" });
      }).then(() => {
        this.props.history.push("/")
      }).catch((error) => {
        console.log("Error!!",error);
        this.setState({
          errorMessages: error.response.data.errors
        })
      })
  }

  render() {
    return (
      <div className="section section-javascript" id="javascriptComponents">
        <Container>
          <Row id="modals">
            <Col md="6">
              {/* <Button color="info" className="nav-link btn-success" onClick={() => this.setModalLogin(true)}>
                <i className="now-ui-icons users_single-02"></i> Login Modal
              </Button> */}
              <Modal
                className="modal-login"
                modalClassName="modal-info"
                isOpen={this.props.modalLogin}
                toggle={() => this.props.setModalLogin(false)}
              >
                <Card
                  className="card-login card-plain"
                  data-background-color=""
                >
                  <div className="modal-header justify-content-center">
                    <button
                      aria-hidden={true}
                      className="close"
                      onClick={() => this.props.setModalLogin(false)}
                      type="button"
                    >
                      <i className="now-ui-icons ui-1_simple-remove"></i>
                    </button>
                    <div className="header header-info text-center">
                      <div className="logo-container">

                      </div>
                    </div>
                  </div>
                  <div className="modal-body">
                    {this.state.errorMessages.map((m) =>
                      <p key={m} style={{ textAlign: 'center', color: "red" }}>{m}</p>
                    )}
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
                              <i className="now-ui-icons ui-1_email-85"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Email..."
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
                          onClick={() => this.props.setModalLogin(false)}
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