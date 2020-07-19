import React, { Component } from 'react'
// reactstrap components
import { Container } from "reactstrap";




export class StoryDetailsHeader extends Component {
    pageHeader = React.createRef();
    // userName = this.props.story.owner.userName
    render() {
        return (
            <div>
                <>
                    <div
                        className="page-header clear-filter page-header-small"
                        filter-color="blue"
                    >
                        <div
                            className="page-header-image"
                            style={{
                                backgroundImage: `url(${this.props.story.image})`,
                                zIndex: ' 1'
                            }}
                            ref={this.pageHeader}
                        ></div>
                        <Container>
                            <div className="photo-container-Story">
                                <img src={this.props.story.image} alt="..." ></img>
                            </div>
                            <h3 className="title">{this.props.story.title}</h3>
                            <h3 className="title">{this.props.story.owner && this.props.story.owner.userName}</h3>

                            <p className="category"></p>
                        </Container>
                    </div>
                </>
            </div>
        )
    }
}
export default StoryDetailsHeader
