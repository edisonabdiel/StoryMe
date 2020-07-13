import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'reactstrap';

export class Logout extends Component {
    logoutHandler = () => {
        axios.post("/api/logout", {})
            // 2xx status code
            .then((resp) => {
                this.props.updateUser(null)
            })
    }
    render() {
        return (
            <div>
                <Button onClick={this.logoutHandler} className="nav-link btn-link" color='primary' size='sm'>Logout</Button>
            </div>
        )
    }
}

export default Logout;