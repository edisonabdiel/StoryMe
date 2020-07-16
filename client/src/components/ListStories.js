import React, { Component } from 'react';
import axios from 'axios';
import ModalComponent from './ModalComponent';
import CardComponent from './CardComponent';

// reactstrap components
import {
  Container,
  Row,
} from "reactstrap";
import { clearConfig } from 'dompurify';
import { relativeTimeThreshold } from 'moment';



// <ListStories loggedInUser= {}
class ListStories extends Component {

  state = {
    listOfStories: [],
    modalClassic: false,
    liked: false,
    currentOpenStory: 0
  }


  componentDidMount() {

    this.props.profile
      ? axios.get(`/api/profileStories/${this.props.userId}`).then((resp) => {
        this.setState({
          listOfStories: resp.data
        })
      })
      : axios.get('/api/stories').then((resp) => {
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

  //TO DO
  //ADD & COMMIT CHANGES NOW
  //To display the number of likes, you should count the elements in the array
  //Create another user and test new functionality
  //ADD & COMMIT and merge with team.

  likesHandler = (storyID) => {

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
  saveStoryIndex = (position) => {
    this.setState({
      currentOpenStory: position,
      liked: this.state.listOfStories[position].likes.includes(this.props.currentUser._id)
    })
    // this.setModalClassic(true)

  }


  render() {
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
                <h3 className="title"></h3>
              </div>
              <CardComponent listOfStories={this.state.listOfStories}
                saveStoryIndex={this.saveStoryIndex}
                currentUser={this.props.currentUser}
                editHandler={this.editHandler}
                deleteHandler={this.deleteHandler}
                setModalClassic={this.setModalClassic}
              />
              {this.state.listOfStories && this.state.listOfStories[this.state.currentOpenStory] &&
                <ModalComponent liked={this.state.liked}
                  likesHandler={this.likesHandler}
                  story={this.state.listOfStories[this.state.currentOpenStory]}
                  modalClassic={this.state.modalClassic}
                  closeHandler={() => this.setModalClassic(false)}
                />
              }
            </Container>
          </div>
        </div>
      </div>
    )
  }
}

export default ListStories;
