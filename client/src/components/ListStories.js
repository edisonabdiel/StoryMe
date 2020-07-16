import React, { Component } from 'react';
import axios from 'axios';
import ModalComponent from './ModalComponent';
import CardComponent from './CardComponent';
import LoginButton from './LoginButton';

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
    currentOpenStory: 0,
    modalLogin: false
  }


  componentDidMount() {

    this.props.profile
      ? axios.get(`/api/profileStories/${this.props.userId}`).then((resp) => {
        this.setState({
          listOfStories: resp.data
        })
      })
      : axios.get(`/api/stories/filter/${this.props.userId}`).then((resp) => {
        console.log('Response Data', resp.data);
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
  setModalLogin = (bool) => {
    this.setState({
      modalLogin: bool
    })
  }

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
    if(this.props.currentUser){
      this.setState({
        currentOpenStory: position,
        liked: this.state.listOfStories[position].likes.includes(this.props.currentUser._id)
      })
    }
    
    

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
                setModalLogin={this.setModalLogin}
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
              <LoginButton modalLogin={this.state.modalLogin} setModalLogin={this.setModalLogin} updateUser={this.props.updateUser} history={this.props.history} currentUser={this.props.currentUser}/>
            </Container>
          </div>
        </div>
      </div>
    )
  }
}

export default ListStories;
