import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Link } from "react-router-dom";

export class Login extends Component {
    render() {
        return (
            <div>
               <Button className="nav-link btn-link" color='success' size='sm'>Login</Button>
            </div>
        )
    }
}

export default Login;