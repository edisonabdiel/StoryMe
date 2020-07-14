
import React, { Component } from 'react'
import axios from "axios"



// reactstrap components
import {
  Badge,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Label,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

// core components
import ScrollTransparentNavbar from "components/Navbars/ScrollTransparentNavbar.js";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import FooterBlack from "components/Footers/FooterBlack.js";
import BodyClassName from "react-body-classname";
import ListStories from "components/ListStories"
import ProfilePagePortfolio from './ProfilePagePortfolio';



export class ProfilePage extends Component {
  // const[pills, setPills] = React.useState("1");
  // const[firstFocus, setFirstFocus] = React.useState(false);
  // const[emailFocus, setEmailFocus] = React.useState(false);

  state = {
    isClicked: false,
    visitedProfile: this.props.location.state
  }

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

  render() {
    console.log("outPut: ProfilePage -> this.props.location", this.props.location)

    return (
      <BodyClassName className="profile-page sidebar-collapse">
        <div>
          <ScrollTransparentNavbar updateUser={this.props.updateUser} currentUser={this.props.currentUser} />
          <div className="wrapper" >
            {this.state.visitedProfile
              ? <ProfilePageHeader currentUser={this.state.visitedProfile} />
              : <ProfilePageHeader currentUser={this.props.currentUser} />
            }
            <div className="section">
              <Container >
                <div className="button-container">
                  <Button
                    className="btn-round mr-1"
                    color="info"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="lg"
                  >
                    ReadMe
                </Button>
                  <Button
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
                </UncontrolledTooltip>
                </div>
                {/* <div> <h3 className="title">About me</h3>
                  {/* <h5 className="description text-center">
                    An artist of considerable range, Ryan — the name taken by
                    Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs
                    and records all of his own music, giving it a warm, intimate feel
                    with a solid groove structure. An artist of considerable range.
                  </h5> 
                </div> */}
                <div className="content">
                  <div className="social-description">
                    <h2>26</h2>
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
                {this.state.isClicked ? <ListStories currentUser={this.props.currentUser} profile /> : ""}


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



