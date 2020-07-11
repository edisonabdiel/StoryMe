import React from 'react';

import {
    Button,
    Modal,
    ModalFooter,
  } from "reactstrap";
import { clearConfig } from 'dompurify';
  
const ModalComponent=(props)=>{
    return(
        <div>
        {console.log('Props Stroy', props.story)}
            <Modal
                  isOpen={props.modalClassic}
                  toggle={() => props.closeHandler()}
                  style={{ width: '80% !important' }}
                >
                {/* <ModalComponent likesHandler={this.likesNum} story={this.state.listOfStories[this.state.currentOpenStory]} closeHandler={() => this.setModalClassic(false)}></ModalComponent> */}
                  <div className="modal-header justify-content-center">
                    <button
                      aria-hidden={true}
                      className="close"
                      onClick={() => props.closeHandler()}
                      type="button"
                    >
                      <i className="now-ui-icons ui-1_simple-remove"></i>
                    </button>
                    <h4 className="title title-up">{props.story.title}</h4>
                  </div>
                  <div className="modal-body">
                    <h5 style={{ textDecoration: 'underline' }}>{props.story.o}</h5>
                    <p>{props.story.content}</p>
                  </div>
                  <ModalFooter>
                    {props.liked ?
                      <Button color="success" type="button" onClick={() => { props.likesHandler(props.story._id) }}>
                        
                      
                        <i className='fa fa-heart'></i>
                      </Button>
                      : <Button color="success" type="button" onClick={() => { props.likesHandler(props.story._id) }}>
                        <i className="now-ui-icons ui-2_favourite-28 "></i>
                      </Button>}
                    <Button color="danger" onClick={() => props.closeHandler()}>
                      Close
                              </Button>
                  </ModalFooter>
                </Modal>
        </div>
    )
}
export default ModalComponent;