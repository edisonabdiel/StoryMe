import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
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
} from "reactstrap";


class ListStories extends Component {

  state = {
    listOfStories: [],
    storiesInARow: 0
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
  // newStoryHandler = (story) => {
  //   this.setState({
  //     listOfStories: this.state.listOfStories.concat(story)
  //   })
  // }
  render() {
    console.log('CURRENT USER Name:', this.props.currentUser.email);

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
                  : this.state.listOfStories.map(p => {
                    return (
                      <Col lg="4" md="6" key={p._id}>
                        {console.log('Current user:', this.props.currentUser)}
                        {console.log('Owner:', p.owner)}
                        <Card className="card-blog">
                          <div className="card-image">
                            <img
                              alt="..."
                              className="img rounded"
                              src={require("assets/img/project13.jpg")}
                            ></img>
                          </div>
                          <CardBody>
                            <h6 className="category text-warning">
                              <i className={p.icon}></i> {p.category}
                            </h6>
                            <CardTitle tag="h5">
                              {/* <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                  Stay Focused: Train Your Brain
                                </a> */}
                              <Link to={`/stories/${p._id}`} key={p._id}>
                                <strong>{p.title}</strong>
                              </Link>
                            </CardTitle>
                            <p className="card-description">
                              {p.headline}
                            </p>

                            <CardFooter>
                              <div className="stats stats-right">
                                <i className="now-ui-icons ui-2_favourite-28"></i>
                                    342 ·{" "}
                                <i className="now-ui-icons tech_watch-time"></i>
                                  5 min
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
                                    {/* <EditStory theStory={this.state} getTheStory={this.componentDidMount} {...this.props}/> */}
                                    <button>
                                      <Link to={"/story-edit/" + p._id} onClick={() => this.editHandler(p._id)}>Edit</Link>
                                    </button>
                                  </div>
                                  : "hello"}

                                {p.owner === this.props.currentUser._id ? <button onClick={() => this.deleteHandler(p._id)}>Delete</button> : "hello"}
                              </div>

                            </CardFooter>
                          </CardBody>
                        </Card>
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