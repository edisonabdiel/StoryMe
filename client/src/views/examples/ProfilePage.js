
import React, { Component } from 'react'
import axios from "axios"



// reactstrap components
import {
  Button,
  Container,
  UncontrolledTooltip,
} from "reactstrap";

// core components
import ScrollTransparentNavbar from "components/Navbars/ScrollTransparentNavbar.js";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import FooterBlack from "components/Footers/FooterBlack.js";
import BodyClassName from "react-body-classname";
import ListStories from "components/ListStories";
import ProfilePagePortfolio from './ProfilePagePortfolio';



export class ProfilePage extends Component {

  state = {
    isClicked: false,
    userId: this.props.match.params.id,
    user: ''
  }

  componentDidMount() {
    this.setState({
      userId: this.props.match.params.id
    })
    console.log('did mount');
    axios.get(`/api/profile-page/${this.props.match.params.id}`).then((resp) => {

      console.log("outPut: ProfilePage -> componentDidMount -> resp", resp.data)
      this.setState({
        user: resp.data
      })
    }).catch((err) => {
      console.log("outPut: ProfilePage -> componentDidMount -> err", err)

    })

  }

  // to change the user and user id when coming from another profile page
  changeStateHandler = () => {
    this.setState({
      userId: this.props.currentUser._id,
      user: this.props.currentUser,
      isClicked: false
    })
  }

  //to open/close the portfolio btn 
  handelIsClicked = () => {
    this.setState({
      isClicked: !this.state.isClicked
    })
  }

  handelToClose = (bool) => {
    this.setState({
      isClicked: bool
    })
  }

  // to handel the follow function
  followingHandler = () => {
    axios.put(`/api/user/${this.state.userId}/follow`)
      .then((resp) => {
        console.log('follow response:', resp.data);
        this.setState({
          user: resp.data
        })
      }).catch((err) => {
        console.log("outPut: followingHandler -> err", err)

      })
  }

  render() {
    console.log("outPut: ProfilePage -> userId ", this.state.userId)
    console.log("outPut: ProfilePage -> current user ", this.props.currentUser)
    console.log("outPut: ProfilePage ->  user id ", this.props.match.params.id)
    console.log("outPut: ProfilePage ->  user ", this.state.user)

    return (
      <BodyClassName className="profile-page sidebar-collapse" >
        <div>
          <ScrollTransparentNavbar updateUser={this.props.updateUser} currentUser={this.props.currentUser} changeStateHandler={this.changeStateHandler} profilePageNav />
          <div className="wrapper" >

            <ProfilePageHeader userId={this.state.userId} user={this.state.user} />

            <div className="section">
              <Container >
                <div className="button-container">
                  <Button
                    className="btn-round mr-1"
                    color="info"
                    onClick={this.followingHandler}
                    size="lg"
                  >
                    ReadMe
                </Button>
                  {/* <Button
                    className="btn-round btn-icon mr-1"
                    color="default"
                    href="#pablo"
                    id="tooltip871723210"
                    onClick={(e) => e.preventDefault()}
                    size="lg"
                  >
                    <i className="fab fa-twitter"></i>
                  </Button>
                  <UncontrolledTooltip delay={0} target="tooltip871723210">
                    Follow me on Twitter
                </UncontrolledTooltip>
                  <Button
                    className="btn-round btn-icon"
                    color="default"
                    href="#pablo"
                    id="tooltip259363830"
                    onClick={(e) => e.preventDefault()}
                    size="lg"
                  >
                    <i className="fab fa-instagram"></i>
                  </Button>
                  <UncontrolledTooltip delay={0} target="tooltip259363830">
                    Follow me on Instagram
                  </UncontrolledTooltip> */}
                </div>
                <div className="content">
                  <div className="social-description">
                    <h2>{this.state.user && this.state.user.followers.length}</h2>
                    <p>Followers</p>
                  </div>
                  <div className="social-description">
                    <h2>26</h2>
                    <p>Following</p>
                  </div>
                  <div className="social-description">
                    <h2>48</h2>
                    <p>Bookmarks</p>
                  </div>
                </div>


                <ProfilePagePortfolio handelIsClicked={this.handelIsClicked} handelToClose={this.handelToClose} />
                {this.state.isClicked && <ListStories profile currentUser={this.props.currentUser} userId={this.state.userId} />}



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



