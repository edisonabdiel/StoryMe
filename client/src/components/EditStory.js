import React, { Component } from 'react';
import axios from 'axios';
import defaultAvatar from "assets/img/placeholder.jpg";
import Editor from "views/examples/editor";
import DOMPurify from "dompurify";
import ImageUpload from "components/CustomUpload/ImageUpload.js";
// import Select from "react-select";
import DropdownIconsCategory from "views/examples/DropdownIconsCategory"
import EditFixedNavbar from './Navbars/EditFixedNavbar';
import FooterBlack from './Footers/FooterBlack';

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


class EditStory extends Component {
    state = {
        title: '',
        headline: '',
        content: '',
        imageUrl: defaultAvatar,
        storyImageName: '',
        category: "",
        duration: "",
        errorMessage: "",
        icon: "",
        nameFocus: false,
        headlineFocus: false,
        categoryFocus: false,
        durationFocus: false

    }

    componentDidMount() {
        axios.get(`/api/stories/${this.props.match.params.id}`).then((resp) => {
            this.setState({
                title: resp.data.title,
                headline: resp.data.headline,
                content: resp.data.content,
                imageUrl: resp.data.image,
                storyImageName: resp.data.imageName,
                category: resp.data.category,
                duration: resp.data.duration,
                icon: resp.data.icon
            })
        })
    }

    setNameFocus = (bool) => {
        this.setState({
            nameFocus: bool
        })
    }
    setCategoryFocus = (bool) => {
        this.setState({
            categoryFocus: bool
        })
    }
    setDurationFocus = (bool) => {
        this.setState({
            durationFocus: bool
        })
    }
    setHeadlineFocus = (bool) => {
        this.setState({
            headlineFocus: bool
        })
    }

    // upload-delete image handlers 
    handleImageChange = (e) => {
        let formData = new FormData()
        formData.append("imageUrl", e.target.files[0])
        axios.post("/api/upload-img", formData).then((res) => {
            this.setState({
                imageUrl: res.data.secure_url,
                storyImageName: res.data.imageName
            })
        })
    }

    handleImageRemove = () => {
        const name = (this.state.storyImageName)
        axios.post(`/api/delete-upload-img/${name}`).then((res) => {
            this.setState({
                imageUrl: defaultAvatar,
                storyImageName: ''
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
            content: newContent
        })
    }

    // category icons 
    iconSelected = (value) => {
        this.setState({
            icon: value.label.props.className
        })
    }

    handleFormSubmit = (event) => {
        const title = this.state.title;
        const headline = this.state.headline;
        const content = this.state.content;
        const image = this.state.imageUrl
        const imageName = this.state.storyImageName
        const duration = this.state.duration;
        const category = this.state.category;
        const icon = this.state.icon;

        event.preventDefault();

        axios.put(`/api/stories/${this.props.match.params.id}`, { title, headline, content, image, imageName, duration, category, icon })
            .then((resp) => {
                this.setState({
                    title: this.state.title,
                    headline: this.state.headline,
                    content: this.state.content,
                    image: this.state.imageUrl,
                    imageName: this.state.storyImageName,
                    duration: this.state.duration,
                    category: this.state.category,
                    icon: this.state.icon
                })
                if (this.props.currentUser) {
                    this.props.history.push(`/profile-page/${this.props.currentUser._id}`)
                }
            })
            .catch(error => {
                this.setState({
                    errorMessage: error.response.data.message
                })
            })
    }


    render() {
        return (
            <div data-background-color="black">
                <EditFixedNavbar currentUser={this.props.currentUser} updateUser={this.props.updateUser} />
                <div style={{ height: '75px' }}></div> {/* offsets height of navbar */}
                <div className="text-center">
                    <Container fluid>
                        <Row>
                            <Col></Col>
                            <Col className="px-0 my-auto" md="6">
                                <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(this.state.uploadedContent) }} />
                                <h2><b>EDIT STORY</b></h2>
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
                                                placeholder="title"
                                                name="title"
                                                value={this.state.title}
                                                type="text"
                                                onFocus={() => this.setNameFocus(true)}
                                                onBlur={() => this.setNameFocus(false)}
                                                onChange={this.handleChange}
                                            ></Input>
                                        </InputGroup>
                                        {/* image */}
                                        <ImageUpload imageUrl={this.state.imageUrl} handleImageChange={this.handleImageChange} handleImageRemove={this.handleImageRemove} />
                                        {/* category */}
                                        <Container>
                                            <Row>
                                                <Col xs="3">
                                                    <DropdownIconsCategory iconValue={this.iconSelected} icon={this.state.icon} />
                                                </Col>
                                                <Col xs="9">
                                                    <InputGroup
                                                        className={
                                                            this.state.categoryFocus
                                                                ? "no-border input-lg input-group-focus"
                                                                : "no-border input-lg"
                                                        }
                                                    >
                                                        <Input
                                                            placeholder="Category"
                                                            name="category"
                                                            value={this.state.category}
                                                            type="text"
                                                            onFocus={() => this.setCategoryFocus(true)}
                                                            onBlur={() => this.setCategoryFocus(false)}
                                                            onChange={this.handleChange}
                                                        ></Input>
                                                    </InputGroup>
                                                </Col>
                                            </Row>
                                        </Container>
                                        {/* Duration */}
                                        <InputGroup
                                            className={
                                                this.state.durationFocus
                                                    ? "no-border input-lg input-group-focus"
                                                    : "no-border input-lg"
                                            }
                                        >
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="now-ui-icons tech_watch-time"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                placeholder="Duration"
                                                name="duration"
                                                value={this.state.duration}
                                                type="text"
                                                onFocus={() => this.setDurationFocus(true)}
                                                onBlur={() => this.setDurationFocus(false)}
                                                onChange={this.handleChange}
                                            ></Input>
                                        </InputGroup>
                                        {/* headline */}
                                        <InputGroup
                                            className={
                                                this.state.headlineFocus
                                                    ? "no-border input-lg input-group-focus"
                                                    : "no-border input-lg"
                                            }
                                        >
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="now-ui-icons files_paper"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                placeholder="Summary"
                                                name="headline"
                                                value={this.state.headline}
                                                type="text"
                                                onFocus={() => this.setHeadlineFocus(true)}
                                                onBlur={() => this.setHeadlineFocus(false)}
                                                onChange={this.handleChange}
                                            ></Input>
                                        </InputGroup>
                                        {/* editor */}

                                        <Editor updateContent={this.updateContent} content={this.state.content} />
                                    </CardBody>
                                    <ModalFooter className="text-center">
                                        <Button
                                            block
                                            className="btn-link btn-round"
                                            color="success"
                                            type="submit"
                                            size="lg"
                                        >
                                            SAVE CHANGES
                          </Button>
                                    </ModalFooter>
                                </Form>
                            </Col>
                            <Col></Col>
                        </Row>
                    </Container>
                    <FooterBlack />
                </div>
            </div>
        )
    }
}

export default EditStory;