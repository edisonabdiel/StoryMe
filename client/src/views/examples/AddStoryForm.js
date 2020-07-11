import React from "react";
import axios from 'axios'
import Editor from "views/examples/editor";
import createDOMPurify from "dompurify";
import defaultAvatar from "assets/img/placeholder.jpg";
import ImageUpload from "components/CustomUpload/ImageUpload.js";
import DropdownIconsCategory from "views/examples/DropdownIconsCategory"
import FixedTransparentNavbar from "components/Navbars/FixedTransparentNavbar";
import FooterBlack from "components/Footers/FooterBlack.js";

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


const DOMPurify = createDOMPurify(window);


class AddStoryForm extends React.Component {
    state = {
        nameFocus: false,
        headlineFocus: false,
        categoryFocus: false,
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
    setImageHandel = (value) => {
        this.setState({
            imageUrl: value
        })
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
            <div data-background-color="black">
                <FixedTransparentNavbar />
                <div style={{ height: '70px' }}></div> {/* offsets height of navbar */}
                <div className="text-center">
                    <Container fluid>
                        <Row>
                            <Col></Col>
                            <Col className="px-0 my-auto" md="6">
                                <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(this.state.uploadedContent) }} />
                                <h2><b>NEW STORY</b></h2>
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
                                            <ImageUpload imageUrl={this.state.imageUrl} setImageHandel={this.setImageHandel} />
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
                                            className="nav-link btn-round"
                                            color="success"
                                            type="submit"
                                            size="md"
                                        >
                                            PUBLISH
                          </Button>
                                    </ModalFooter>
                                </Form>
                            </Col>
                            <Col></Col>
                        </Row>
                    </Container>
                </div>
                <FooterBlack />
            </div>
        )
    }

}

export default AddStoryForm



