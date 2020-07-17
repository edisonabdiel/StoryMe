import React, { Component } from 'react'
import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

import {
    NavItem,
    NavLink,
    Nav,
    Row,
    Col,
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
                                            this.props.handelToCloseLikes(false)
                                            this.props.handelIsClickedStories()
                                            this.setState({
                                                pills: '1'
                                            })
                                            scroller.scrollTo('myScrollToElement', {
                                                duration: 1500,
                                                delay: 100,
                                                smooth: true,
                                            })
                                        }}
                                        className={this.state.pills === "1" ? "active" : ""}

                                    >
                                        <i className="now-ui-icons files_single-copy-04"></i>

                                    </NavLink>
                                </NavItem>
                                {this.props.currentUser._id === this.props.userId &&
                                    <NavItem>
                                        <NavLink
                                            onClick={(e) => {
                                                e.preventDefault();
                                                this.props.handelToCloseStories(false)
                                                this.props.handelIsClickedLikes()
                                                this.setState({
                                                    pills: '2'
                                                })
                                                scroller.scrollTo('myScrollToElement', {
                                                    duration: 1500,
                                                    delay: 100,
                                                    smooth: true,
                                                })
                                            }}
                                            className={this.state.pills === "2" ? "active" : ""}
                                        >
                                            <i className="now-ui-icons ui-2_favourite-28"></i>
                                        </NavLink>
                                    </NavItem>
                                }
                            </Nav>
                        </div>

                    </Col>
                </Row>
                <Element name="myScrollToElement">

                </Element>
            </div>
        )
    }
}

export default ProfilePagePortfolio
