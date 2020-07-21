import React from 'react';
import DOMPurify from 'dompurify';

import {
  Button,
  Modal,
  ModalFooter,
} from "reactstrap";

const ModalComponent = (props) => {
  // console.log('props Story', props.story);
  return (
    <div>
      <Modal
        isOpen={props.modalClassic}
        toggle={() => props.closeHandler()}
      >
        <div className="modal-header justify-content-center clear-filter" filter-color="orange">
          <button
            aria-hidden={true}
            className="close"
            onClick={() => props.closeHandler()}
            type="button"
          >
            <i className="now-ui-icons ui-1_simple-remove"></i>
          </button>
          <img src={props.story.image} alt="" style={{ width: '400px' }} />
        </div>
        <div className="modal-body text-center">
           <h2 className="title title-up">{props.story.title}</h2>
        <div className="modal-body text-center">
          <h6><b>Writen By</b></h6>
          <h4>{props.story.owner.userName ? props.story.owner.userName : props.story.owner.email}</h4>
          <div style={{ height: '100px'}}></div>
          <h4>{props.story.duration}</h4>
          <i className={props.story.icon}></i><h4>{props.story.category}</h4><br />
          {props.story.likes.length ?
            <i className="fa fa-heart fa-lg" style={{ marginRight: '3px' }}></i>
            : <i className="now-ui-icons ui-2_favourite-28" ></i>
          } {props.story.likes.length}
          <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(props.story.content) }} />
          <img src={props.story.owner.image} alt="" style={{ borderRadius: '50%', width: '50px' }} />
          <h5 >{props.story.owner.userName ? props.story.owner.userName : props.story.owner.email}</h5>
        </div>
        <ModalFooter>
          {props.liked ?
            <Button color="success" type="button" onClick={() => { props.likesHandler(props.story._id) }}>
              <i className='fa fa-heart'></i>
            </Button>
            : <Button color="success" type="button" onClick={() => { props.likesHandler(props.story._id) }}>
              <i className="now-ui-icons ui-2_favourite-28 "></i>
            </Button>
          }
          <Button color="danger" onClick={() => props.closeHandler()}><i className="now-ui-icons ui-1_simple-remove"></i></Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}
export default ModalComponent;