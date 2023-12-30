// ProjectDetail.js
// Component for displaying details of a project

import React, { useEffect, useState } from 'react';
import { axiosReq } from '../../api/axiosDefaults';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link, useHistory } from 'react-router-dom';

import styles from '../../styles/ProjectTaskDetail.module.css'
import btnStyles from '../../styles/Button.module.css'
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { propTypes } from 'react-bootstrap/esm/Image';

// Component for displaying details of a project
const ProjectDetail = ({ match }) => {
  // State to manage project details and errors
  const [project, setProject] = useState(null);
  const currentUser = useCurrentUser();

  // State to manage time remaining for project due date
  const [timeRemaining, setTimeRemaining] = useState(null);

  // Function to format date string
  function formatDate(dateString) {
    const originalDate = new Date(dateString);
    const year = originalDate.getFullYear();
    const month = String(originalDate.getMonth() + 1).padStart(2, "0");
    const day = String(originalDate.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  // React Router history object
  const history = useHistory();

  // useEffect to fetch project details on component mount
  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        // Fetching project details using project ID from the route params
        const response = await axiosReq.get(`/projects/${match.params.projectId}`);
        // Checks to see if user is either the project owner or collaborator
        if (!response.data.is_owner && !response.data.is_collaborator) {
          history.push('/error404')
          return;
        }
        // Calculating time remaining for project due date
        const dueDateObject = new Date(response.data.due_date);
        const currentDate = new Date();
        const timeDifference = dueDateObject.getTime() - currentDate.getTime();
        const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
        setTimeRemaining(daysDifference)
        setProject(response.data);
      } catch (error) {
        console.error('Error fetching project details:', error);
        if (error.response && error.response.status === 404) {
          history.push('/error404');
        } else {
        }
      }
    };

    // Fetching project details
    fetchProjectDetails();
  }, [match.params.projectId, history]);

  // If project details are not yet loaded, show a loading message
  if (!project) {
    return <p>Loading...</p>;
  }

  // Event handler for navigating to the Add Task page
  const handleAddTask = () => {
    history.push({
        pathname:'/tasks/create',
        state: {projectId: project.id}
    });
  };

 // Event handler for marking the project as complete
 const handleComplete = async () => {
   try {
     // Making a PUT request to mark the project as complete
     const response = await axiosReq.put(`/projects/${project.id}/`, {
       ...project,
       complete: true,
       due_date: formatDate(project.due_date),
     });
     // If the request is successful, redirecting to the project page
     if (response.status === 200) {
       history.push(`/projects/completed`);
     }
   } catch (error) {
     console.error(error);
   }
 }

  // Event handler for navigating to the Edit Project page
  const handleEditClick = () => {
    history.push({
      pathname: `/projects/edit/${project.id}`,
      state: { projectData: project },
    });
  };

  // Event handler for deleting the project
  const handleDelete = async () => {
    try {
      // Making a DELETE request to delete the project
      await axiosReq.delete(`/projects/${project.id}/`);
      // Navigating to a specific route after successful deletion
      history.push('/deleted');
    } catch (err) {
      // Navigating to a specific route in case of a forbidden action
      if (err.response?.status === 403) {
        history.push('/forbidden');
      }
    }
  };

  // Rendering the component layout
  return (
    <>
      <div>
        {/* Container for project details */}
        <Container fluid className={`${styles.Container}`}>
          <Row>
            <Col>
              {/* Project title */}
              <h2>{project.title}</h2>
            </Col>
          </Row>
          <Row>
            {/* Project metadata: Created On, Last Updated, Due On */}
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

        {/* Container for project summary, owner, collaborators */}
        <Container>
          <Row>
            <Col
              sm={12}
              md={6}
              className={`${styles.Container} ${styles.MiddleContainer} col-md-6 col-sm-12 col-xsl-12 pt-4`}
            >
              {/* Project summary */}
              <h4>Summary</h4>
              <p>{project.summary}</p>
              {/* Project owner */}
              <h4>Owner</h4>
              <p>{project.owner}</p>
              {/* Collaborators */}
              <h4>Collaborators</h4>
              <Row>
                {/* Displaying collaborators with links to their profiles */}
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

            {/* Container for time remaining and task details */}
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
              {/* Displaying time remaining based on project due date */}
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

              {/* Displaying uncompleted and completed tasks */}
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
                                className="col-12"
                              >
                                {task.is_owner || task.is_collaborator ? (
                                  <>
                                    <Link
                                      to={{
                                        pathname: `/tasks/${task.id}`,
                                      }}
                                    >
                                      <p>
                                        <span className={styles.TextLink}>
                                          {task.name}
                                        </span>
                                        {task.is_collaborator && (
                                          <span className={styles.AssignedText}>
                                            {" "}
                                            - Assigned to You
                                          </span>
                                        )}
                                      </p>
                                    </Link>
                                  </>
                                ) : (
                                  <p>{task.name}</p>
                                )}
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

                  {/* Displaying completed tasks */}
                  <h5>Completed Tasks</h5>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "wrap",
                      justifyContent: "flex-start",
                    }}
                  >
                    {project.completed_tasks.length > 0 ? (
                      <>
                        <Row>
                          {project.completed_tasks.map((task) => (
                            <Col key={task.id} className="col-12">
                              {task.is_owner || task.is_collaborator ? (
                                <>
                                  <Link
                                    to={{
                                      pathname: `/tasks/${task.id}`,
                                    }}
                                  >
                                    <p>
                                      <span className={styles.TextLink}>
                                        {task.name}
                                      </span>
                                      {task.is_collaborator && (
                                        <span className={styles.AssignedText}>
                                          {" "}
                                          - Assigned to You
                                        </span>
                                      )}
                                    </p>
                                  </Link>
                                </>
                              ) : (
                                <p>{task.name}</p>
                              )}
                            </Col>
                          ))}
                        </Row>
                      </>
                    ) : (
                      <p className="my-4" style={{ margin: "auto" }}>
                        Your completed tasks will be listed here.
                      </p>
                    )}
                  </div>

                  {/* Add Task button for project owner */}
                  <div className="mb-2" style={{ alignSelf: "center" }}>
                    {project.is_owner && (
                      <Button
                        onClick={handleAddTask}
                        className={`${btnStyles.Button} ${btnStyles.Sml}`}
                      >
                        Add Task
                      </Button>
                    )}
                  </div>
                </>
              ) : null}
            </Col>
          </Row>
        </Container>

        {/* Buttons for project owner */}
        {project.owner === currentUser.username && (
          <Container fluid className={`${styles.Container}`}>
            <Row className='justify-content-between'>
              {/* Submit, Edit and Delete buttons */}
              <Button variant="success" onClick={handleComplete}>Submit</Button>
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

ProjectDetail.propTypes = {
  match: propTypes.object
}

// Exporting the ProjectDetail component
export default ProjectDetail;
