import React from 'react';
import CircleLoader from "react-spinners/CircleLoader";
import SingleStory from "./SingleStory"


import {
    Col,
    Row
} from "reactstrap";

const chunkArray = (myArray, chunk_size) => {
    let copyArr = [...myArray]
    var results = [];
    while (copyArr.length) {
        results.push(copyArr.splice(0, chunk_size));
    }
    return results;
}

const CardComponent = (props) => {

    let chunkedArr = chunkArray(props.listOfStories, Math.ceil(props.listOfStories.length / 3))

    if (chunkedArr.length === 0 && props.profileStories) {
        return (<h3>NO STORIES WRITTEN YET... <CircleLoader /></h3>)
    } else if (chunkedArr.length === 0 && props.profileLikes) {
        return (<h3>NO LIKED STORIES YET... <CircleLoader /></h3>)
    } else if (chunkedArr.length === 0 && props.isDiscovery) {
        return (<h3>NO STORIES TO DISCOVER YET... <CircleLoader /></h3>)
    }

    return (
        <Row className=' align-items-lg-start'>
            {chunkedArr.map((stories, chunkedArrIdx) => {
                return (
                    <Col lg="4" md="6" key={chunkedArrIdx} >
                        {stories.map((oneStory, idx) => {
                            return (
                                <SingleStory
                                    key={oneStory._id}
                                    oneStory={oneStory}
                                    position={chunkedArrIdx * Math.ceil(props.listOfStories.length / 3) + idx}
                                    saveStoryIndex={props.saveStoryIndex}
                                    currentUser={props.currentUser}
                                    editHandler={props.editHandler}
                                    deleteHandler={props.deleteHandler}
                                    setModalClassic={props.setModalClassic}
                                    setModalLogin={props.setModalLogin}
                                    isDiscovery={props.isDiscovery}
                                    setModalVerification={props.setModalVerification}
                                    changeStateHandler={props.changeStateHandler}
                                ></SingleStory>
                            )
                        })}
                    </Col>
                )
            })
            }
        </Row>
    )
}
export default CardComponent;