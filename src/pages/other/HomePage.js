import React, { useEffect, useState } from "react";
import styles from "../../styles/HomePage.module.css";
import { Container, Row, Col } from "react-bootstrap";
import pencilImage from "../../assets/pencil.jpg";
import hourglassImage from "../../assets/hourglass.jpg";
import notesImage from "../../assets/post-it-notes.jpg";
import womanImage from "../../assets/woman.jpg";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { axiosReq } from "../../api/axiosDefaults";

const HomePage = () => {
  const [ closestProject, setClosestProject ] = useState(null);
  const [ closestTask, setClosestTask ] = useState(null);
  const [ mostRecentlyUpdatedProject, setMostRecentlyUpdatedProject ] = useState(null);
  const [ dataLoaded, setDataLoaded ] = useState(false);

  const history = useHistory();

  const handleCreateProjectLink = () => {
    history.push('/projects/create')
  }

  const handleUrgentProjectLink = () => {
    history.push(`/projects/${closestProject.id}`)
  }

  const handleUpdatedProjectLink = () => {
    history.push(`/projects/${mostRecentlyUpdatedProject.id}`)
  }

  const handleUrgentTaskLink = () => {
    history.push(`/tasks/${closestTask.id}`)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projects = await axiosReq.get(`/projects/`);
        if (projects.status === 200) {
          const closestProject = projects.data.reduce((closest, project) => {
            const projectDueDate = new Date(project.due_date);
            const closestDueDate = closest ? new Date(closest.due_date) : null;
            const currentDate = new Date();

            if (
              (!closest || !closest.completed) &&
              !project.completed &&
              Math.abs(projectDueDate - currentDate) <
                Math.abs(closestDueDate - currentDate)
            ) {
              const daysRemaining = Math.ceil((projectDueDate - currentDate) / (1000 * 60 * 60 * 24));
          
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

          const mostRecentlyUpdatedProject = projects.data.reduce(
            (mostRecent, project) => {
              const projectUpdatedAt = new Date(project.updated_at);
              const mostRecentUpdatedAt = mostRecent
                ? new Date(mostRecent.updated_at)
                : null;

              if (
                (!mostRecent || !project.completed) &&
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

        const tasks = await axiosReq.get('/tasks/');
        if (tasks.status === 200) {
          const closestTask = tasks.data.reduce((closest, task) => {
            const taskDueDate = new Date(task.due_date);
            const closestDueDate = closest ? new Date(closest.due_date) : null;
            const currentDate = new Date();
          
            if (
              (!closest || !closest.completed) &&
              !task.completed &&
              Math.abs(taskDueDate - currentDate) <
                Math.abs(closestDueDate - currentDate)
            ) {
              const daysRemaining = Math.ceil((taskDueDate - currentDate) / (1000 * 60 * 60 * 24));
          
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

    fetchData();
  }, []);

  const renderContent = () => {
    if (!dataLoaded) {
      return null;
    }

    return (
      <>
        <Container className={styles.HomeContainer}>
          <Row>
            <Col
              lg={6}
              className={styles.LinkDiv}
              onClick={handleCreateProjectLink}
            >
              <div className={styles.ImageWrapper}>
                <h3 className={styles.Header}>Create New Project</h3>
                <img
                  src={pencilImage}
                  alt="Pencil on blank paper."
                  className={styles.Image}
                />
              </div>
            </Col>
            <Col lg={6} className={styles.LinkDiv} onClick={handleUrgentProjectLink}>
              <div className={styles.ImageWrapper}>
                <h3 className={styles.Header}>
                  { closestProject.daysRemaining === 0 ? (
                    <>Due Today</>
                  ) : closestProject.daysRemaining === 1 ? (
                    <>Due Tomorrow</>
                  ) : (
                    <>Project Due In {closestProject.daysRemaining} Days</>
                  ) }
                  <hr></hr>
                  {closestProject?.title}
                </h3>
                <img
                  src={hourglassImage}
                  alt="A running hourglass."
                  className={styles.Image}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={6} className={styles.LinkDiv} onClick={handleUpdatedProjectLink}>
              <div className={styles.ImageWrapper}>
                <h3 className={styles.Header}>
                  Most Recently Updated Project<hr></hr>
                  {mostRecentlyUpdatedProject?.title}
                </h3>
                <img
                  src={notesImage}
                  alt="A wall of colourful used post-it notes."
                  className={styles.Image}
                />
              </div>
            </Col>
            <Col lg={6} className={styles.LinkDiv} onClick={handleUrgentTaskLink}>
              <div className={styles.ImageWrapper}>
                <h3 className={styles.Header}>
                { closestTask.daysRemaining === 0 ? (
                    <>Task Due Today</>
                  ) : closestTask.daysRemaining === 1 ? (
                    <>Task Due Tomorrow</>
                  ) : (
                    <>Task Due In {closestTask.daysRemaining} Days</>
                  ) }
                  <hr></hr>
                  {closestTask?.title}
                </h3>
                <img
                  src={womanImage}
                  alt="A woman writing on a notepad."
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
      <Container className={styles.TitleContainer}>
        <h1 className={`text-center ${styles.BigTitle}`}>Forget Me Not</h1>
      </Container> 
      {renderContent()} 
    </>
  );
};

export default HomePage;
