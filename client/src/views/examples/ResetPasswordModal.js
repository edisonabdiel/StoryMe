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

    handlePasswordFormSubmit = (event) => {
        event.preventDefault()

        const oldPassword = this.state.oldPassword
        const newPassword = this.state.newPassword

        axios.put(`/api/password/${this.props.currentUser._id}`, { oldPassword, newPassword })
            .then((resp) => {
                // this.setModalLogin(false)
                console.log(resp.data);
                // this.props.updateUser(resp.data)
                this.setState({ newPassword: "", oldPassword: "" });
            }).catch((err) => {
                console.log('error', err);
            })
    }

    render() {
        return (
            <div className="" id="javascriptComponents">
                <Container>
                    <Row id="modals">
                        <Col md="6">
                            <h6 color="info" onClick={() => this.setModalLogin(true)} style={{ cursor: "pointer" }}>
                                <i className="now-ui-icons ui-1_lock-circle-open"></i> Rest Password </h6>
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
                                        <Form action="" className="form" method="" onSubmit={this.handlePasswordFormSubmit}>
                                            <CardBody>
                                                <InputGroup
                                                    className={
                                                        this.state.oldPasswordFocus
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
                                                        this.state.newPasswordFocus
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
                                                        name="newPassword"
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