import React, { Component } from 'react';
import { Button } from 'reactstrap';

export class SingUp extends Component {
    render() {
        return (
            <div>
               <Button className="nav-link btn-link" color='info' size='sm'>Sign Up</Button>
            </div>
        )
    }
}

export default SingUp;