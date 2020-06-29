import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';



export class ConfirmationPage extends Component {
    state = {
        loading: true,

    }

    componentDidMount() {
        const token = this.props.match.params.token
        console.log("outPut: ConfirmationPage -> componentDidMount -> token", token)
        axios.get(`/api/confirmation/${token}`).then((resp) => {
            console.log("front end res.data", resp.data)
            this.props.updateUser(resp.data)
            this.setState({
                loading: false
            })
        })
    }
    render() {
        return (
            <div>
                <h1>confirmation page</h1>
                {this.state.loading
                    ? <h1>LOADING ....</h1>
                    : <Link to='/'>
                        Go back to .....
                    </Link>
                }
            </div>
        )
    }
}

export default ConfirmationPage
