import React from "react";

// reactstrap components

// core components
import Footer from "components/Footers/Footer.js";

// sections for this page
import Headers from "./sections-sections/Headers.js";
import Blogs from "./sections-sections/Blogs.js";
import ContactUs from "./sections-sections/ContactUs.js";

const Sections = () => {
  React.useEffect(() => {
    document.body.classList.add("sections-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    var href = window.location.href.substring(
      window.location.href.lastIndexOf("#/") + 2
    );
    var hrefId = href.substring(href.lastIndexOf("#") + 1);
    if (href.lastIndexOf("#") > 0) {
      document.getElementById(hrefId).scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
    return function cleanup() {
      document.body.classList.remove("sections-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });
  return (
    <>
      <div className="wrapper">
        <div className="section-space"></div>
        <Headers />
        <Blogs />
        <ContactUs />
        <Footer />
      </div>
    </>
  );
}

export default Sections;
