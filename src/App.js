// App.js
// Main component that defines the routes and structure of the application

import React from "react";
import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import BackButton from "./components/BackButtonSide";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import './api/axiosDefaults';
import HomePage from "./pages/other/HomePage";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import ProjectCreateForm from "./pages/projects/ProjectCreateForm";
import FriendCreateForm from "./pages/friends/FriendCreateForm";
import FriendRequests from "./pages/friends/FriendRequests";
import FriendList from "./pages/friends/FriendList";
import ProjectList from "./pages/projects/ProjectList";
import ProjectDetail from "./pages/projects/ProjectDetail";
import ProjectEditForm from "./pages/projects/ProjectEditForm";
import CompletedProjectList from "./pages/projects/CompletedProjectList";
import TaskCreateForm from "./pages/tasks/TaskCreateForm";
import TaskDetail from "./pages/tasks/TaskDetail";
import Error404 from "./pages/errors/Error404";
import Error500 from "./pages/errors/Error500";
import DeletedPage from "./pages/other/DeletedPage";
import TaskEditForm from "./pages/tasks/TaskEditForm";
import ProfilePage from "./pages/profiles/ProfilePage";
import MyProfilePage from "./pages/profiles/MyProfilePage";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";
import BackButtonBottom from "./components/BackButtonBottom";
import RequireAuth from "./components/RequireAuth";

function App() {
  // Main component rendering the structure of the application
  return (
    <div className={styles.App}>
      {/* Navigation bar */}
      <NavBar />
      {/* Back button for navigation */}
      <BackButton />
      {/* Main content container */}
      <Container className={styles.Container}>
        {/* Switch component for handling different routes */}
        <Switch>
          {/* Route for the home page */}
          <Route exact path="/" render={() => <HomePage />} />
          {/* Route for editing user profile */}
          <Route
            exact
            path="/profiles/edit"
            render={() => (
              <RequireAuth>
                <ProfileEditForm />
              </RequireAuth>
            )}
          />
          {/* Route for viewing user profile */}
          <Route
            exact
            path="/profiles/:profileId"
            render={(props) => (
              <RequireAuth>
                <ProfilePage match={props.match} location={props.location} />
              </RequireAuth>
            )}
          />
          {/* Route for viewing own profile */}
          <Route
            exact
            path="/myprofile"
            render={(props) => (
              <RequireAuth>
                <MyProfilePage location={props.location} />
              </RequireAuth>
            )}
          />
          {/* Route for user signup */}
          <Route exact path="/signup" render={() => <SignUpForm />} />
          {/* Route for user signin */}
          <Route exact path="/signin" render={() => <SignInForm />} />
          {/* Route for creating a new project */}
          <Route
            exact
            path="/projects/create"
            render={() => (
              <RequireAuth>
                <ProjectCreateForm />
              </RequireAuth>
            )}
          />
          {/* Route for viewing a list of projects */}
          <Route
            exact
            path="/projects/list"
            render={() => (
              <RequireAuth>
                <ProjectList />
              </RequireAuth>
            )}
          />
          {/* Route for viewing a list of completed projects */}
          <Route
            exact
            path="/projects/completed"
            render={() => (
              <RequireAuth>
                <CompletedProjectList />
              </RequireAuth>
            )}
          />
          {/* Route for viewing details of a project */}
          <Route
            exact
            path="/projects/:projectId"
            render={(props) => (
              <RequireAuth>
                <ProjectDetail match={props.match} />
              </RequireAuth>
            )}
          />
          {/* Route for editing details of a project */}
          <Route
            exact
            path="/projects/edit/:projectId"
            render={(props) => (
              <RequireAuth>
                <ProjectEditForm location={props.location ? props.location : {}} />
              </RequireAuth>
            )}
          />
          {/* Route for creating a new task */}
          <Route
            exact
            path="/tasks/create"
            render={() => (
              <RequireAuth>
                <TaskCreateForm />
              </RequireAuth>
            )}
          />
          {/* Route for viewing details of a task */}
          <Route
            exact
            path="/tasks/:taskId"
            render={(props) => (
              <RequireAuth>
                <TaskDetail match={props.match} />
              </RequireAuth>
            )}
          />
          {/* Route for editing details of a task */}
          <Route
            exact
            path="/tasks/edit/:taskId"
            render={(props) => (
              <RequireAuth>
                <TaskEditForm location={props.location ? props.location : {}} />
              </RequireAuth>
            )}
          />
          {/* Route for viewing a list of friends */}
          <Route
            exact
            path="/friends/list"
            render={() => (
              <RequireAuth>
                <FriendList />
              </RequireAuth>
            )}
          />
          {/* Route for creating a new friend */}
          <Route
            exact
            path="/friends/create"
            render={() => (
              <RequireAuth>
                <FriendCreateForm />
              </RequireAuth>
            )}
          />
          {/* Route for viewing friend requests */}
          <Route
            exact
            path="/friends/requests"
            render={() => (
              <RequireAuth>
                <FriendRequests />
              </RequireAuth>
            )}
          />
          {/* Route for handling server error (500) */}
          <Route exact path="/error/500" render={() => <Error500 />} />
          {/* Route for viewing a deleted page */}
          <Route
            exact
            path="/deleted"
            render={() => (
              <RequireAuth>
                <DeletedPage />
              </RequireAuth>
            )}
          />
          {/* Default route for handling 404 errors */}
          <Route render={() => <Error404 />} />
        </Switch>
        {/* Back button for navigation */}
        <BackButtonBottom />
      </Container>
    </div>
  );
}

// Exporting the App component
export default App;
