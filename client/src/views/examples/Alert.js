import React, { Component } from 'react'
import {
    Container,
    Alert
} from "reactstrap";

export class AlertMessage extends Component {

    render() {
        return (
            <div>
                <Alert color={this.props.color} isOpen={this.props.alertBool}>
                    <Container>
                        <div className="alert-icon">
                            {this.props.color === 'danger'
                                ? <i className="now-ui-icons objects_support-17"></i>
                                : <i className="now-ui-icons ui-2_like"></i>

                            }
                        </div>
                        {this.props.message}
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
