import React, { Component } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

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
            <h2>{this.state.story.title}</h2>
            <h2>{this.state.story.headline}</h2>
            <h2>{this.state.story.text}</h2>
            </div>
        )
    }
}
export default StoryDetails;