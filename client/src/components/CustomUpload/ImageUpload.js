import React, { Component } from 'react'
// used for making the prop types of this component
import PropTypes from "prop-types";

import { Button } from "reactstrap";

import defaultAvatar from "assets/img/placeholder.jpg";
import axios from 'axios'




export class ImageUpload extends Component {
  state = {
    file: null,
    imageUrl: this.props.imageUrl
  }
  fileInput = React.createRef();

  handleImageChange = (e) => {
    let formData = new FormData()
    formData.append("imageUrl", e.target.files[0])
    axios.post("/api/upload-img", formData).then((res) => {
      console.log("outPut: ImageUpload -> handleImageChange -> res", res.data.secure_url)
      this.setState({ imageUrl: res.data.secure_url })


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
      imageUrl: defaultAvatar
    })
    this.fileInput.current.value = null
  };
  handleClick = () => {
    this.fileInput.current.click();
  };
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
          <img src={this.state.imageUrl} alt="..." />
        </div>
        <div>
          {this.state.imageUrl === defaultAvatar ? (
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




