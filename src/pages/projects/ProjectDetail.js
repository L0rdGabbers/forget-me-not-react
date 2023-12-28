import React, { useEffect, useState } from 'react';
import { axiosReq } from '../../api/axiosDefaults';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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
              sm={12}
              md={6}
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
                          <p className={styles.TextLink}>
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
                          <p className={styles.TextLink}>
                            {collaborator.collaborator_username}
                          </p>
                        </Link>
                      </>
                    )}
                  </Col>
                ))}
              </Row>
            </Col>
            <Col
              sm={12}
              md={6}
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
                    <hr></hr>
                    <h5 style={{ textAlign: "center" }}>Uncompleted Tasks</h5>
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
                          <Row>
                            {project.uncompleted_tasks.map((task) => (
                              <Col
                                key={task.id}
                                className="col-md-12 col-sm-12"
                              >
                                <Link
                                  to={{
                                    pathname: `/tasks/${task.id}`,
                                  }}
                                >
                                  <p className={styles.TextLink}>{task.name}</p>
                                </Link>
                              </Col>
                            ))}
                          </Row>
                        </>
                      ) : (
                        <p className="mt-4" style={{ margin: "auto" }}>
                          No uncompleted tasks.
                        </p>
                      )}
                    </div>
                  </div>
                  <h5>Completed Tasks</h5>
                  <div style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        justifyContent: "flex-start",
                      }}>
                    {project.completed_tasks.length > 0 ? (
                      <>
                        <Row>
                          {project.completed_tasks.map((task) => (
                            <Col key={task.id} className="col-md-12 col-sm-12">
                              <Link
                                to={{
                                  pathname: `/tasks/${task.id}`,
                                }}
                              >
                                <p className={styles.TextLink}>{task.name}</p>
                              </Link>
                            </Col>
                          ))}
                        </Row>
                      </>
                    ) : (
                      <p className="my-4" style={{ margin: "auto" }}>Your completed tasks will be listed here.</p>
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

        {project.owner === currentUser.username && (
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
        )}
      </div>
    </>
  );
};

export default ProjectDetail;