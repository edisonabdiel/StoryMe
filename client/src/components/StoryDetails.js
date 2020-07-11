import React, { Component } from 'react';
import axios from 'axios';


class StoryDetails extends Component{
    state={
       story:''
    }
    
    componentDidMount(){
        axios.get(`/api/stories/${this.props.match.params.id}`)
        .then(resp => {
            console.log('Details response',resp);
            this.setState({
                story:resp.data
            })
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    render(){
        console.log(this.state.story);
        return(
            <div>
            <h1>Welcome to StoryDetails page</h1>
            <h2>title:</h2>
            <h3>{this.state.story.title}</h3>
            <h2>Image</h2>
            <img src={this.state.story.image} alt="story ilustration"/>
            <h2>Icon:</h2>
            <i className={this.state.story.icon}></i>
            <h2>Category:</h2>
            <h3>{this.state.story.category}</h3>
            <h2>Headline:</h2>
            <h3>{this.state.story.headline}</h3>
            <h2>Content</h2>
            <h3>{this.state.story.content}</h3>
            <h2>Duration:</h2>
            <h3>{this.state.story.duration}</h3>
            </div>
        )
    }
}
export default StoryDetails;