import React, { Component } from 'react';
import axios from 'axios';
import DOMPurify from 'dompurify'
import EditFixedNavbar from './Navbars/EditFixedNavbar';
import StoryDetailsHeader from './Headers/StoryDetailsHeader';
import BodyClassName from "react-body-classname";
import { Container } from 'reactstrap';





class StoryDetails extends Component {
    state = {
        story: '',
        storyOwner: ''
    }

    componentDidMount() {
        axios.get(`/api/stories/${this.props.match.params.id}`)
            .then(resp => {
                console.log('Details response', resp.data);
                this.setState({
                    story: resp.data,
                    storyOwner: resp.data.owner
                })

            })
            .catch((err) => {
                console.log(err);
            })
    }

    render() {

        return (
            <BodyClassName className="profile-page sidebar-collapse" >
                <div data-background-color="black">
                    <EditFixedNavbar currentUser={this.props.currentUser} updateUser={this.props.updateUser} />
                    <div style={{ height: '75px' }}></div>
                    <StoryDetailsHeader story={this.state.story} storyOwner={this.state.storyOwner} />
                    <div className="wrapper" style={{ backgroundColor: 'white' }}>
                        <Container className='story-details-container' >
                            <h2 className='text-story'> {this.state.story.title}</h2>
                            <h3 className='text-story' >
                                <i className={this.state.story.icon} ></i>
                                {this.state.story.category}
                            </h3>
                            <h3 className='text-story'><i className='now-ui-icons tech_watch-time'></i> {this.state.story.duration}</h3>
                            <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(this.state.story.content) }} style={{ color: 'white !important' }} />

                        </Container>
                    </div>
                </div>


            </BodyClassName>

        )
    }
}
export default StoryDetails;