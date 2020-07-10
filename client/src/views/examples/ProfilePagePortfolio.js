import React, { Component } from 'react'
import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

import {
    Badge,
    Button,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Label,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    NavItem,
    NavLink,
    Nav,
    TabContent,
    TabPane,
    Container,
    Row,
    Col,
    UncontrolledTooltip,
} from "reactstrap";







// Somewhere else, even another file

export class ProfilePagePortfolio extends Component {
    state = {
        pills: '1'
    }

    render() {
        return (
            <div>
                <Row>
                    <Col md="12">
                        <h4 className="title text-center">My Portfolio</h4>
                        <div className="nav-align-center">
                            <Nav
                                className="nav-pills-info nav-pills-just-icons"
                                role="tablist"
                                pills>
                                <NavItem>
                                    <NavLink
                                        onClick={(e) => {
                                            e.preventDefault();
                                            this.props.handelIsClicked()
                                            this.setState({
                                                pills: '1'
                                            })
                                            scroller.scrollTo('myScrollToElement', {
                                                duration: 1500,
                                                delay: 100,
                                                smooth: true,
                                                // containerId: 'ContainerElementID',
                                                // offset: 50, // Scrolls to element + 50 pixels down the page
                                            })
                                        }}
                                        className={this.state.pills === "1" ? "active" : ""}
                                    // role="tablist"

                                    >
                                        <i className="now-ui-icons design_image"></i>

                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        onSelect={() => scroller.scrollTo('myScrollToElement', {
                                            duration: 1500,
                                            delay: 100,
                                            smooth: true,
                                            // containerId: 'ContainerElementID',
                                            // offset: 50, // Scrolls to element + 50 pixels down the page
                                        })}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            this.setState({
                                                pills: '2'
                                            })
                                        }}
                                        className={this.state.pills === "2" ? "active" : ""}
                                        // role="tablist"
                                        href="#go-here"

                                    >
                                        <i className="now-ui-icons location_world"></i>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        onClick={(e) => {
                                            e.preventDefault();
                                            this.setState({
                                                pills: '3'
                                            })
                                        }}
                                        className={this.state.pills === "3" ? "active" : ""}
                                    // role="tablist"
                                    // href="#pablo"
                                    >
                                        <i className="now-ui-icons design-2_ruler-pencil"></i>
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </div>

                    </Col>
                </Row>
                <Element name="myScrollToElement">
                    nothing here, just try the
                    scroll
            </Element>
            </div>
        )
    }
}

export default ProfilePagePortfolio
