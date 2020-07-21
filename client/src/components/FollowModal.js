import React from 'react';
import { BsFillPersonPlusFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import {
    Button,
    Modal,
    ModalFooter,
    Container,
    Row,
    Col,
    Card
} from "reactstrap";

const FollowModal = (props) => {
    return (
        <div >
            <Container>
                <Row id="modals">
                    <Col md="6">
                        <Modal
                            className="modal-login"
                            modalClassName=" modal-info"
                            isOpen={props.isClickedFollow}
                            toggle={() => props.setIsClickedFollow(false)}
                        >
                            <Card
                                className="card-login card-plain"
                                data-background-color=""
                            >
                                <div className="modal-header justify-content-center">
                                    <button
                                        aria-hidden={true}
                                        className="close"
                                        onClick={() => props.setIsClickedFollow(false)}
                                        type="button"
                                    >
                                        <i className="now-ui-icons ui-1_simple-remove"></i>
                                    </button>
                                    <div className="header header-info text-center">
                                        <div className="logo-container">
                                            <IconContext.Provider value={{ size: "2em" }}><BsFillPersonPlusFill /></IconContext.Provider>                                        </div>
                                    </div>
                                </div>
                                {props.data.map((follower) => {
                                    return (<div className="modal-body modal-flex" style={{ textAlign: 'center' }} key={follower._id}>
                                        <img src={follower.image} alt='...' className='follower-image' />
                                        <h3>{follower.userName}</h3>
                                    </div>)

                                })}
                                <ModalFooter>
                                    <Button
                                        className="btn-neutral"
                                        color="neutral"
                                        onClick={() => props.setIsClickedFollow(false)}
                                    >
                                        OK
                                            </Button>
                                </ModalFooter>
                            </Card>
                        </Modal>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default FollowModal;

// /*eslint-disable*/
// import React from "react";
// import { BsExclamationCircle } from "react-icons/bs";
// import { IconContext } from "react-icons";



// // reactstrap components
// import {
//     Button,
//     Card,
//     Container,
//     Row,
//     Col,
//     Modal,
//     ModalFooter,
// } from "reactstrap";

// class LoginButton extends React.Component {

//     render() {
//         return (
//             <div className="section section-javascript" id="javascriptComponents">
//                 <Container>
//                     <Row id="modals">
//                         <Col md="6">
//                             <Modal
//                                 className="modal-login"
//                                 modalClassName=" modal-primary"
//                                 isOpen={this.props.modalVerification}
//                                 toggle={() => this.props.setModalVerification(false)}
//                             >
//                                 <Card
//                                     className="card-login card-plain"
//                                     data-background-color=""
//                                 >
//                                     <div className="modal-header justify-content-center">
//                                         <button
//                                             aria-hidden={true}
//                                             className="close"
//                                             onClick={() => this.props.setModalVerification(false)}
//                                             type="button"
//                                         >
//                                             <i className="now-ui-icons ui-1_simple-remove"></i>
//                                         </button>
//                                         <div className="header header-info text-center">
//                                             <div className="logo-container">
//                                                 <IconContext.Provider value={{ size: "2em" }}> <BsExclamationCircle /> </IconContext.Provider>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="modal-body" style={{ textAlign: 'center' }}>
//                                         <h3>Please verify your email first</h3>
//                                         <ModalFooter>
//                                             <Button
//                                                 className="btn-neutral"
//                                                 color="neutral"
//                                                 onClick={() => this.props.setModalVerification(false)}
//                                             >
//                                                 OK
//                                             </Button>
//                                         </ModalFooter>
//                                     </div>
//                                 </Card>
//                             </Modal>
//                         </Col>
//                     </Row>
//                 </Container>
//             </div>
//         )
//     }

// }

// export default LoginButton;