import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ModalComponent from './ModalComponent';



import heartFull from 'assets/img/fullHeart.jpg'
import AddStoryForm from '../views/examples/AddStoryForm';
import EditStory from './EditStory';


// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Container,
  Row,
  Col,
  Modal,
  ModalFooter,
} from "reactstrap";
import { clearConfig } from 'dompurify';
import { relativeTimeThreshold } from 'moment';


class ListStories extends Component {

  state = {
    listOfStories: [],
    modalClassic: false,
    liked: false,
    // likesNum: 0,
    currentOpenStory: 0
  }

  componentDidMount() {
    axios.get('/api/stories').then((resp) => {
      console.log('Response', resp.data);
      this.setState({
        listOfStories: resp.data,
      })
    })
  }
  deleteHandler = (storyID) => {
    axios.delete('/api/stories/' + storyID).then(() => {
      this.setState({
        listOfStories: this.state.listOfStories.filter(p => p._id !== storyID)
      })
    })
  }
  editHandler = (storyID) => {
    console.log(this.state.listOfStories);
    this.setState({
      listOfStories: this.state.listOfStories.filter(p => p._id === storyID)
    })
  }
  setModalClassic = (bool) => {
    this.setState({
      modalClassic: bool

    })
  }

  //TO DO
  //ADD & COMMIT CHANGES NOW
  //To display the number of likes, you should count the elements in the array
  //Create another user and test new functionality
  //ADD & COMMIT and merge with team.

  likesNum = (storyID) => {

    axios.put(`/api/stories/${storyID}/liked`)
      .then((resp) => {                
        console.log('Likes response:', resp.data);

        const currentStory = resp.data

        let newList = [...this.state.listOfStories]
        let idx = this.state.listOfStories.findIndex(story => story._id === currentStory._id)
        newList.splice(idx, 1, currentStory)

        // let newList = this.state.listOfStories.filter(story => story._id !== currentStory._id)   
        //  newList = newList.concat(currentStory)     

        this.setState({          
          liked: currentStory.likes.includes(this.props.currentUser._id),
          listOfStories: newList
       })
      })
  }
  saveStoryValues = (position) => {
    this.setState({
      currentOpenStory: position,
      liked: this.state.listOfStories[position].likes.includes(this.props.currentUser._id)
    })
    this.setModalClassic(true)
   
    // console.log('ALL STORY VALUES', storyValues);
  }
  // newStoryHandler = (story) => {
  //   this.setState({
  //     listOfStories: this.state.listOfStories.concat(story)
  //   })
  // }
  render() {
    console.log('current story',this.state.listOfStories[this.state.currentOpenStory]);
    return (
      <div>
        <div
          className="section section-cards"
          data-background-color="gray"
          id="cards"
        >
          <div className="cards">
            <Container>
              <div className="title">
                <h3 className="title">User Cards</h3>
              </div>
              <Row  >
                {this.state.listOfStories.length === 0
                  ? <h1>LOADING...</h1>
                  : this.state.listOfStories.map((p, idx) => {
                    return (
                      <Col lg="4" md="6" key={p._id} >
                        {/* {JSON.stringify(p, null, 2)} */}
                        {/* {console.log('Maped List:', p)} */}
                        {/* {console.log('Icon', p.icon)} */}

                        <Card className="card-blog" >
                          <div className="card-image" onClick={() => this.saveStoryValues(idx)} style={{ cursor: 'pointer' }}>
                            {/* <Link to={`/stories/${p._id}`} key={p._id}> */}
                            <img
                              alt="..."
                              className="img rounded"
                              src={p.image}
                            ></img>
                            {/* </Link> */}
                          </div>

                          <CardBody>
                            {/* <Link to={`/stories/${p._id}`} key={p._id}> */}
                            <h6 className="category text-warning">
                              <i className={`${p.icon}`}></i> {p.category}
                            </h6>

                            <CardTitle tag="h5" onClick={() => this.saveStoryValues(idx)} style={{ cursor: 'pointer' }}>
                              {/* <Link to={`/stories/${p._id}`} key={p._id}> */}
                              <strong>{p.title}</strong>
                              {/* </Link> */}
                            </CardTitle>
                            <p className="card-description" onClick={() => this.saveStoryValues(idx)} style={{ cursor: 'pointer' }}>
                              {p.headline}
                            </p>
                            {/* </Link> */}
                            <CardFooter >
                              <div className="stats stats-right">
                                <i className="now-ui-icons ui-2_favourite-28"></i>
                                {p.likes.length}
                                <i className="now-ui-icons tech_watch-time"></i>
                                {p.duration}
                              </div>
                              <div className="author">
                                <img
                                  alt="..."
                                  className="avatar img-raised"
                                  src={require("assets/img/james.jpg")}
                                ></img>
                                <span>{this.props.currentUser.email}</span>
                              </div>
                              <hr />
                              <div>
                                {p.owner === this.props.currentUser._id ?
                                  <div>
                                    <button onClick={() => this.editHandler(p._id)}> <Link to={`/story-edit/${p._id}`}> Edit </Link></button>
                                  </div>
                                  : "hello"}
                                {p.owner === this.props.currentUser._id ? <button onClick={() => this.deleteHandler(p._id)}> Delete </button> : "hello"}
                              </div>
                            </CardFooter>
                          </CardBody>
                        </Card>

                      </Col>

                    )
                  })
                }
                {this.state.listOfStories && this.state.listOfStories[this.state.currentOpenStory] && 
                  <ModalComponent liked={this.state.liked} likesHandler={this.likesNum} story={this.state.listOfStories[this.state.currentOpenStory]} modalClassic={this.state.modalClassic} closeHandler={()=>this.setModalClassic(false)}/>
                
                }
              </Row>
            </Container>
          </div>
        </div>
      </div>
    )
  }
}

export default ListStories;

// onClick={() => this.setModalClassic(true)} style={{ cursor: 'pointer' }}
{/* <Modal
                            isOpen={this.state.modalClassic}
                            toggle={() => this.setModalClassic(false)}
                          >
                            <div className="modal-header justify-content-center">
                              <button
                                aria-hidden={true}
                                className="close"
                                onClick={() => this.setModalClassic(false)}
                                type="button"
                              >
                                <i className="now-ui-icons ui-1_simple-remove"></i>
                              </button>
                              <h4 className="title title-up">{p.title}</h4>
                            </div>
                            <div className="modal-body">
                              <h5 style={{ textDecoration: 'underline' }}>{p.headline}</h5>
                              <p>{p.content}</p>
                            </div>
                            <ModalFooter>
                              <Button color="success" type="button">
                                <i className="now-ui-icons ui-2_favourite-28 "></i>
                              </Button>
                              <Button color="danger" onClick={() => this.setModalClassic(false)}>
                                Close
                              </Button>
                            </ModalFooter>
                          </Modal> */}
