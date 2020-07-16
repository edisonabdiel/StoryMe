import React, { Component } from 'react';
import axios from 'axios';
import { Button, ButtonToggle } from 'reactstrap';

export class Logout extends Component {
    logoutHandler = () => {
        axios.post("/api/logout", {})
            // 2xx status code
            .then((resp) => {
                this.props.updateUser(null)
                // this.props.history.push('/login-page')
            })
    }
    render() {
        return (
            <div>
                <div onClick={this.logoutHandler} className="nav-link btn-link" color='primary' size='sm'>Logout</div>
            </div>
        )
    }
}

export default Logout;