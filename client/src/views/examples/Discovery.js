import React from "react";
// core components
import ScrollTransparentNavbar from "components/Navbars/ScrollTransparentNavbar.js";
import DiscoveryHeader from "components/Headers/DiscoveryHeader.js";
import FooterBlack from "components/Footers/FooterBlack.js";
import ListStories from "components/ListStories";




function BlogPosts(props) {
  console.log(props.location.state)

  return (
    <>
      <ScrollTransparentNavbar updateUser={props.updateUser}
        currentUser={props.currentUser} />

      <div className="wrapper blog-posts" >
        <DiscoveryHeader />
        <div className="projects-4">
          <ListStories isDiscovery={true}
            currentUser={props.currentUser}
            updateUser={props.updateUser}
            history={props.history} />
        </div>
      </div>
      <FooterBlack />
    </>
  );
}

export default BlogPosts;
