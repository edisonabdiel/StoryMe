import React, { Component } from 'react';
import axios from 'axios'

export class Logout extends Component {
    logoutHandler = () => {
        axios.post("/api/logout", {})
            // 2xx status code
            .then((resp) => this.props.updateUser(null))
    }
    render() {
        return (
            <div>
                <button onClick={this.logoutHandler}>Logout</button>
            </div>
        )
    }
}

export default Logout;