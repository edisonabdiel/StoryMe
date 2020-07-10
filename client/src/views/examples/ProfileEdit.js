import React, { Component } from 'react';
import axios from 'axios';
import defaultAvatar from "assets/img/placeholder.jpg";
import Editor from "views/examples/editor";
import ImageUpload from "components/CustomUpload/ImageUpload.js";
import Select from "react-select";

import DropdownIconsCategory from "views/examples/DropdownIconsCategory"

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




class ProfileEdit extends Component {
    state = {
        email: this.props.currentUser.email,
        password: "",
        newPassword: '',
        // userImage: this.props.currentUser.image,
        imageUrl: this.props.currentUser.image,
        uploadedImageName: '',
        about: this.props.currentUser.about,
        userName: this.props.currentUser.userName,
        errorMessage: "",
        nameFocus: false,
        passwordFocus: false,
        userNameFocus: false,
    }

    setNameFocus = (bool) => {
        this.setState({
            nameFocus: bool
        })
    }
    setPasswordFocus = (bool) => {
        this.setState({
            categoryFocus: bool
        })
    }
    setUserNameFocus = (bool) => {
        this.setState({
            durationFocus: bool
        })
    }

    // upload-delete image handlers 

    handleImageChange = (e) => {
        let formData = new FormData()
        formData.append("imageUrl", e.target.files[0])
        axios.post("/api/upload-img", formData).then((res) => {
            console.log(res.data)
            this.setState({
                imageUrl: res.data.secure_url,
                uploadedImageName: res.data.imageName
            })
        }).catch((error) => {
            console.log("Error!!");
            console.log(error.response);
        })
    }

    handleImageRemove = () => {
        const name = (this.state.imageName)
        console.log("outPut: ImageUpload -> handleRemove -> name", name)
        axios.post(`/api/delete-upload-img/${name}`).then((res) => {
            console.log(res)
            this.setState({
                imageUrl: defaultAvatar,
                uploadedImageName: ''
            })
        }).catch((error) => {
            console.log("Error!!");
            console.log(error.response);
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
            content: newContent
        })
    }

    handleFormSubmit = (event) => {
        const email = this.state.email;
        const password = this.state.password;
        const about = this.state.about;
        const imageUrl = this.state.imageUrl
        const imageName = this.state.uploadedImageName
        const userName = this.state.userName;
        const newPassword = this.state.newPassword


        event.preventDefault();

        axios.put(`/api/user/${this.props.currentUser._id}`, { email, password, about, imageUrl, imageName, userName, newPassword })
            .then((resp) => {
                this.setState({
                    email: "",
                    password: "",
                    about: "",
                    imageUrl: "",
                    uploadedImageName: "",
                    newPassword: '',
                    userName: ""
                })
                // if (this.props.currentUser) {
                //     this.props.history.push('/list-stories')
                // }
            })
            .catch(error => {
                console.log("Error!", error.response);
                this.setState({
                    errorMessage: error.response.data.message
                })
            })
    }


    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col md="6">
                            {/* <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(this.state.uploadedContent) }} /> */}
                            <h2>Edit your account</h2>
                            <Form action="" className="form" method="" onSubmit={this.handleFormSubmit}>
                                <CardBody>
                                    {/* image */}
                                    <InputGroup >
                                        <ImageUpload avatar imageUrl={this.state.imageUrl} handleImageChange={this.handleImageChange} handleImageRemove={this.handleImageRemove} />
                                    </InputGroup>
                                    {/* email */}
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
                                            placeholder="userName"
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
                                                <i className="now-ui-icons ui-1_lock-circle-open"></i>                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                            placeholder="old password"
                                            name="password"
                                            value={this.state.password}
                                            type="text"
                                            onFocus={() => this.setPasswordFocus(true)}
                                            onBlur={() => this.setPasswordFocus(false)}
                                            onChange={this.handleChange}
                                        ></Input>
                                        <Input
                                            placeholder="new password"
                                            name="newPassword"
                                            value={this.state.newPassword}
                                            type="text"
                                            onFocus={() => this.setPasswordFocus(true)}
                                            onBlur={() => this.setPasswordFocus(false)}
                                            onChange={this.handleChange}
                                        ></Input>
                                    </InputGroup>
                                    {/* about */}

                                    <Editor updateContent={this.updateContent} content={this.state.content} profile />
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
                                        SUBMIT
                          </Button>
                                </ModalFooter>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default ProfileEdit;