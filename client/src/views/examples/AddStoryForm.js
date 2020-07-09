import React from "react";
import axios from 'axios'
import Editor from "views/examples/editor";
import defaultAvatar from "assets/img/placeholder.jpg";
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




class AddStoryForm extends React.Component {
    state = {
        nameFocus: false,
        headlineFocus: false,
        categoryFocus: false,
        durationFocus: false,
        title: '',
        headline: '',
        content: '',
        storyImageUrl: defaultAvatar,
        storyImageName: '',
        category: "",
        duration: "",
        icon: '',
        errorMessage: ''
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

    // change the state of story elements 
    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
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

    // upload-delete images handlers 

    handleImageChange = (e) => {
        let formData = new FormData()
        formData.append("storyImageUrl", e.target.files[0])
        axios.post("/api/upload-img", formData).then((res) => {
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
        const imageName = (this.state.storyImageName)
        axios.post(`/api/delete-upload-img/${imageName}`).then((res) => {
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


    // submit add story form handler
    handleFormSubmit = (event) => {
        event.preventDefault()
        const title = this.state.title
        const headline = this.state.headline
        const content = this.state.content
        const image = this.state.storyImageUrl
        const imageName = this.state.storyImageName
        const duration = this.state.duration
        const category = this.state.category
        const icon = this.state.icon


        axios.post("/api/stories", { title, headline, content, image, imageName, duration, category,icon })
            .then((resp) => {
                console.log("outPut: AddStoryForm -> handleFormSubmit -> resp", resp.data.image)
                this.setState({ title: "", headline: "", content: '', storyImageUrl: defaultAvatar, storyImageName: '', duration: "", category: "",icon:"" });
            }).catch((error) => {
                console.log("Error!!");
                console.log(error.response);
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
                            <h2>CREATE NEW STORY</h2>
                            <Form action="" className="form" method="" onSubmit={this.handleFormSubmit}>
                                <CardBody>
                                    <InputGroup
                                        className={
                                            this.state.nameFocus
                                                ? "no-border input-lg input-group-focus"
                                                : "no-border input-lg"
                                        }
                                    >
                                        {/* title */}
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
                                            {/* category icons dropdown list */}
                                            <Col xs="3">
                                                <DropdownIconsCategory iconValue={this.iconSelected} icon={this.state.icon} />
                                            </Col>
                                            <Col xs="9">
                                                {/* category name input */}
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
                                        type="submit"
                                        size="lg"
                                    >
                                        PUBLISH
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

export default AddStoryForm



