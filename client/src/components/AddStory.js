// components/projects/AddProject.js

import React, { Component } from 'react';
import axios from 'axios';


class AddStory extends Component {
    state = {
        title: '',
        image: '',
        headline: '',
        category: '',
        text: '',
        // likes: '',
        duration: ''
    }

    //you can use for every input field
    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleFormSubmit = (event) => {
        event.preventDefault();

        const title = this.state.title;
        const image = this.state.image;
        const headline = this.state.headline;
        const category = this.state.category;
        const text = this.state.text;
        // const likes = this.state.likes;
        const duration = this.state.duration;

        axios.post("/api/stories", { title, image, headline, category, text, duration })
            .then((resp) => {
                // this.props.getData();
                console.log('Add Strory response: ', resp);
                this.props.addNewStory(resp.data)
                this.setState({
                    title: "",
                    image: "",
                    headline: "",
                    category: "",
                    text: "",
                    likes: "",
                    duration: ""
                });
            })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleFormSubmit}>
                    <label>Title:</label>
                    <input type="text" name="title" value={this.state.title} onChange={this.handleChange} />
                    {/* <label>Image:</label>
                    <img src="" alt="Uploaded-image"/> */}
                    <label>Headline:</label>
                    <input type="text" name="headline" value={this.state.headline} onChange={this.handleChange} />
                    <label>Text:</label>
                    <textarea name="text" value={this.state.text} onChange={this.handleChange} />

                    <button type="submit" value="Submit" > Submit</button>
                </form>
            </div>
        )
    }
}

export default AddStory;