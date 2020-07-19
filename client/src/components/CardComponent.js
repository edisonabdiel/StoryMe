import React from 'react';
import { Link } from 'react-router-dom';
import { FacebookIcon, FacebookShareButton, TwitterShareButton, TwitterIcon } from "react-share";

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
                ? <h1>No Stories found...</h1>
                : props.listOfStories.map((oneStory, idx) => {
                    return (
                        <Col lg="4" md="6" key={oneStory._id} >
                            {console.log(oneStory)}
                            {console.log(oneStory.owner.email)}
                            <Card className="card-blog" data-background-color={oneStory.cardBgColor}>
                                <div className="card-image" onClick={() => {
                                    props.saveStoryIndex(idx);
                                    {
                                        props.currentUser && props.currentUser.isVerified
                                            ? props.setModalClassic(true)
                                            : !props.currentUser
                                                ? props.setModalLogin(true)
                                                : props.setModalVerification(true)

                                    }
                                }}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <img
                                        alt="..."
                                        className="img rounded"
                                        src={oneStory.image}
                                        style={{ width: '100%', height: '100%' }}
                                    ></img>
                                </div>
                                <CardBody>
                                    <h6 className="category text-warning">
                                        <i className={`${oneStory.icon}`}></i> {oneStory.category}
                                    </h6>

                                    <CardTitle tag="h5" onClick={() => {
                                        props.saveStoryIndex(idx);
                                        {
                                            props.currentUser && props.currentUser.isVerified
                                                ? props.setModalClassic(true)
                                                : !props.currentUser
                                                    ? props.setModalLogin(true)
                                                    : props.setModalVerification(true)
                                        }
                                    }} style={{ cursor: 'pointer' }}>
                                        <strong>{oneStory.title}</strong>
                                    </CardTitle>
                                    <p className="card-description" onClick={() => {
                                        props.saveStoryIndex(idx);
                                        {
                                            props.currentUser && props.currentUser.isVerified
                                                ? props.setModalClassic(true)
                                                : !props.currentUser
                                                    ? props.setModalLogin(true)
                                                    : props.setModalVerification(true)
                                        }
                                    }} style={{ cursor: 'pointer' }}>
                                        {oneStory.headline}
                                    </p>
                                    <CardFooter >
                                        <div className="stats stats-right">
                                            {props.currentUser && oneStory.likes.includes(props.currentUser._id) ?
                                                <i className="fa fa-heart fa-lg" style={{ marginRight: '3px' }}></i>
                                                : <i className="now-ui-icons ui-2_favourite-28" ></i>
                                            }
                                            {oneStory.likes.length}
                                            <i className="now-ui-icons tech_watch-time"></i>
                                            {oneStory.duration}
                                        </div>
                                        <div className="author">
                                            <img
                                                alt="..."
                                                className="avatar img-raised"
                                                src={oneStory.owner.image}
                                            ></img>
                                            <Link to={{
                                                pathname: `/profile-page/${oneStory.owner._id}`,
                                                state: oneStory.owner
                                            }}>{oneStory.owner.userName ? oneStory.owner.userName : oneStory.owner.email}</Link>
                                        </div>
                                        <hr />
                                        <div className="btn-block">
                                            {props.currentUser && oneStory.owner._id === props.currentUser._id ?
                                                <div>
                                                    <div>

                                                        <button className="nav-link btn-info btn-round pull-left ml-lg-5" style={{ color: 'white', textDecoration: 'none' }}>
                                                            <Link className="text-decoration-none" to={"/story-edit/" + oneStory._id} onClick={() => props.editHandler(oneStory._id)}><b>Edit</b></Link>
                                                        </button>
                                                        <button className="nav-link btn-round btn-danger pull-right mr-5"
                                                            onClick={() => props.deleteHandler(oneStory._id)}><b>Delete</b>
                                                        </button>
                                                    </div>

                                                    <FacebookShareButton
                                                        url={`${process.env.EMAIL_HOST}stories/${oneStory._id}`}
                                                    // quote={props.joke.setup + props.joke.punchline}
                                                    // hashtag="#programing joke"
                                                    >
                                                        <FacebookIcon logoFillColor="white" size={32} round={true} />
                                                    </FacebookShareButton>
                                                    <TwitterShareButton
                                                        url={`${process.env.EMAIL_HOST}stories/${oneStory._id}`}
                                                    // quote={props.joke.setup + props.joke.punchline}
                                                    // hashtag="#programing joke"
                                                    >
                                                        <TwitterIcon logoFillColor="white" size={32} round={true} />
                                                    </TwitterShareButton>
                                                </div>
                                                : ""}
                                        </div>
                                    </CardFooter>
                                </CardBody>
                            </Card>

                        </Col>
                    )
                })
            }
        </Row >
    )
}

export default CardComponent;