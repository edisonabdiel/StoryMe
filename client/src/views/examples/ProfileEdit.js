import React, { Component } from 'react';
import axios from 'axios';
import defaultAvatar from "assets/img/placeholder.jpg";
import ImageUpload from "components/CustomUpload/ImageUpload.js";
import AlertMessage from "views/examples/Alert";


// reactstrap components
import {
    Button,
    CardBody,
    Container,
    Row,
    Col,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    ModalFooter,
} from "reactstrap";

import EditFixedNavbar from 'components/Navbars/EditFixedNavbar';
import FooterBlack from 'components/Footers/FooterBlack';




class ProfileEdit extends Component {
    state = {
        email: this.props.currentUser.email,
        imageUrl: this.props.currentUser.image,
        uploadedImageName: '',
        about: this.props.currentUser.about,
        userName: this.props.currentUser.userName,
        errorMessage: "",
        successMessage: '',
        nameFocus: false,
        userNameFocus: false,
        oldPasswordFocus: false,
        newPasswordFocus: false,
        modalLogin: false,
        oldPassword: '',
        newPassword: '',
        aboutFocus: false,
        alertBool: true,
        bgImageUrl: this.props.currentUser.bgImage,
        uploadedBgImageName: ''

    }

    setNameFocus = (bool) => {
        this.setState({
            nameFocus: bool
        })
    }

    setUserNameFocus = (bool) => {
        this.setState({
            durationFocus: bool
        })
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
    setAboutFocus = (bool) => {
        this.setState({
            aboutFocus: bool
        })
    }

    setAlertBool = () => {
        this.setState({
            alertBool: false
        })
    }

    // }
    // upload-delete image handlers 

    handleImageChange = (e) => {
        let formData = new FormData()
        formData.append("imageUrl", e.target.files[0])
        axios.post("/api/upload-img", formData).then((res) => {
            this.setState({
                imageUrl: res.data.secure_url,
                uploadedImageName: res.data.imageName
            })
        })
    }

    handleImageRemove = () => {
        const name = (this.props.currentUser.imageName)
        axios.post(`/api/delete-upload-img/${name}`).then((res) => {
            this.setState({
                imageUrl: defaultAvatar,
                uploadedImageName: ''
            })
        })
    };

    // bg images handler
    handleBgImageChange = (e) => {
        let formData = new FormData()
        formData.append("imageUrl", e.target.files[0])
        axios.post("/api/upload-img", formData).then((res) => {
            this.setState({
                bgImageUrl: res.data.secure_url,
                uploadedBgImageName: res.data.imageName
            })
        })
    }

    handleBgImageRemove = () => {
        const name = (this.props.currentUser.bgImageName)
        axios.post(`/api/delete-upload-img/${name}`).then((res) => {
            this.setState({
                bgImageUrl: defaultAvatar,
                uploadedBgImageName: ''
            })
        })
    };
    // update state of story elements 
    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value })
    }

    // data coming from the editor
    updateContent = (newContent) => {
        this.setState({
            about: newContent
        })
    }

    handlePasswordFormSubmit = (event) => {
        event.preventDefault()
        const oldPassword = this.state.oldPassword
        const newPassword = this.state.newPassword
        axios.put(`/api/password/${this.props.currentUser._id}`, { oldPassword, newPassword })
            .then((resp) => {
                // this.props.updateUser(resp.data)
                this.setState({
                    newPassword: "",
                    oldPassword: "",
                    successMessage: resp.data.message,
                    alertBool: true,
                    errorMessage: resp.data.error
                });
            })
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        const email = this.state.email;
        const password = this.state.password;
        const about = this.state.about;
        const imageUrl = this.state.imageUrl
        const imageName = this.state.uploadedImageName
        const bgImageUrl = this.state.bgImageUrl
        const bgImageName = this.state.uploadedBgImageName
        const userName = this.state.userName;
        const newPassword = this.state.newPassword
        axios.put(`/api/user/${this.props.currentUser._id}`, { email, password, about, imageUrl, imageName, userName, newPassword, bgImageUrl, bgImageName })
            .then((resp) => {
                this.props.updateUser(resp.data)
                this.setState({
                    email: "",
                    password: "",
                    about: "",
                    imageUrl: "",
                    uploadedImageName: "",
                    newPassword: '',
                    userName: ""
                })
            }).then(() => {
                this.props.history.push(`/profile-page/${this.props.currentUser._id}`)
            })
    }


    render() {
        return (
            <div data-background-color="black">
                <EditFixedNavbar currentUser={this.props.currentUser} updateUser={this.props.updateUser} />
                <div style={{ height: '100px' }}></div> {/* offsets height of navbar */}
                <div className="text-center">
                    <Container fluid>
                        {/* {this.state.successMessage
                            ? <AlertMessage color="success" message={this.state.successMessage} setAlertBool={this.setAlertBool} alertBool={this.state.alertBool} />
                            : ''}
                        {this.state.errorMessage
                            ? <AlertMessage color="danger" message={this.state.errorMessage} setAlertBool={this.setAlertBool} alertBool={this.state.alertBool} />
                            : ''} */}
                        <Row>
                            <Col md="3"></Col>
                            <Col className="px-0 my-auto" md="6">
                                <h2><b>EDIT PROFILE</b></h2>
                                <Form action="" className="form" method="" onSubmit={this.handleFormSubmit}>
                                    <CardBody>
                                        {/* image */}
                                        <ImageUpload avatar imageUrl={this.state.imageUrl} handleImageChange={this.handleImageChange} handleImageRemove={this.handleImageRemove} />
                                        <ImageUpload imageUrl={this.state.bgImageUrl} handleImageChange={this.handleBgImageChange} handleImageRemove={this.handleBgImageRemove} />
                                        {/* email */}
                                        {this.state.successMessage
                                            ? <AlertMessage color="success" message={this.state.successMessage} setAlertBool={this.setAlertBool} alertBool={this.state.alertBool} />
                                            : ''}
                                        {this.state.errorMessage
                                            ? <AlertMessage color="danger" message={this.state.errorMessage} setAlertBool={this.setAlertBool} alertBool={this.state.alertBool} />
                                            : ''}
                                        <InputGroup
                                            className={
                                                this.state.nameFocus
                                                    ? "no-border input-lg input-group-focus"
                                                    : "no-border input-lg"
                                            }
                                        >
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="fas fa-envelope-open-text"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                placeholder="email"
                                                name="email"
                                                value={this.state.email}
                                                type="text"
                                                onFocus={() => this.setNameFocus(true)}
                                                onBlur={() => this.setNameFocus(false)}
                                                onChange={this.handleChange}
                                            ></Input>
                                        </InputGroup>
                                        {/* userName */}
                                        <InputGroup
                                            className={
                                                this.state.userNameFocus
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
                                                placeholder="@userName"
                                                name="userName"
                                                value={this.state.userName}
                                                type="text"
                                                onFocus={() => this.setUserNameFocus(true)}
                                                onBlur={() => this.setUserNameFocus(false)}
                                                onChange={this.handleChange}
                                            ></Input>
                                        </InputGroup>
                                        {/* password */}
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
                                                placeholder="Old Password"
                                                name="oldPassword"
                                                value={this.state.oldPassword}
                                                type="password"
                                                onFocus={() => this.setOldPasswordFocus(true)}
                                                onBlur={() => this.setOldPasswordFocus(false)}
                                                onChange={this.handleChange}
                                            ></Input>
                                            <Input
                                                placeholder="New Password"
                                                name="newPassword"
                                                value={this.state.newPassword}
                                                type="password"
                                                onFocus={() => this.setNewPasswordFocus(true)}
                                                onBlur={() => this.setNewPasswordFocus(false)}
                                                onChange={this.handleChange}
                                            ></Input>
                                            <Button className=" btn-morphing btn-info" onClick={this.handlePasswordFormSubmit}> Reset</Button>
                                        </InputGroup>
                                        {/* about */}

                                        <InputGroup
                                            className={
                                                this.state.aboutFocus
                                                    ? "no-border input-lg input-group-focus"
                                                    : "no-border input-lg"
                                            }
                                        >
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="far fa-file-alt"></i>                                            </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                placeholder="About"
                                                name="about"
                                                value={this.state.about}
                                                type="textarea"
                                                onFocus={() => this.setAboutFocus(true)}
                                                onBlur={() => this.setAboutFocus(false)}
                                                onChange={this.handleChange}
                                            ></Input>
                                        </InputGroup>

                                    </CardBody>
                                    <ModalFooter className="text-center">
                                        <Button
                                            block
                                            className="btn-morphin btn-round btn-info"
                                            type="submit"
                                            size="md"
                                        >
                                            SUBMIT
                          </Button>
                                    </ModalFooter>
                                </Form>
                            </Col>
                            <Col md="3"></Col>
                        </Row>
                    </Container>
                    <div style={{ height: '150px' }}></div> {/* offsets height of footer */}
                    <FooterBlack />
                </div>
            </div>
        )
    }
}

export default ProfileEdit;