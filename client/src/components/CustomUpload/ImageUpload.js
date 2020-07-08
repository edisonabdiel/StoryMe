import React, { Component } from 'react'
import { Button } from "reactstrap";
import defaultAvatar from "assets/img/placeholder.jpg";
import axios from 'axios'


export class ImageUpload extends Component {
  // state = {
  //   imageName: ""
  // }
  fileInput = React.createRef();


  // handleImageChange = (e) => {
  //   let formData = new FormData()
  //   formData.append("imageUrl", e.target.files[0])
  //   axios.post("/api/upload-img", formData).then((res) => {
  //     console.log(res.data)
  //     this.props.setImageHandel(res.data.secure_url)
  //     console.log(res.data.imageName)
  //     this.setState({
  //       imageName: res.data.imageName
  //     })
  //   }).catch((error) => {
  //     console.log("Error!!");
  //     console.log(error.response);
  //   })
  // }

  // handleRemove = () => {
  //   // this.setState({
  //   //   file: null,
  //   // })
  //   const name = (this.state.imageName)
  //   console.log("outPut: ImageUpload -> handleRemove -> name", name)
  //   axios.post(`/api/delete-upload-img/${name}`).then((res) => {
  //     console.log(res)
  //   }).catch((error) => {
  //     console.log("Error!!");
  //     console.log(error.response);
  //   })
  //   console.log(this.props.imageUrl)
  //   this.props.setImageHandel(defaultAvatar)
  //   // this.fileInput.current.value = null
  // };



  handleClick = () => {
    this.fileInput.current.click();
  };

  // componentDidUpdate(prevProps) {
  //   //  to compare props
  //   if (this.props.imageUrl !== prevProps.imageUrl) {
  //     this.setState({
  //       imageUrl: this.props.imageUrl
  //     })
  //   }
  // }

  render() {
    return (
      <div className="fileinput text-center">
        <input type="file" name="imageUrl" onChange={(e) => this.props.handleImageChange(e)} ref={this.fileInput} />
        <div
          className={
            "fileinput-new thumbnail img-raised" +
            (this.props.avatar ? " img-circle" : "")
          }
        >
          <img src={this.props.storyImageUrl} alt="image" />
        </div>
        <div>
          {this.props.storyImageUrl === defaultAvatar ? (
            <Button className="btn-round" color="default" onClick={this.handleClick}>
              {this.props.avatar ? "Add Photo" : "Select image"}
            </Button>
          ) : (
              <span>
                <Button className="btn-round" color="default" onClick={this.handleClick}>
                  Change
            </Button>
                {this.props.avatar ? <br /> : null}
                <Button color="danger" className="btn-round" onClick={this.props.handleImageRemove}>
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




