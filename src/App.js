import React from "react";
import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import './api/axiosDefaults';
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import ProjectCreateForm from "./pages/projects/ProjectCreateForm";
import FriendCreateForm from "./pages/friends/FriendCreateForm";
import FriendRequests from "./pages/friends/FriendRequests";
import FriendList from "./pages/friends/FriendList";
import ProjectList from "./pages/projects/ProjectList";

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Container>
        <Switch>
          <Route exact path="/" render={() => <h1>Home</h1>} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/projects/create" render={() => <ProjectCreateForm />} />
          <Route exact path="/projects/view-projects" render={() => <ProjectList />} />
          <Route exact path="/friends/list" render={() => <FriendList />} />
          <Route exact path="/friends/create" render={() => <FriendCreateForm />} />
          <Route exact path= "/friends/requests" render={() => <FriendRequests />} />
          <Route render={() => <p>Page not found!</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;