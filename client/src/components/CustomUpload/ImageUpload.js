import React, { Component } from 'react'
import { Button } from "reactstrap";
import defaultAvatar from "assets/img/placeholder.jpg";


export class ImageUpload extends Component {

  fileInput = React.createRef();

  handleClick = () => {
    this.fileInput.current.click();
  };

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




