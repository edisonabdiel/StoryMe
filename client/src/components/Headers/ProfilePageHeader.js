import React, { Component } from 'react'
// reactstrap components
import { Container } from "reactstrap";
// import defaultAvatar from "assets/img/placeholder.jpg";




export class ProfilePageHeader extends Component {


  pageHeader = React.createRef();
  render() {
    console.log('header user', this.props.user);
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
                backgroundImage: `url(${this.props.user.bgImage}`,
              }}
              ref={this.pageHeader}
            ></div>
            <Container>
              <div className="photo-container">
                <img src={this.props.user.image} alt="..."></img>
                {/* src={this.props.currentUser.image} */}
              </div>
              <h3 className="title">{this.props.user.userName}</h3>
              <p className="category"></p>
              <div className="content">
                <div> <h3 className="title">About </h3>
                  <p>{this.props.user.about}</p>
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
