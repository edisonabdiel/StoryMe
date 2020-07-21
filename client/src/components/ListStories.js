import React, { Component } from 'react';
import axios from 'axios';
import ModalComponent from './ModalComponent';
import CardComponent from './CardComponent';
import LoginButton from './LoginButton';
import EmailVerificationModal from './EmailVerificationModal';


// reactstrap components
import {
  Container,
} from "reactstrap";




// <ListStories loggedInUser= {}
class ListStories extends Component {

  state = {
    listOfStories: [],
    modalClassic: false,
    liked: false,
    currentOpenStory: 0,
    modalLogin: false,
    emailVerification: false
  }

  componentDidMount() {
    if (this.props.profileStories && this.props.currentUser) {
      axios.get(`/api/profileStories/${this.props.userId}`).then((resp) => {
        this.setState({
          listOfStories: resp.data
        })
      })
    }
    else if (this.props.isDiscovery && this.props.currentUser) {
      axios.get(`/api/stories/filter`).then((resp) => {
        this.setState({
          listOfStories: resp.data
        })
      })
    } 
    else if (this.props.profileLikes && this.props.currentUser) {
      axios.get(`/api/stories/${this.props.currentUser._id}/liked`)
        .then((resp) => {
          this.setState({
            listOfStories: resp.data
          })
        })
    } else {
      axios.get("/api/stories").then((resp) => {
        this.setState({
          listOfStories: resp.data
        })
      })
    }
  }

  deleteHandler = (storyID) => {
    axios.delete('/api/stories/' + storyID).then(() => {
      this.setState({
        listOfStories: this.state.listOfStories.filter(p => p._id !== storyID)
      })
    })
  }
  editHandler = (storyID) => {
    this.setState({
      listOfStories: this.state.listOfStories.filter(p => p._id === storyID)
    })
  }
  setModalClassic = (bool) => {
      this.setState({
        modalClassic: bool
      })
  }
  setModalLogin = (bool) => {
    this.setState({
      modalLogin: bool
    })
    if (!bool) {
      axios.get(`/api/stories/filter`).then((resp) => {
        this.setState({
          listOfStories:resp.data,
        })
      })
    } 
  }
  setModalVerification = (bool) => {
    this.setState({
      emailVerification: bool
    })
  }

  likesHandler = (storyID) => {
    axios.put(`/api/stories/${storyID}/liked`)
      .then((resp) => {
        const currentStory = resp.data
        let newList = [...this.state.listOfStories]
        let idx = this.state.listOfStories.findIndex(story => story._id === currentStory._id)
        newList.splice(idx, 1, currentStory)  
        this.setState({
          liked: currentStory.likes.includes(this.props.currentUser._id),
          listOfStories: newList
        })
      })
  }
  saveStoryIndex = (position) => {
    if (this.props.currentUser) {
      this.setState({
        currentOpenStory: position,
        liked: this.state.listOfStories[position].likes.includes(this.props.currentUser._id)
      })
    }
  }
  changeStateHandler = (id) => {
    this.props.changeStateHandler(id)

  }

  render() {
    return (
      <div>
        <div
          className="justify-content-evenly "
          id="cards"
        >
          <div className="cards">
            <Container >
              <div className="title">
              </div>
              <CardComponent listOfStories={this.state.listOfStories}
                saveStoryIndex={this.saveStoryIndex}
                currentUser={this.props.currentUser}
                editHandler={this.editHandler}
                deleteHandler={this.deleteHandler}
                setModalClassic={this.setModalClassic}
                setModalLogin={this.setModalLogin}
                isDiscovery={this.props.isDiscovery}
                setModalVerification={this.setModalVerification}
                changeStateHandler={this.changeStateHandler}
                profileStories={this.props.profileStories}
                profileLikes={this.props.profileLikes}
                isDiscovery={this.props.isDiscovery}
              />
              {this.state.listOfStories && this.state.listOfStories[this.state.currentOpenStory] &&
                <ModalComponent liked={this.state.liked}
                  likesHandler={this.likesHandler}
                  story={this.state.listOfStories[this.state.currentOpenStory]}
                  modalClassic={this.state.modalClassic}
                  closeHandler={() => this.setModalClassic(false)}
                />
              }
              <LoginButton modalLogin={this.state.modalLogin}
                setModalLogin={this.setModalLogin}
                updateUser={this.props.updateUser}
                history={this.props.history}
                currentUser={this.props.currentUser} />
            </Container>
            <EmailVerificationModal modalVerification={this.state.emailVerification} setModalVerification={this.setModalVerification} />
          </div>
        </div>
      </div>
    )
  }
}

export default ListStories;
