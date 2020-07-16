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
      <ScrollTransparentNavbar updateUser={props.updateUser} currentUser={props.currentUser} />
      <div className="wrapper blog-posts" >
        <DiscoveryHeader />
        <div className="">
          <ListStories currentUser={props.currentUser} updateUser={props.updateUser} history={props.history}/>
          </div>
      </div>
      <FooterBlack />
    </>
  );
}

export default BlogPosts;
