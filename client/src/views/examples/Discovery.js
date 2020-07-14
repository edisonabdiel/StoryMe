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

function BlogPosts(props) {
  // const [emailFocus, setEmailFocus] = React.useState(false);
  return (
    <>
      <ScrollTransparentNavbar updateUser={props.updateUser} currentUser={props.currentUser} />
      <div className="wrapper blog-posts" >
        <DiscoveryHeader />
        <div className="projects-4">
          <Container fluid >
            <Row>
              <Col className="px-0" md="6">
                <Card
                  className="card-fashion card-background"
                  style={{
                    backgroundImage:
                      "url(" + require("assets/img/green-universe.jpg") + ")",
                  }}
                >
                  <CardBody>
                    <CardTitle className="text-left" tag="div">
                      <h2>
                        <a href="/" onClick={(e) => e.preventDefault()}>
                          The world's biggest yacht sets sail. It has lasers.
                        </a>
                      </h2>
                    </CardTitle>
                    <CardFooter className="text-left">
                      <div className="stats">
                        <span>
                          <i className="now-ui-icons users_circle-08"></i>
                          Nicholas Deleon
                        </span>
                        <span>
                          <i className="now-ui-icons tech_watch-time"></i>
                          June 2, 2020
                        </span>
                      </div>
                      <div className="stats-link pull-right">
                        <a
                          className="footer-link"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          Yachts
                        </a>
                      </div>
                    </CardFooter>
                  </CardBody>
                </Card>
              </Col>
              <Col className="px-0" md="3">
                <Card className="card-fashion">
                  <CardTitle tag="div">
                    <h4>
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        Why Early Sailors Were Stalled for Millennia in the...
                      </a>
                    </h4>
                  </CardTitle>
                  <CardBody>
                    <CardFooter>
                      <div className="stats">
                        <span>
                          <i className="now-ui-icons users_circle-08"></i>
                          Jon Russell
                        </span>
                        <span>
                          <i className="now-ui-icons tech_watch-time"></i>
                          June 2, 2020
                        </span>
                      </div>
                      <div className="stats-link pull-right">
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                          Sea
                        </a>
                        ‚{" "}
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                          Magazine
                        </a>
                      </div>
                    </CardFooter>
                  </CardBody>
                </Card>
              </Col>
              <Col className="px-0" md="3">
                <Card
                  className="card-fashion card-background"
                  style={{
                    backgroundImage:
                      "url(" + require("assets/img/project11.jpg") + ")",
                  }}
                ></Card>
              </Col>
            </Row>
            <Row>
              <Col className="px-0" md="3">
                <Card
                  className="card-fashion card-background"
                  style={{
                    backgroundImage:
                      "url(" + require("assets/img/project12.jpg") + ")",
                  }}
                ></Card>
              </Col>
              <Col className="px-0" md="3">
                <Card className="card-fashion arrow-left">
                  <CardTitle tag="div">
                    <h4>
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        My Depressing Summers in Belize
                      </a>
                    </h4>
                  </CardTitle>
                  <CardBody>
                    <CardFooter>
                      <div className="stats">
                        <span>
                          <i className="now-ui-icons users_circle-08"></i>
                          John Bruno
                        </span>
                        <span>
                          <i className="now-ui-icons tech_watch-time"></i>
                          June 2, 2020
                        </span>
                      </div>
                      <div className="stats-link pull-right">
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                          Opinion
                        </a>
                        ‚{" "}
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                          Outdoor
                        </a>
                      </div>
                    </CardFooter>
                  </CardBody>
                </Card>
              </Col>
              <Col className="px-0" md="6">
                <Card
                  className="card-fashion card-background"
                  style={{
                    backgroundImage:
                      "url(" + require("assets/img/project13.jpg") + ")",
                  }}
                >
                  <CardBody>
                    <CardTitle className="text-left" tag="div">
                      <h2>
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                          China Wants Fish, So Africa Goes Hungry
                        </a>
                      </h2>
                    </CardTitle>
                    <CardFooter className="text-left">
                      <div className="stats">
                        <span>
                          <i className="now-ui-icons users_circle-08"></i>
                          Joanna Klein
                        </span>
                        <span>
                          <i className="now-ui-icons tech_watch-time"></i>
                          June 2, 2020
                        </span>
                      </div>
                      <div className="stats-link pull-right">
                        <a
                          className="footer-link"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          People
                        </a>
                      </div>
                    </CardFooter>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="main">
          <Container>
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
          </Container>
        </div>
      </div>
      <FooterBlack />
    </>
  );
}

export default BlogPosts;
