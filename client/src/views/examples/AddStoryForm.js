import React from "react";
import axios from 'axios'
import { Link } from 'react-router-dom'
import Editor from "views/examples/editor"
import createDOMPurify from "dompurify";
import defaultAvatar from "assets/img/placeholder.jpg";
import ImageUpload from "components/CustomUpload/ImageUpload.js";
import DropdownIconsCategory from "views/examples/DropdownIconsCategory"




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

const DOMPurify = createDOMPurify(window);


class AddStoryForm extends React.Component {
    state = {
        nameFocus: false,
        headlineFocus: false,
        categoryFocus: false,
        modalLogin: false,
        title: '',
        headline: '',
        errorMessage: '',
        content: '',
        uploadedContent: '',
        imageUrl: defaultAvatar,
        category: "",
        duration: "",
        icon: null
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
            categoryFocus: bool
        })
    }
    setHeadlineFocus = (bool) => {
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
    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }
    handleFormSubmit = (event) => {
        event.preventDefault()

        const title = this.state.title
        const headline = this.state.headline
        const content = this.state.content
        const image = this.state.imageUrl
        const duration = this.state.duration
        const category = this.state.category


        axios.post("/api/stories", { title, headline, content, image, duration, category })
            .then((resp) => {
                this.setState({ title: "", headline: "", content: '', image: defaultAvatar, duration: "", category: "" });
                this.setState({ uploadedContent: resp.data.content })
            }).catch((error) => {
                console.log("Error!!");
                console.log(error.response);
                this.setState({
                    errorMessage: error.response.data.message
                })
            })
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

    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col md="6">
                            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(this.state.uploadedContent) }} />
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
                                        <ImageUpload imageUrl={this.state.imageUrl} />
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



