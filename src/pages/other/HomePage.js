// HomePage.js
// Component for rendering the home page, displaying project and task information.

import React, { useEffect, useState } from "react";
import styles from "../../styles/HomePage.module.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import pencilImage from "../../assets/pencil.jpg";
import hourglassImage from "../../assets/hourglass.jpg";
import notesImage from "../../assets/post-it-notes.jpg";
import womanImage from "../../assets/woman.jpg";
import signUpImage from "../../assets/sign-up.jpg"
import signInImage from "../../assets/sign-in.jpg"
import { useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

// Component for rendering the home page, displaying project and task information.
const HomePage = () => {
  const currentUser = useCurrentUser();
  const [closestProject, setClosestProject] = useState(null);
  const [closestTask, setClosestTask] = useState(null);
  const [mostRecentlyUpdatedProject, setMostRecentlyUpdatedProject] =
    useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);

  const history = useHistory();

  // Navigates to the create project page
  const handleCreateProjectLink = () => {
    history.push("/projects/create");
  };

  // Navigates to the urgent project page
  const handleUrgentProjectLink = () => {
    history.push(`/projects/${closestProject.id}`);
  };

  // Navigates to the recently updated project page
  const handleUpdatedProjectLink = () => {
    history.push(`/projects/${mostRecentlyUpdatedProject.id}`);
  };

  // Navigates to the urgent task page
  const handleUrgentTaskLink = () => {
    history.push(`/tasks/${closestTask.id}`);
  };

  // Navigates to the sign-up page
  const handleSignUpLink = () => {
    history.push('/signup')
  }

  // Navigates to the sign-in page
  const handleSignInLink = () => {
    history.push('/signin')
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetches project data
        const projects = await axiosReq.get(`/projects/`);
        if (projects.status === 200) {
          // Finds the closest project based on due dates
          const closestProject = projects.data.reduce((closest, project) => {
            const projectDueDate = new Date(project.due_date);
            const closestDueDate = closest ? new Date(closest.due_date) : null;
            const currentDate = new Date();

            if (
              (!closest || !closest.complete) &&
              !project.complete &&
              project.profile_id === currentUser.id &&
              Math.abs(projectDueDate - currentDate) <
                Math.abs(closestDueDate - currentDate)
            ) {
              const daysRemaining = Math.ceil(
                (projectDueDate - currentDate) / (1000 * 60 * 60 * 24)
              );

              if (daysRemaining >= 0) {
                return {
                  ...project,
                  daysRemaining: daysRemaining,
                };
              }
            }

            return closest;
          }, null);

          setClosestProject(closestProject);

          // Finds the most recently updated project
          const mostRecentlyUpdatedProject = projects.data.reduce(
            (mostRecent, project) => {
              const projectUpdatedAt = new Date(project.updated_at);
              const mostRecentUpdatedAt = mostRecent
                ? new Date(mostRecent.updated_at)
                : null;

              if (
                (!mostRecent || !project.complete) &&
                (project.profile_id == currentUser.id) &&
                projectUpdatedAt > mostRecentUpdatedAt
              ) {
                return project;
              } else {
                return mostRecent;
              }
            },
            null
          );

          setMostRecentlyUpdatedProject(mostRecentlyUpdatedProject);
        }

        // Fetches task data
        const tasks = await axiosReq.get("/tasks/");
        if (tasks.status === 200) {
          // Finds the closest task based on due dates
          const closestTask = tasks.data.reduce((closest, task) => {
            const taskDueDate = new Date(task.due_date);
            const closestDueDate = closest ? new Date(closest.due_date) : null;
            const currentDate = new Date();

            if (
              (!closest || !closest.complete) &&
              !task.complete &&
              Math.abs(taskDueDate - currentDate) <
                Math.abs(closestDueDate - currentDate)
            ) {
              const daysRemaining = Math.ceil(
                (taskDueDate - currentDate) / (1000 * 60 * 60 * 24)
              );

              if (daysRemaining >= 0) {
                return {
                  ...task,
                  daysRemaining: daysRemaining,
                };
              }
            }

            return closest;
          }, null);

          setClosestTask(closestTask);
        }
        setDataLoaded(true);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (currentUser) {
      fetchData();
    }
  }, [currentUser]);


  // Renders content based on data availability
  const renderContent = () => {
    if (!dataLoaded) {
      return null;
    }

    return (
      <>
        <Container className={styles.HomeContainer}>
          <Row>
            {/* Create New Project */}
            <Col
              lg={6}
              className={styles.LinkDiv}
              onClick={handleCreateProjectLink}
            >
              <div className={styles.ImageWrapper}>
                <h4 className={styles.Header}>Create New Project</h4>
                <img
                  src={pencilImage}
                  alt="Pencil on blank paper."
                  className={styles.Image}
                />
              </div>
            </Col>
            {/* Urgent Project */}
            {closestProject ? (
              <Col
                lg={6}
                className={styles.LinkDiv}
                onClick={handleUrgentProjectLink}
              >
                <div className={styles.ImageWrapper}>
                  <h4 className={styles.Header}>
                    {closestProject.daysRemaining === 0 ? (
                      <>Due Today</>
                    ) : closestProject.daysRemaining === 1 ? (
                      <>Due Tomorrow</>
                    ) : (
                      <>Project Due In {closestProject.daysRemaining} Days</>
                    )}
                    <hr></hr>
                    {closestProject?.title}
                  </h4>
                  <img
                    src={hourglassImage}
                    alt="A running hourglass."
                    className={styles.Image}
                  />
                </div>
              </Col>
            ) : (
              // Placeholder for No Incomplete Projects
              <>
                <Col
                  lg={6}
                  className={styles.LinkDiv}
                  onClick={handleUrgentProjectLink}
                >
                  <div className={styles.ImageWrapper}>
                    <h4 className={styles.SteadyHeader}>No Incomplete Projects</h4>
                    <img
                      src={hourglassImage}
                      alt="A running hourglass."
                      className={styles.SteadyImage}
                    />
                  </div>
                </Col>
              </>
            )}
            {/* Most Recently Updated Project */}
            {mostRecentlyUpdatedProject ? (
              <Col
                lg={6}
                className={styles.LinkDiv}
                onClick={handleUpdatedProjectLink}
              >
                <div className={styles.ImageWrapper}>
                  <h4 className={styles.Header}>
                    <>
                      Most Recently Updated Project<hr></hr>
                      {mostRecentlyUpdatedProject?.title}
                    </>
                  </h4>
                  <img
                    src={notesImage}
                    alt="A wall of colourful used post-it notes."
                    className={styles.Image}
                  />
                </div>
              </Col>
            ) : (
              // Placeholder for No Incomplete Projects
              <Col
                lg={6}
                className={styles.LinkDiv}
                onClick={handleUpdatedProjectLink}
              >
                <div className={styles.ImageWrapper}>
                  <h4 className={styles.SteadyHeader}>
                    <>
                      No Incomplete Projects
                    </>
                  </h4>
                  <img
                    src={notesImage}
                    alt="A wall of colourful used post-it notes."
                    className={styles.SteadyImage}
                  />
                </div>
              </Col>
            )}
            {/* Urgent Task */}
            {closestTask ? (
              <Col
                lg={6}
                className={styles.LinkDiv}
                onClick={handleUrgentTaskLink}
              >
                <div className={styles.ImageWrapper}>
                  <h4 className={styles.Header}>
                    {closestTask.daysRemaining === 0 ? (
                      <>Task Due Today</>
                    ) : closestTask.daysRemaining === 1 ? (
                      <>Task Due Tomorrow</>
                    ) : (
                      <>Task Due In {closestTask.daysRemaining} Days</>
                    )}
                    <hr></hr>
                    {closestTask?.title}
                  </h4>
                  <img
                    src={womanImage}
                    alt="A woman writing on a notepad."
                    className={styles.Image}
                  />
                </div>
              </Col>
            ) : (
              // Placeholder for No Incomplete Tasks
              <Col
                lg={6}
                className={styles.LinkDiv}
                onClick={handleUrgentTaskLink}
              >
                <div className={styles.ImageWrapper}>
                  <h4 className={styles.SteadyHeader}>
                    No Incomplete Tasks
                  </h4>
                  <img
                    src={womanImage}
                    alt="A woman writing on a notepad."
                    className={styles.SteadyImage}
                  />
                </div>
              </Col>
            )}
          </Row>
        </Container>
      </>
    );
  };

  // Renders content for signed-out users
  const renderSignedOut = () => {
    if (currentUser) {
      return null;
    }

    return (
      <>
        <Container className={styles.HomeContainer}>
          <Row>
            {/* Sign Up */}
            <Col lg={6} className={styles.LinkDiv} onClick={handleSignUpLink}>
              <div className={styles.ImageWrapper}>
                <h4 className={styles.Header}>Sign Up</h4>
                <img
                  src={signUpImage}
                  alt="Pencil on blank paper."
                  className={styles.Image}
                />
              </div>
            </Col>
            {/* Sign In */}
            <Col lg={6} className={styles.LinkDiv} onClick={handleSignInLink}>
              <div className={styles.ImageWrapper}>
                <h4 className={styles.Header}>Sign In</h4>
                <img
                  src={signInImage}
                  alt="Pencil on blank paper."
                  className={styles.Image}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </>
    );
  };

  return (
    <>
      {/* Title and tagline */}
      <Container className={styles.TitleContainer}>
        <h1 className={`text-center ${styles.BigTitle}`}>Forget Me Not</h1>
        <h5 className={`text-center ${styles.Title}`}>A site for organising life`&apos;`s big challenges into bite sized projects and tasks</h5>
      </Container>
      {/* Render content based on user status */}
      {currentUser ? renderContent() : renderSignedOut()}
    </>
  );
};

// Exporting the HomePage component
export default HomePage;
