import React, { useEffect, useState } from 'react';
import { axiosReq } from '../../api/axiosDefaults';
import { Container, Row, Col, Button, } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

import styles from '../../styles/ProjectDetail.module.css'
import btnStyles from '../../styles/Button.module.css'
import { useCurrentUser } from '../../contexts/CurrentUserContext';

const ProjectDetail = ({ match }) => {
  const [project, setProject] = useState(null);
  const [ errors, setErrors ] = useState();
  const currentUser = useCurrentUser();

  const [ timeRemaining, setTimeRemaining ] = useState(null);

  const history = useHistory();

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await axiosReq.get(`/projects/${match.params.projectId}`);
        const dueDateObject = new Date(response.data.due_date);
        const currentDate = new Date();
        const timeDifference = dueDateObject.getTime() - currentDate.getTime();
        const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
        setTimeRemaining(daysDifference)
        setProject(response.data);
      } catch (error) {
        console.error('Error fetching project details:', error);
      }
    };

    fetchProjectDetails();
  }, [match.params.projectId]);

  if (!project) {
    return <p>Loading...</p>;
  } else {
    console.log(project)
  }

  const handleAddTask = () => {
    history.push({
        pathname:'/tasks/create',
        state: {projectId: project.id}
    })
  }

  const handleEditClick = () => {
    history.push({
      pathname: `/projects/edit/${project.id}`,
      state: { projectData: project },
    });
  };

  const handleDelete = async () => {
    try {
      await axiosReq.delete(`/projects/${project.id}/`)
      history.push('/deleted')
    } catch (err) {
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
      if (err.response?.status === 403) {
        history.push('/forbidden')
      }
    }
  };

  return (
    <>
      <div>
        <Container fluid className={`${styles.Container}`}>
          <Row>
            <Col>
              <h2>{project.title}</h2>
            </Col>
          </Row>
          <Row>
            <Col md={3} className="mx-4">
              <p>Created On: {project.created_at}</p>
            </Col>
            <Col md={3} className="mx-4">
              <p>Last Updated: {project.updated_at}</p>
            </Col>
            <Col md={3} className="mx-4">
              <p>Due On: {project.due_date}</p>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row>
            <Col
              className={`${styles.Container} ${styles.MiddleContainer} col-md-6 col-sm-12 col-xsl-12 pt-4`}
            >
              <h4>Summary</h4>
              <p>{project.summary}</p>
              <h4>Owner</h4>
              <p>{project.owner}</p>
              <h4>Collaborators</h4>
              <Row>
                {project.collaborator_details.map((collaborator) => (
                  <Col key={collaborator.id} className="col-md-4 col-sm-4">
                    {collaborator.id !== currentUser.id ? (
                      <>
                        <Link
                          to={{
                            pathname: `/profiles/${collaborator.id}`,
                            state: { profileData: collaborator },
                          }}
                        >
                          <p
                            className={styles.TextLink}
                          >
                            {collaborator.collaborator_username}
                          </p>
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link
                          to={{
                            pathname: `/myprofile/`,
                            state: { profileData: currentUser },
                          }}
                        >
                          <Button
                            className={`${btnStyles.Button} ${btnStyles.Sml}`}
                          >
                            {collaborator.collaborator_username}
                          </Button>
                        </Link>
                      </>
                    )}
                  </Col>
                ))}
              </Row>
            </Col>
            <Col
              className={`${styles.Container} col-md-6 col-sm-12 pt-4 text-center`}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
              }}
            >
              {project.complete === false && timeRemaining > 0 ? (
                <h4>
                  This project is due in {timeRemaining} day
                  {timeRemaining !== 1 && "s"}.
                </h4>
              ) : project.complete === false && timeRemaining === 0 ? (
                <h4>This project is due today</h4>
              ) : project.complete === false && timeRemaining < 0 ? (
                <h4> This project is overdue.</h4>
              ) : project.complete ? (
                <h4>This project has been completed by the owner.</h4>
              ) : null}
              {project.complete === false ? (
                <>
                  <div className="mb-5" style={{ textAlign: "left" }}>
                    <h4>Tasks</h4>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        justifyContent: "flex-start",
                      }}
                    >
                      {project.uncompleted_tasks.length > 0 ? (
                        <>
                          <h5>Uncompleted Tasks</h5>
                          {project.uncompleted_tasks.map((task) => (
                            <Link to={`/tasks/${task.id}`} key={task.id}>
                              <Button
                                className={`${btnStyles.Button} ${btnStyles.Sml}`}
                              >
                                {task.name}
                              </Button>
                            </Link>
                          ))}
                        </>
                      ) : (
                        <p className="mt-4" style={{ margin: "auto" }}>
                          No uncompleted tasks.
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mb-5" style={{ textAlign: "left" }}>
                    {project.completed_tasks.length > 0 ? (
                      <>
                        <h4>Completed Tasks</h4>
                        {project.completed_tasks.map((task) => (
                          <Link to={`/tasks/${task.id}`} key={task.id}>
                            <Button
                              className={`${btnStyles.Button} ${btnStyles.Sml}`}
                            >
                              {task.name}
                            </Button>
                          </Link>
                        ))}
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="mb-2" style={{ alignSelf: "center" }}>
                    <Button
                      onClick={handleAddTask}
                      className={`${btnStyles.Button} ${btnStyles.Sml}`}
                    >
                      Add Task
                    </Button>
                  </div>
                </>
              ) : null}
            </Col>
          </Row>
        </Container>

        <Container fluid className={styles.Container}>
          <Row>
            <Button variant="warning" onClick={handleEditClick}>
              Edit Details
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default ProjectDetail;