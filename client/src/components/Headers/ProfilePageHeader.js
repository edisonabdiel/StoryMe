import React, { Component } from 'react'
// reactstrap components
import { Container } from "reactstrap";
// import defaultAvatar from "assets/img/placeholder.jpg";




export class ProfilePageHeader extends Component {


  pageHeader = React.createRef();
  render() {
    return (
      <div>
        <>
          <div
            className="page-header page-header-small"
            filter-color="blue"
          >
            <div
              className="page-header-image"
              style={{
                backgroundImage: `url(${this.props.user.bgImage})`,
              }}
              ref={this.pageHeader}
            ></div>
            <Container>
              <div className="photo-container">
                <img src={this.props.user.image} alt="..."></img>
              </div>
              <h3 className="title">{this.props.user.userName}</h3>
              <p className="category"></p>
              <div className="content">
                <div><h3 className="title">About </h3>
                  <p><b>{this.props.user.about}</b></p>
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
