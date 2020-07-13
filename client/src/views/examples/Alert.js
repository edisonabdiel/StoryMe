import React, { Component } from 'react'
import {
    Container,
    Alert
} from "reactstrap";

export class AlertMessage extends Component {
    // state = {
    //     alertBool: true
    // }
    render() {
        return (
            <div>
                <Alert color={this.props.color} isOpen={this.props.alertBool}>
                    <Container>
                        <div className="alert-icon">
                            <i className="now-ui-icons ui-2_like"></i>
                        </div>
                        {this.props.successMessage}
                        <button
                            type="button"
                            className="close"
                            onClick={this.props.setAlertBool}
                        >
                            <span aria-hidden="true">
                                <i className="now-ui-icons ui-1_simple-remove"></i>
                            </span>
                        </button>
                    </Container>
                </Alert>
            </div>
        )
    }
}

export default AlertMessage
