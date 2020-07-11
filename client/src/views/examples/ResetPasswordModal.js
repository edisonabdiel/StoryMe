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

class PasswordReset extends React.Component {
    state = {
        oldPasswordFocus: false,
        newPasswordFocus: false,
        modalLogin: false,
        oldPassword: '',
        newPassword: '',
        errorMessage: ''
    }
    setOldPasswordFocus = (bool) => {
        this.setState({
            nameFocus: bool
        })
    }
    setNewPasswordFocus = (bool) => {
        this.setState({
            passwordFocus: bool
        })
    }
    setModalLogin = (bool) => {
        this.setState({
            modalLogin: bool
        })
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }
    handleFormSubmit = (event) => {
        event.preventDefault()

        const oldPassword = this.state.email
        const newPassword = this.state.password

        axios.put(`/api/password/${this.props.currentUser._id}`, { oldPassword, newPassword })
            .then((resp) => {
                console.log(resp);
                //     this.props.updateUser(resp.data)
                //     console.log('USER DATA UPDATED', this.props.currentUser);

                //     this.setState({ email: "", password: "" });
                // }).catch((error) => {
                //     console.log("Error!!");
                //     console.log(error.response);
                //     this.setState({
                //         errorMessage: error.response.data.message
                //     })
                // }).then(() => {
                //     if (this.props.currentUser) {
                //         this.props.history.push('/profile-page')
                //     }
            })
    }

    render() {
        return (
            <div className="section section-javascript" id="javascriptComponents">
                <Container>
                    <Row id="modals">
                        <Col md="6">
                            <h3 color="info" className="nav-link " onClick={() => this.setModalLogin(true)}>
                                <i className="now-ui-icons ui-1_lock-circle-open"></i> Rest Password </h3>
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
                                                            <i className="now-ui-icons ui-1_lock-circle-open"></i>
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input
                                                        placeholder="Old Password"
                                                        name="oldPassword"
                                                        value={this.state.oldPassword}
                                                        type="password"
                                                        onFocus={() => this.setOldPasswordFocus(true)}
                                                        onBlur={() => this.setOldPasswordFocus(false)}
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
                                                        placeholder="New Password"
                                                        name="NewPassword"
                                                        value={this.state.newPassword}
                                                        type="password"
                                                        onFocus={() => this.setNewPasswordFocus(true)}
                                                        onBlur={() => this.setNewPasswordFocus(false)}
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
                                                    submit
                        </Button>
                                            </ModalFooter>
                                        </Form>
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

export default PasswordReset;