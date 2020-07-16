import React, { Component } from 'react'
import axios from "axios"


// reactstrap components
import { Container } from "reactstrap";
import DOMPurify from "dompurify";



export class ProfilePageHeader extends Component {
  state = {
    user: {}
  }
  componentDidMount() {
    axios.get(`/api/profile-page/${this.props.userId}`).then((resp) => {
      console.log("outPut: ProfilePage -> componentDidMount -> resp", resp.data)
      this.setState({
        user: resp.data
      })
    }).catch((err) => {
      console.log("outPut: ProfilePageHeader -> componentDidMount -> err", err)
    })
  }
  pageHeader = React.createRef();
  render() {
    return (
      <div>
        <>
          <div
            className="page-header clear-filter page-header-small"
            filter-color="blue"
          >
            <div
              className="page-header-image"
              style={{
                // backgroundImage: "url(" + require("assets/img/bg5.jpg") + ")",
              }}
              ref={this.pageHeader}
            ></div>
            <Container>
              <div className="photo-container">
                <img src={this.state.user.image} alt="..."></img>
                {/* src={this.props.currentUser.image} */}
              </div>
              <h3 className="title">{this.state.user.userName}</h3>
              <p className="category"></p>
              <div className="content">
                <div> <h3 className="title">About </h3>
                  <p>{this.state.user.about}</p>
                </div>
              </div>
            </Container>
          </div>
        </>
      </div>
    )
  }
}
export default ProfilePageHeader
