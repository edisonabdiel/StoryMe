import React from 'react';
import DOMPurify from 'dompurify';

import {
  Button,
  Modal,
  ModalFooter,
} from "reactstrap";

const ModalComponent = (props) => {
  return (
    <div>
      <Modal
        isOpen={props.modalClassic}
        toggle={() => props.closeHandler()}
      >
        <div className="modal-header justify-content-center"
          style={{
            backgroundImage: `url(${props.story.image})`, height: '500px'
          }} filter-color="blue"
        >
          <button
            aria-hidden={true}
            className="close"
            onClick={() => props.closeHandler()}
            type="button"
          >
            <i className="now-ui-icons ui-1_simple-remove"></i>
          </button>
        </div>
        <div className="modal-body text-center">
          <h2 className="title title-up">{props.story.title}</h2>
        </div>
        <div className="modal-body text-center">
          <h6><b>Writen By</b></h6>
          <img src={props.story.owner.image} alt="" style={{ borderRadius: '50%', width: '50px' }} />
          <h4>{props.story.owner.userName ? props.story.owner.userName : props.story.owner.email}</h4>
          <div style={{ height: '100px' }}></div>
          <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(props.story.content) }} />
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