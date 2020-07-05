import React, { Component } from 'react';
import axios from 'axios';

class EditStory extends Component {
    state = {
        title:''
    }

    componentDidMount() {
        axios.get(`/api/stories/${this.props.match.params.id}`).then((resp) => {
            console.log('Response edit:',resp.data);
            this.setState({
                title: resp.data.title
            })
        })
    }

    handleFormSubmit = (event) => {
        const title = this.state.title;

        event.preventDefault();

        axios.put(`/api/stories/${this.props.match.params.id}`, { title })
            .then(() => {
                this.setState({
                    title: this.state.title
                })
            })
            .catch(error => console.log(error))
    }

    handleChangeTitle = (event) => {
        this.setState({
            title: event.target.value
        })
    }

    //   handleChangeDesc = (event) => {  
    //     this.setState({
    //       description:event.target.value
    //     })
    //   }

    render() {
        return (
            <div>
                <hr />
                <h3>Edit form</h3>
                <form onSubmit={this.handleFormSubmit}>
                    <label>Title:</label>
                    <input type="text" name="title" value={this.state.title} onChange={e => this.handleChangeTitle(e)} />
                    {/* <label>Description:</label>
          <textarea name="description" value={this.state.description} onChange={e => this.handleChangeDesc(e)} /> */}

                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}

export default EditStory;