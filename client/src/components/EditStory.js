import React, { Component } from 'react';
import axios from 'axios';
import defaultAvatar from "assets/img/placeholder.jpg";
import Editor from "views/examples/editor";
import DOMPurify from "dompurify";
import ImageUpload from "components/CustomUpload/ImageUpload.js";
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



class EditStory extends Component {
    state = {
        title: '',
        headline: '',
        content: '',
        storyImageUrl: defaultAvatar,
        storyImageName: '',
        category: "",
        duration: "",
        errorMessage: '',
        icon: null,
        nameFocus: false,
        headlineFocus: false,
        categoryFocus: false,
        durationFocus: false

    }

    componentDidMount() {
        axios.get(`/api/stories/${this.props.match.params.id}`).then((resp) => {
            console.log('Response edit:', resp.data);
            this.setState({
                title: resp.data.title,
                headline: resp.data.headline,
                content: resp.data.content,
                storyImageUrl: resp.data.image,
                storyImageName: resp.data.imageName,
                category: resp.data.category,
                duration: resp.data.duration
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
        formData.append("storyImageUrl", e.target.files[0])
        axios.post("/api/upload-img", formData).then((res) => {
            console.log(res.data)
            this.setState({
                storyImageUrl: res.data.secure_url,
                storyImageName: res.data.imageName
            })
        }).catch((error) => {
            console.log("Error!!");
            console.log(error.response);
        })
    }

    handleImageRemove = () => {
        const name = (this.state.storyImageName)
        console.log("outPut: ImageUpload -> handleRemove -> name", name)
        axios.post(`/api/delete-upload-img/${name}`).then((res) => {
            console.log(res)
            this.setState({
                storyImageUrl: defaultAvatar,
                storyImageName: ''
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

    // category icons 
    iconSelected = (value) => {
        this.setState({
            icon: value
        })
    }

    handleFormSubmit = (event) => {
        const title = this.state.title;
        const headline = this.state.headline;
        const content = this.state.content;
        const image = this.state.storyImageUrl
        const imageName = this.state.storyImageName
        const duration = this.state.duration;
        const category = this.state.category;

        event.preventDefault();

        axios.put(`/api/stories/${this.props.match.params.id}`, { title, headline, content, image, imageName, duration, category })
            .then((resp) => {
                this.setState({
                    title: this.state.title,
                    headline: this.state.headline,
                    content: this.state.content,
                    image: this.state.storyImageUrl,
                    imageName: this.state.storyImageName,
                    duration: this.state.duration,
                    category: this.state.category
                })
                if (this.props.currentUser) {
                    this.props.history.push('/list-stories')
                }
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
                            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(this.state.uploadedContent) }} />
                            <h2>Edit your story</h2>
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
                                    <InputGroup >
                                        <ImageUpload storyImageUrl={this.state.storyImageUrl} setImageHandel={this.setImageHandel} handleImageChange={this.handleImageChange} handleImageRemove={this.handleImageRemove} />
                                    </InputGroup>
                                    {/* category */}
                                    <Container>
                                        <Row>
                                            <Col xs="3">
                                                < DropdownIconsCategory iconValue={this.iconSelected} icon={this.state.icon} />
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
                                            </Col >
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
                                                <i className="now-ui-icons ui-1_lock-circle-open"></i>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                            placeholder="Headline"
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
                                        className="btn-neutral btn-round"
                                        color="info"
                                        // href=""
                                        type="submit"
                                        size="lg"
                                    >
                                        EDIT
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

export default EditStory;