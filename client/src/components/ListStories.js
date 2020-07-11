import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
// import AddStoryForm from '../views/examples/AddStoryForm';
// import EditStory from './EditStory';


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


class ListStories extends Component {

  state = {
    listOfStories: [],
    storiesInARow: 0,
    modalClassic: false,
    // icon: this.props.icon
  }

  componentDidMount() {
    axios.get('/api/stories').then((resp) => {
      this.setState({
        listOfStories: resp.data
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
  // newStoryHandler = (story) => {
  //   this.setState({
  //     listOfStories: this.state.listOfStories.concat(story)
  //   })
  // }
  render() {
    console.log('CURRENT USER Name:', this.props.currentUser.email);

    return (
      <div>
        {/* {console.log('ICON',this.state.icon)} */}
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
                  : this.state.listOfStories.map(p => {
                    return (
                      <Col lg="4" md="6" key={p._id} >
                        {console.log('Maped List:', p)}
                        {console.log('Icon', p.icon)}
                        <Card className="card-blog" >
                          <div className="card-image" onClick={() => this.setModalClassic(true)} style={{ cursor: 'pointer' }}>
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
                            
                            <CardTitle tag="h5" onClick={() => this.setModalClassic(true)} style={{ cursor: 'pointer' }}>
                              {/* <Link to={`/stories/${p._id}`} key={p._id}> */}
                                <strong>{p.title}</strong>
                              {/* </Link> */}
                            </CardTitle>
                            <p className="card-description">
                              <strong>{p.headline}</strong> 
                            </p>
                            {/* </Link> */}
                            <CardFooter >
                              <div className="stats stats-right" onClick={() => this.setModalClassic(true)} style={{ cursor: 'pointer' }}>
                                <i className="now-ui-icons ui-2_favourite-28"></i>
                                    342 ·{" "}
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
                              <div className="btn-block">
                                {p.owner === this.props.currentUser._id ?
                                  <div>
                                    {/* <EditStory theStory={this.state} getTheStory={this.componentDidMount} {...this.props}/> */}
                                    <button className="nav-link btn-info btn-round pull-left ml-lg-5" style={{ color: 'white', textDecoration: 'none'}}>
                                      <Link className="text-decoration-none" to={"/story-edit/" + p._id} onClick={() => this.editHandler(p._id)}><b>Edit</b></Link>
                                    </button>
                                  </div>
                                  : "hello"}

                                {p.owner === this.props.currentUser._id ? <button className="nav-link btn-round btn-danger pull-right mr-5" 
                                  onClick={() => this.deleteHandler(p._id)}><b>Delete</b></button> : "hello"}
                              </div>
                            </CardFooter>
                          </CardBody>
                        </Card>
                        <Modal
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
                      </Modal>
                      </Col>  
                    )
                  })
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
