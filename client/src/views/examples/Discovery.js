import React from "react";

// reactstrap components
import {
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import ScrollTransparentNavbar from "components/Navbars/ScrollTransparentNavbar.js";
import DiscoveryHeader from "components/Headers/DiscoveryHeader.js";
import FooterBlack from "components/Footers/FooterBlack.js";
import ListStories from "components/ListStories";


function BlogPosts(props) {
  // const [emailFocus, setEmailFocus] = React.useState(false);
  return (
    <>
      <ScrollTransparentNavbar updateUser={props.updateUser} />
      <div className="wrapper blog-posts" >
        <DiscoveryHeader />
        <div className="projects-4">
          <ListStories currentUser={props.currentUser}/>
          {/* <Container>
            <div className="section" >
              <h3 className="title text-center">
                Readers also read
              </h3>
              <br></br>
              <Row>
                <Col md="4">
                  <Card className="card-plain card-blog">
                    <div className="card-image">
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <img
                          alt="..."
                          className="img rounded img-raised"
                          src={require("assets/img/bg5.jpg")}
                        ></img>
                      </a>
                    </div>
                    <CardBody>
                      <h6 className="category text-info">Enterprise</h6>
                      <CardTitle tag="h4">
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                          Autodesk looks to future of 3D printing with Project
                          Escher
                        </a>
                      </CardTitle>
                      <p className="card-description">
                        Like so many organizations these days, Autodesk is a
                        company in transition. It was until recently a
                        traditional boxed software company selling licenses.{" "}
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                          Read More
                        </a>
                      </p>
                      <div className="author">
                        <img
                          alt="..."
                          className="avatar img-raised"
                          src={require("assets/img/olivia.jpg")}
                        ></img>
                        <span>Anna Spark</span>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
                <Col md="4">
                  <Card className="card-plain card-blog">
                    <div className="card-image">
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <img
                          alt="..."
                          className="img rounded img-raised"
                          src={require("assets/img/bg27.jpg")}
                        ></img>
                      </a>
                    </div>
                    <CardBody>
                      <h6 className="category text-success">Startups</h6>
                      <CardTitle tag="h4">
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                          Lyft launching cross-platform service this week
                        </a>
                      </CardTitle>
                      <p className="card-description">
                        Like so many organizations these days, Autodesk is a
                        company in transition. It was until recently a
                        traditional boxed software company selling licenses.{" "}
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                          Read More
                        </a>
                      </p>
                      <div className="author">
                        <img
                          alt="..."
                          className="ar img-raised"
                          src={require("assets/img/michael.jpg")}
                        ></img>
                        <span>John Black</span>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
                <Col md="4">
                  <Card className="card-plain card-blog">
                    <div className="card-image">
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <img
                          alt="..."
                          className="img rounded img-raised"
                          src={require("assets/img/bg21.jpg")}
                        ></img>
                      </a>
                    </div>
                    <CardBody>
                      <h6 className="category text-danger">
                        <i className="now-ui-icons media-2_sound-wave"></i>{" "}
                        Enterprise
                      </h6>
                      <CardTitle tag="h4">
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                          6 insights into the French Fashion landscape
                        </a>
                      </CardTitle>
                      <p className="card-description">
                        Like so many organizations these days, Autodesk is a
                        company in transition. It was until recently a
                        traditional boxed software company selling licenses.{" "}
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                          Read More
                        </a>
                      </p>
                      <div className="author">
                        <img
                          alt="..."
                          className="avatar img-raised"
                          src={require("assets/img/james.jpg")}
                        ></img>
                        <span>James Newman</span>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
          </Container>*/}
        </div>
      </div> 
      <FooterBlack />
    </>
  );
}

export default BlogPosts;
