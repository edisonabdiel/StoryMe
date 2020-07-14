import React from 'react';
import { Link } from 'react-router-dom';

import {
    Card,
    CardBody,
    CardFooter,
    CardTitle,
    Col,
    Row,
} from "reactstrap";

const CardComponent = (props) => {
    return (
        <Row>
            {props.listOfStories.length === 0
                ? <h1>LOADING...</h1>
                : props.listOfStories.map((oneStory, idx) => {
                    return (
                        <Col lg="4" md="6" key={oneStory._id} >
                            <Card className="card-blog" >
                                <div className="card-image" onClick={() => { props.saveStoryIndex(idx); props.setModalClassic(true) }} style={{ cursor: 'pointer' }}>
                                    <img
                                        alt="..."
                                        className="img rounded"
                                        src={oneStory.image}
                                        style={{ width: '350px', height: '300px' }}
                                    ></img>
                                </div>
                                <CardBody>
                                    <h6 className="category text-warning">
                                        <i className={`${oneStory.icon}`}></i> {oneStory.category}
                                    </h6>

                                    <CardTitle tag="h5" onClick={() => { props.saveStoryIndex(idx); props.setModalClassic(true) }} style={{ cursor: 'pointer' }}>
                                        <strong>{oneStory.title}</strong>
                                    </CardTitle>
                                    <p className="card-description" onClick={() => { props.saveStoryIndex(idx); props.setModalClassic(true) }} style={{ cursor: 'pointer' }}>
                                        {oneStory.headline}
                                    </p>
                                    <CardFooter >
                                        <div className="stats stats-right">
                                            {oneStory.likes.includes(props.currentUser._id) ?
                                                <i className="fa fa-heart fa-lg" style={{marginRight:'3px'}}></i>
                                                :<i className="now-ui-icons ui-2_favourite-28" ></i>
                                            }
                                            {oneStory.likes.length}
                                            <i className="now-ui-icons tech_watch-time"></i>
                                            {oneStory.duration}
                                        </div>
                                        <div className="author">
                                            <img
                                                alt="..."
                                                className="avatar img-raised"
                                                src={require("assets/img/james.jpg")}
                                            ></img>
                                            <span>{props.currentUser.email}</span>
                                        </div>
                                        <hr />
                                        <div className="btn-block">
                                            {oneStory.owner === props.currentUser._id ?
                                                <div>
                                                    <button className="nav-link btn-info btn-round pull-left ml-lg-5" style={{ color: 'white', textDecoration: 'none' }}>
                                                        <Link className="text-decoration-none" to={"/story-edit/" + oneStory._id} onClick={() => props.editHandler(oneStory._id)}><b>Edit</b></Link>
                                                    </button>
                                                </div>
                                                : ""}

                                            {oneStory.owner === props.currentUser._id ? <button className="nav-link btn-round btn-danger pull-right mr-5"
                                                onClick={() => props.deleteHandler(oneStory._id)}><b>Delete</b></button> : "Edit/delete not available"}
                                        </div>
                                    </CardFooter>
                                </CardBody>
                            </Card>
                        </Col>
                    )
                })
            }
        </Row>
    )
}

export default CardComponent;