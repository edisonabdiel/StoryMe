import React, { Component } from 'react'
import { Button } from "reactstrap";
import defaultAvatar from "assets/img/placeholder.jpg";


import {
  Modal,
  ModalFooter,
} from "reactstrap";


export class ImageUpload extends Component {
  state = {
    modalOpen: false

  }

  fileInput = React.createRef();

  handleClick = () => {
    console.log(this.fileInput.current)
    this.fileInput.current.click();
  };

  handelRemove = () => {
    this.setState({ modalOpen: false });
    this.props.handleImageRemove()
    this.fileInput.current.value = null;

  }

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
          <img src={this.props.imageUrl} alt="" />
        </div>
        <div className='btn-block text-center'>
          {this.props.imageUrl === defaultAvatar ? (
            <Button className="btn-morphin btn-round" size='sm' color="info" onClick={this.handleClick}>
              {this.props.avatar ? "Profile Photo" : "Story Cover"}
            </Button>
          ) : (
              <span>
                <Button className="btn-morphing btn-info" size='sm' onClick={() => { this.handleClick() }}>
                  Change
            </Button>
                {this.props.avatar ? <br /> : null}
                <Button color="danger" className="btn-morphing btn-info" size='sm' onClick={() => this.setState({ modalOpen: true })}>
                  <i className="fa fa-times" /> Remove
            </Button>
              </span>
            )}
          <Modal
            modalClassName="modal-mini modal-warning"
            isOpen={this.state.modalOpen}
            toggle={() => this.setState({ modalOpen: false })}
          >
            <div className="modal-header justify-content-center">
              {/* <div className="modal-profile"> */}
              <i className="fas fa-minus-circle fa-3x"></i>
              {/* </div> */}
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete the image?</p>
            </div>
            <ModalFooter>
              <Button className="btn-neutral" color="neutral" onClick={this.handelRemove}>
                Delete
                </Button>
              <Button
                className="btn-neutral"
                color="neutral"
                onClick={() => this.setState({ modalOpen: false })}
              >
                Cancel
                </Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    );
  }
}

export default ImageUpload;




