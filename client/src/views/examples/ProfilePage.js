
import React, { Component } from 'react'
import axios from "axios"
import { BsFillPersonPlusFill, BsFillPersonDashFill } from "react-icons/bs";
import { IconContext } from "react-icons";
// core components
import ScrollTransparentNavbar from "components/Navbars/ScrollTransparentNavbar.js";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import FooterBlack from "components/Footers/FooterBlack.js";
import BodyClassName from "react-body-classname";
import ListStories from "components/ListStories";
import ProfilePagePortfolio from './ProfilePagePortfolio';


// reactstrap components
import {
  Button,
  Container,
} from "reactstrap";

export class ProfilePage extends Component {

  state = {
    isClickedStories: false,
    isClickedLikes: false,
    userId: this.props.match.params.id,
    user: '',
    following: [],
    followers: [],
    emailVerification: false
  }

  componentDidMount() {

    console.log('did mount');
    axios.get(`/api/profile-page/${this.props.match.params.id}`).then((resp) => {
      console.log('follow response:', resp.data.user)
      console.log("outPut: ProfilePage -> componentDidMount -> resp", resp.data)
      this.setState({
        user: resp.data.user,
        following: resp.data.following,
        followers: resp.data.user.followers.map((follower) => follower._id),
        userId: resp.data.user._id,
      })
    }).catch((err) => {
      console.log("outPut: ProfilePage -> componentDidMount -> err", err)

    })

  }

  // to change the user and user id when coming from another profile page
  changeStateHandler = (id) => {
    axios.get(`/api/profile-page/${id}`).then((resp) => {
      console.log('follow response:', resp.data.user)
      console.log("outPut: ProfilePage -> change state handler -> resp", resp.data)
      this.setState({
        user: resp.data.user,
        following: resp.data.following,
        followers: resp.data.user.followers.map((follower) => follower._id),
        userId: resp.data.user._id,
        isClickedStories: false,
        isClickedLikes: false
      })
    }).catch((err) => {
      console.log("outPut: ProfilePage -> componentDidMount -> err", err)
    })
  }

  //to open/close the portfolio btn 
  handelIsClickedStories = () => {
    this.setState({
      isClickedStories: !this.state.isClickedStories
    })
  }

  handelToCloseStories = (bool) => {
    this.setState({
      isClickedStories: bool
    })
  }
  handelIsClickedLikes = () => {
    this.setState({
      isClickedLikes: !this.state.isClickedLikes
    })
  }

  handelToCloseLikes = (bool) => {
    this.setState({
      isClickedLikes: bool
    })
  }

  // to handel the follow function
  followingHandler = () => {
    axios.put(`/api/user/${this.state.userId}/follow`)
      .then((resp) => {
        console.log('follow response:', resp)
        // this.props.updateUser(resp.data)
        this.setState({
          user: resp.data,
          followers: resp.data.followers.map((follower) => follower._id),
        })
      }).catch((err) => {
        console.log("outPut: followingHandler -> err", err)

      })
  }

  render() {
    console.log("outPut: ProfilePage -> userId ", this.state.userId)
    console.log("outPut: ProfilePage -> current user ", this.props.currentUser)
    console.log("outPut: ProfilePage ->  user id ", this.props.match.params.id)
    console.log("outPut: ProfilePage ->  user  followers", this.state.followers)
    // question to ask ?????
    // console.log(this.state.user.followers.map((follow) => follow._id))
    console.log(this.state.user._id)


    return (
      <BodyClassName className="profile-page sidebar-collapse" >
        <div onClick={this.emailVerification}>
          <ScrollTransparentNavbar updateUser={this.props.updateUser}
            currentUser={this.props.currentUser}
            changeStateHandler={this.changeStateHandler}
            profilePageNav />
          <div className="wrapper" >

            <ProfilePageHeader userId={this.state.userId} user={this.state.user} />

            <div className="section">
              <Container >
                <div className="button-container">
                  {/* follow btn */}
                  <Button
                    className="btn-round mr-1"
                    color="info"
                    onClick={() => { this.followingHandler() }}
                    size="lg"
                  >
                    {!this.state.followers.includes(this.props.currentUser._id)
                      ? <IconContext.Provider value={{ size: "2em" }}> <BsFillPersonPlusFill /> </IconContext.Provider>
                      : <IconContext.Provider value={{ size: "2em" }}><BsFillPersonDashFill /></IconContext.Provider>}
                  </Button>
                </div>
                <div className="content" style={{ textAlign: 'center' }}>
                  <div className="social-description">
                    <h2>{this.state.user && this.state.user.followers.length}</h2>
                    <p>Followers</p>
                  </div>
                  <div className="social-description">
                    <h2>
                      {this.state.following && this.state.following.length}
                    </h2>
                    <p>Following</p>
                  </div>
                  {/* <div className="social-description">
                    <h2>48</h2>
                    <p>Bookmarks</p>
                  </div> */}
                </div>
                <ProfilePagePortfolio handelIsClickedStories={this.handelIsClickedStories}
                  handelToCloseStories={this.handelToCloseStories}
                  handelIsClickedLikes={this.handelIsClickedLikes}
                  handelToCloseLikes={this.handelToCloseLikes}
                  currentUser={this.props.currentUser}
                  userId={this.state.userId}
                />
                {this.state.isClickedStories && <ListStories profileStories isDiscovery={false} currentUser={this.props.currentUser} userId={this.state.userId} changeStateHandler={this.changeStateHandler} />}
                {this.state.isClickedLikes && <ListStories profileLikes isDiscovery={false} currentUser={this.props.currentUser} changeStateHandler={this.changeStateHandler} />}
              </Container>
            </div>
            <FooterBlack />
          </div>
        </div>
      </BodyClassName>
    )
  }
}

export default ProfilePage



