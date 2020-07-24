import React, { Component } from 'react';
import axios from 'axios';
// import { Button } from 'reactstrap';

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
            <div onClick={this.logoutHandler} style={{ color: '#e13e20', textAlign: 'center', fontSize: '16px' }} className='div-log' >
                Logout
            </div>
        )
    }
}

export default Logout;