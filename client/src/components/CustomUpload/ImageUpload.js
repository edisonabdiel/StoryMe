import React, { Component } from 'react'
// used for making the prop types of this component
import PropTypes from "prop-types";

import { Button } from "reactstrap";

import defaultAvatar from "assets/img/placeholder.jpg";
import axios from 'axios'




export class ImageUpload extends Component {
  state = {
    file: null
  }
  fileInput = React.createRef();


  handleImageChange = (e) => {
    let formData = new FormData()
    formData.append("imageUrl", e.target.files[0])
    axios.post("/api/upload-img", formData).then((res) => {
      this.props.setImageHandel(res.data.secure_url)
    }).catch((error) => {
      console.log("Error!!");
      console.log(error.response);
      // this.setState({
      //     errorMessage: error.response.data.message
      // })
    })
  }

  handleRemove = () => {
    this.setState({
      file: null,
    })
    this.props.setImageHandel(defaultAvatar)
    this.fileInput.current.value = null
  };



  handleClick = () => {
    this.fileInput.current.click();
  };

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.imageUrl !== prevProps.imageUrl) {
      this.setState({
        imageUrl: this.props.imageUrl
      })
    }
  }

  render() {
    return (
      <div className="fileinput text-center">
        <input type="file" name="imageUrl" onChange={this.handleImageChange} ref={this.fileInput} />
        <div
          className={
            "fileinput-new thumbnail img-raised" +
            (this.props.avatar ? " img-circle" : "")
          }
        >
          <img src={this.props.imageUrl} alt="..." />
        </div>
        <div>
          {this.props.imageUrl === defaultAvatar ? (
            <Button className="btn-round" color="default" onClick={this.handleClick}>
              {this.props.avatar ? "Add Photo" : "Select image"}
            </Button>
          ) : (
              <span>
                <Button className="btn-round" color="default" onClick={this.handleClick}>
                  Change
            </Button>
                {this.props.avatar ? <br /> : null}
                <Button color="danger" className="btn-round" onClick={this.handleRemove}>
                  <i className="fa fa-times" /> Remove
            </Button>
              </span>
            )}
        </div>
      </div>
    );
  }
}

export default ImageUpload




