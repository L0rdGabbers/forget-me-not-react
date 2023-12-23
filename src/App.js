import React from "react";
import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import BackButton from "./components/BackButtonSide";
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
import ProjectDetail from "./pages/projects/ProjectDetail";
import ProjectEditForm from "./pages/projects/ProjectEditForm";
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


function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <BackButton />
      <Container className={styles.Container}>
        <Switch>
          <Route exact path="/" render={() => <h1>Home</h1>} />
          <Route exact path="/profiles/edit" render={() => <ProfileEditForm />} />
          <Route exact path="/profiles/:profileId" component={ProfilePage} />
          <Route exact path="/myprofile" component={MyProfilePage} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/projects/create" render={() => <ProjectCreateForm />} />
          <Route exact path="/projects/list" render={() => <ProjectList />} />
          <Route exact path="/projects/" render={() => <ProjectList />} />
          <Route exact path="/projects/:projectId" component={ProjectDetail} />
          <Route exact path="/projects/edit/:projectId" component={ProjectEditForm} />
          <Route exact path="/tasks/create" render={() => <TaskCreateForm />} />
          <Route exact path="/tasks/:taskId" component={TaskDetail} />
          <Route exact path="/tasks/edit/:taskId" component={TaskEditForm} />
          <Route exact path="/friends/list" render={() => <FriendList />} />
          <Route exact path="/friends/create" render={() => <FriendCreateForm />} />
          <Route exact path="/friends/requests" render={() => <FriendRequests />} />
          <Route exact path="/error/403" render={() => <Error403 />} />
          <Route exact path="/error/500" render={() => <Error500 />} />
          <Route exact path="/deleted" render={() => <DeletedPage />} />
          <Route render={() => <p>Page not found!</p>} />
        </Switch>
        <BackButtonBottom />
      </Container>
    </div>
  );
}

export default App;