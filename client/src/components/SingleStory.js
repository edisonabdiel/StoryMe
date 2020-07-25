import React from 'react';
import { Link } from 'react-router-dom';
import { FacebookIcon, FacebookShareButton, TwitterShareButton, TwitterIcon } from "react-share";
import defaultAvatar from "assets/img/placeholder.jpg";


import {
    Card,
    CardBody,
    CardFooter,
    CardTitle,
} from "reactstrap";

const SingleStory = (props) => {

    const oneStory = props.oneStory

    return (
        <Card className="card-blog" data-background-color={oneStory.cardBgColor}>
            <div className="card-image" onClick={() => {
                props.saveStoryIndex(props.position);
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
                {oneStory.image !== defaultAvatar ?
                    <img
                        alt="..."
                        className="img rounded"
                        src={oneStory.image}
                        style={{ width: '100%', height: '100%' }}
                    ></img>
                    : ''
                }
            </div>
            <CardBody>
                <h6 className="category text-warning">
                    <i className={`${oneStory.icon}`}></i> {oneStory.category}
                </h6>

                <CardTitle tag="h5" onClick={() => {
                    props.saveStoryIndex(props.position);
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
                    props.saveStoryIndex(props.position);
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
                <CardFooter className=" flex-fill" >
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
                        {!props.isDiscovery ? <Link to={`/profile-page/${oneStory.owner._id}`}
                            onClick={() => props.changeStateHandler(oneStory.owner._id)}>
                            {oneStory.owner.userName ? oneStory.owner.userName : oneStory.owner.email}</Link>
                            : <Link to={`/profile-page/${oneStory.owner._id}`}>

                                {oneStory.owner.userName ? oneStory.owner.userName : oneStory.owner.email}</Link>}
                    </div>
                    <hr />
                    <div className="btn-block text-center ">
                        {props.currentUser && oneStory.owner._id === props.currentUser._id ?
                            <div>
                                <div>
                                    <button className=" btn-info btn-round pull-left ml-lg-5"
                                        size="sm"

                                    >
                                        <Link className="text-decoration-none" to={"/story-edit/" + oneStory._id} onClick={() => props.editHandler(oneStory._id)}><b>Edit</b></Link>
                                    </button>
                                    <button className=" btn-round btn-danger pull-right mr-5"
                                        size="sm"
                                        onClick={() => props.deleteHandler(oneStory._id)}><b>Delete</b>
                                    </button>
                                </div>
                                <FacebookShareButton
                                    url={`https://storyme-app.herokuapp.com/stories/${oneStory._id}`}
                                >
                                    <FacebookIcon size={32} round={true} />
                                </FacebookShareButton>
                                <TwitterShareButton
                                    url={`https://storyme-app.herokuapp.com/stories/${oneStory._id}`}
                                    quote={oneStory.headline}
                                >
                                    <TwitterIcon size={32} round={true} />
                                </TwitterShareButton>
                            </div>
                            : ""}
                    </div>
                </CardFooter>
            </CardBody>
        </Card>
    )
}

export default SingleStory