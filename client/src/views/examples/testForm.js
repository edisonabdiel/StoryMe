import React from "react";
import axios from 'axios'
import { Link } from 'react-router-dom'
import Editor from "views/examples/editer"
import createDOMPurify from "dompurify";


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


class TestForm extends React.Component {
    state = {
        nameFocus: false,
        passwordFocus: false,
        modalLogin: false,
        title: '',
        description: '',
        errorMessage: '',
        content: '',
        uploadedContent: ''
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
        const description = this.state.description
        const content = this.state.content


        axios.post("/api/story", { title, description, content })
            .then((resp) => {
                this.setState({ title: "", description: "", content: '' });
                this.setState({ uploadedContent: resp.data.content })
            }).catch((error) => {
                console.log("Error!!");
                console.log(error.response);
                this.setState({
                    errorMessage: error.response.data.message
                })
            })
    }
    updateContent = (newContent) => {
        this.setState({
            content: newContent
        })
    }

    render() {
        return (
            <div>
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
                                placeholder="description"
                                name="description"
                                value={this.state.description}
                                type="text"
                                onFocus={() => this.setPasswordFocus(true)}
                                onBlur={() => this.setPasswordFocus(false)}
                                onChange={this.handleChange}
                            ></Input>
                        </InputGroup>
                        <InputGroup
                            className=
                            "no-border input-lg input-group-focus">

                            <Editor updateContent={this.updateContent} content={this.state.content} />
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
                            Get Started
                          </Button>
                    </ModalFooter>
                </Form>
                <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(this.state.uploadedContent) }} />
            </div>


        )
    }

}

export default TestForm



