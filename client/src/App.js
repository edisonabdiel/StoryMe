import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";



// styles
import "assets/css/bootstrap.min.css";
import "assets/scss/now-ui-kit.scss?v=1.4.0";
import "assets/demo/demo.css?v=1.4.0";
import "assets/demo/react-demo.css?v=1.4.0";
import "assets/demo/nucleo-icons-page-styles.css?v=1.4.0";
// pages
import Discovery from "views/examples/Discovery.js";
import Index from "views/Index.js";
import TermsAndConditions from "views/examples/TermsAndConditions.js";
import EmailSent from 'views/examples/EmailSent.js'
import EmailConfirmed from 'views/examples/EmailConfirmed.js'
import LoginPage from "views/examples/LoginPage.js";
import Logout from "views/examples/Logout.js";
import NucleoIcons from "views/NucleoIcons.js";
import ProfilePage from "views/examples/ProfilePage.js";
import Sections from "views/Sections.js";
import SignupPage from "views/examples/SignupPage.js";
import LoginButton from "components/LoginButton";
import ConfirmationPage from "components/ConfirmationPage";
import ImageUpload from "components/CustomUpload/ImageUpload";
import ListStories from "components/ListStories";
import StoryDetails from "components/StoryDetails";
import EditStory from "components/EditStory";
import AddStoryForm from 'views/examples/AddStoryForm';
import ProfileEdit from 'views/examples/ProfileEdit'




// others

class App extends React.Component {

  state = {
    loggedInUser: this.props.user
  }

  //User is not logged in already -> they are loggen
  updateUser = (newUser) => {
    this.setState({
      loggedInUser: newUser
    })
  }

  render() {

    return (
      <div>
        {/* {this.state.loggedInUser ? <h1>Hi {this.state.loggedInUser.email}</h1> : 'Logged out'} */}
        <Switch>
          <Route exact path="/" render={(props) => <Discovery {...props} updateUser={this.updateUser} currentUser={this.state.loggedInUser} />} />
          {/* <Route exact path="/logout" render={(props) => <Logout updateUser={this.updateUser} currentUser={this.state.loggedInUser} {...props} />} /> */}
          <Route exact path="/login-button" render={(props) => <LoginButton updateUser={this.updateUser} currentUser={this.state.loggedInUser} {...props} />} />
          <Route exact path="/login-page" render={(props) => <LoginPage updateUser={this.updateUser} currentUser={this.state.loggedInUser} {...props} />} />
          <Route exact path="/sign-up" render={(props) => <SignupPage updateUser={this.updateUser} currentUser={this.state.loggedInUser} {...props} />} />
          <Route path="/index" render={(props) => <Index {...props} />} />
          <Route path="/terms-and-conditions" render={(props) => <TermsAndConditions {...props} />} />
          <Route path="/email-sent" render={(props) => <EmailSent currentUser={this.state.loggedInUser} updateUser={this.updateUser} {...props} />} />
          <Route path="/email-confirmed/:token" render={(props) => <EmailConfirmed currentUser={this.state.loggedInUser} updateUser={this.updateUser}{...props} />} />
          <Route path="/nucleo-icons" render={(props) => <NucleoIcons {...props} />} />
          <Route exact path="/profile-page/:id" render={(props) => {
            if (this.state.loggedInUser && this.state.loggedInUser.isVerified) {
              return <ProfilePage currentUser={this.state.loggedInUser}
                updateUser={this.updateUser} {...props} />
            }
            else {
              return <Redirect
                to={{
                  pathname: '/',
                  state: true
                }} />
            }
          }} />
          <Route path="/sections" render={(props) => <Sections {...props} />} />
          <Route exact path="/confirmation/:token" render={(props) => <ConfirmationPage {...props} updateUser={this.updateUser} />} />
          <Route exact path='/img-upload' component={ImageUpload} />
          <Route exact path='/publish' render={(props) => { if (this.state.loggedInUser) { return <AddStoryForm currentUser={this.state.loggedInUser} updateUser={this.updateUser} {...props} /> } else { return <Redirect to="/login-page" /> } }} />
          <Route exact path="/list-stories" render={(props) => <ListStories currentUser={this.state.loggedInUser}
            updateUser={this.updateUser} {...props} />} />
          <Route exact path="/stories/:id" component={StoryDetails} />
          <Route exact path="/story-edit/:id" render={(props) => <EditStory currentUser={this.state.loggedInUser} updateUser={this.updateUser}  {...props} />} />
          <Route exact path="/profile-edit" render={(props) => { if (this.state.loggedInUser) { return <ProfileEdit currentUser={this.state.loggedInUser} updateUser={this.updateUser} {...props} /> } else { return <Redirect to="/login-page" /> } }} />
        </Switch>
      </div>
    )
  }

};
// {...props} going to pass every props and also update the user
export default App;