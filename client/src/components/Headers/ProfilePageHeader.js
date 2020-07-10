import React, { Component } from 'react'

// reactstrap components
import { Container } from "reactstrap";


export class ProfilePageHeader extends Component {

  pageHeader = React.createRef();
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
                backgroundImage: "url(" + require("assets/img/bg5.jpg") + ")",
              }}
              ref={this.pageHeader}
            ></div>
            <Container>
              <div className="photo-container">
                <img alt="..."></img>
                {/* src={this.props.currentUser.image} */}
              </div>
              <h3 className="title">Ryan Scheinder</h3>
              <p className="category">Photographer</p>
              <div className="content">
                <div> <h3 className="title">About me</h3>
                </div>

              </div>
            </Container>
          </div>
        </>
      </div>
    )
  }
}

export default ProfilePageHeader


// old code to be deleted when finish the new one

// function ProfilePageHeader() {

//   pageHeader = React.createRef();

//   // React.useEffect(() => {
//   //   if (window.innerWidth > 991) {
//   //     const updateScroll = () => {
//   //       let windowScrollTop = window.pageYOffset / 3;
//   //       pageHeader.current.style.transform =
//   //         "translate3d(0," + windowScrollTop + "px,0)";
//   //     };
//   //     window.addEventListener("scroll", updateScroll);
//   //     return function cleanup() {
//   //       window.removeEventListener("scroll", updateScroll);
//   //     };
//   //   }
//   // });
//   return (
//     <>
//       <div
//         className="page-header clear-filter page-header-small"
//         filter-color="blue"
//       >
//         <div
//           className="page-header-image"
//           style={{
//             backgroundImage: "url(" + require("assets/img/bg5.jpg") + ")",
//           }}
//           ref={pageHeader}
//         ></div>
//         <Container>
//           <div className="photo-container">
//             <img alt="..." src={require("assets/img/ryan.jpg")}></img>
//           </div>
//           <h3 className="title">Ryan Scheinder</h3>
//           <p className="category">Photographer</p>
//           <div className="content">
//             <div className="social-description">
//               <h2>26</h2>
//               <p>Comments</p>
//             </div>
//             <div className="social-description">
//               <h2>26</h2>
//               <p>Comments</p>
//             </div>
//             <div className="social-description">
//               <h2>48</h2>
//               <p>Bookmarks</p>
//             </div>
//           </div>
//         </Container>
//       </div>
//     </>
//   );
// }

// export default ProfilePageHeader;
