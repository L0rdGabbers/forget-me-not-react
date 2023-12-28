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
import Error403 from "./pages/errors/Error403";
import Error500 from "./pages/errors/Error500";
import DeletedPage from "./pages/other/DeletedPage";
import TaskEditForm from "./pages/tasks/TaskEditForm";
import ProfilePage from "./pages/profiles/ProfilePage";
import MyProfilePage from "./pages/profiles/MyProfilePage";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";
import BackButtonBottom from "./components/BackButtonBottom";
import NotLoggedIn from "./pages/errors/NotLoggedInPage";
import RequireAuth from "./components/RequireAuth";


function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <BackButton />
      <Container className={styles.Container}>
        <Switch>
          <Route exact path="/" render={() => <HomePage />} />
          <Route
            exact
            path="/profiles/edit"
            render={() => (
              <RequireAuth>
                <ProfileEditForm />
              </RequireAuth>
            )}
          />
          <Route
            exact
            path="/profiles/:profileId"
            render={(props) => (
              <RequireAuth>
                <ProfilePage match={props.match} location={props.location} />
              </RequireAuth>
            )}
          />
          <Route
            exact
            path="/myprofile"
            render={() => (
              <RequireAuth>
                <MyProfilePage />
              </RequireAuth>
            )}
          />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route
            exact
            path="/projects/create"
            render={() => (
              <RequireAuth>
                <ProjectCreateForm />
              </RequireAuth>
            )}
          />
          <Route
            exact
            path="/projects/list"
            render={() => (
              <RequireAuth>
                <ProjectList />
              </RequireAuth>
            )}
          />
          <Route
            exact
            path="/projects/completed"
            render={() => (
              <RequireAuth>
                <CompletedProjectList />
              </RequireAuth>
            )}
          />
          <Route
            exact
            path="/projects/:projectId"
            render={(props) => (
              <RequireAuth>
                <ProjectDetail match={props.match} />
              </RequireAuth>
            )}
          />
          <Route
            exact
            path="/projects/edit/:projectId"
            render={(props) => (
              <RequireAuth>
                <ProjectEditForm location={props.location ? props.location : {}} />
              </RequireAuth>
            )}
          />
          <Route
            exact
            path="/tasks/create"
            render={() => (
              <RequireAuth>
                <TaskCreateForm />
              </RequireAuth>
            )}
          />
          <Route
            exact
            path="/tasks/:taskId"
            render={(props) => (
              <RequireAuth>
                <TaskDetail match={props.match} />
              </RequireAuth>
            )}
          />
          <Route
            exact
            path="/tasks/edit/:taskId"
            render={(props) => (
              <RequireAuth>
                <TaskEditForm location={props.location ? props.location : {}} />
              </RequireAuth>
            )}
          />
          <Route
            exact
            path="/friends/list"
            render={() => (
              <RequireAuth>
                <FriendList />
              </RequireAuth>
            )}
          />
          <Route
            exact
            path="/friends/create"
            render={() => (
              <RequireAuth>
                <FriendCreateForm />
              </RequireAuth>
            )}
          />
          <Route
            exact
            path="/friends/requests"
            render={() => (
              <RequireAuth>
                <FriendRequests />
              </RequireAuth>
            )}
          />
          <Route exact path="/error/403" render={() => <Error403 />} />
          <Route exact path="/error/500" render={() => <Error500 />} />
          <Route
            exact
            path="/deleted"
            render={() => (
              <RequireAuth>
                <DeletedPage />
              </RequireAuth>
            )}
          />
          <Route exact path="/loggedout" render={() => <NotLoggedIn />} />
          <Route render={() => <p>Page not found!</p>} />
        </Switch>
        <BackButtonBottom />
      </Container>
    </div>
  );
}

export default App;