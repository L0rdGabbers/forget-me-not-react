// TaskDetail.js
// Component for displaying details of a specific task

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { axiosReq } from '../../api/axiosDefaults';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useCurrentUser } from '../../contexts/CurrentUserContext';

import styles from '../../styles/ProjectTaskDetail.module.css'

// Component for displaying details of a specific task
const TaskDetail = ({ match }) => {
  // States to store task details, errors, time remaining, and importance
  const [task, setTask] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [importance, setImportance] = useState(null);

  // Accessing the current user from context
  const currentUser = useCurrentUser();

  // React Router history object
  const history = useHistory();

  // Function to format date string
  function formatDate(dateString) {
    const originalDate = new Date(dateString);
    const year = originalDate.getFullYear();
    const month = String(originalDate.getMonth() + 1).padStart(2, '0');
    const day = String(originalDate.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }

  // Effect hook to fetch task details on component mount
  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        // Making a GET request to fetch task details
        const response = await axiosReq.get(
          `/tasks/${match.params.taskId}`
        );
        console.log(response.data)
        // Ensures user is a task owner or collaborator
        if (!response.data.is_owner && !response.data.is_collaborator) {
          history.push('/error404')
          return;
        }
        // Calculating time remaining for the task
        const dueDateObject = new Date(response.data.due_date);
        const currentDate = new Date();
        const timeDifference = dueDateObject.getTime() - currentDate.getTime();
        const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

        // Capitalizing the first letter of importance for display
        const upperCaseStr = response.data.importance.charAt(0).toUpperCase() + response.data.importance.slice(1);

        // Updating state with task details
        setTask(response.data);
        setTimeRemaining(daysDifference)
        setImportance(upperCaseStr)
      } catch (error) {
        console.error("Error fetching task details:", error);
        if (error.response && error.response.status === 404) {
          console.log('Project not found');
          history.push('/error404');
        } else {
          console.log('Unexpected error occurred:', error);
        }
      }
    };

    // Fetching task details
    fetchTaskDetails();
  }, [match.params.taskId]);

  // If task details are not loaded yet, display a loading message
  if (!task) {
    return <p>Loading...</p>;
  }

  // Event handler for clicking the "Edit" button
  const handleEditClick = () => {
    // Redirecting to the task edit page with task data in the state
    history.push({
      pathname: `/tasks/edit/${task.id}`,
      state: { taskData: task },
    });
  };

  // Event handler for marking the task as complete
  const handleComplete = async () => {
    try {
      // Making a PUT request to mark the task as complete
      const response = await axiosReq.put(`/tasks/${task.id}/`, { ...task, complete: true, due_date: formatDate(task.due_date) });
      // If the request is successful, redirecting to the project page
      if (response.status === 200) {
        history.push(`/projects/${task.project}`)
      }
    } catch (error) {
      console.error(error)
    }
  }

  // Event handler for deleting the task
  const handleDelete = async () => {
    try {
      // Making a DELETE request to delete the task
      await axiosReq.delete(`/tasks/${task.id}/`);
      // Redirecting to the delete page
      history.push(`/projects/${task.project}/`);
    } catch (err) {
      // Redirecting to the forbidden page if the user doesn't have permission
      if (err.response?.status === 403) {
        history.push("/forbidden");
      }
    }
  };

  // JSX for rendering the task details
  return (
    <div>
      <Container fluid className={styles.Container}>
        <Row>
          <Col>
            <h2>{task.title}</h2>
          </Col>
        </Row>
        <Row>
          <Col md={3} className="mx-4">
            <p>Created On: {task.created_at}</p>
          </Col>
          <Col md={3} className="mx-4">
            <p>Last Updated: {task.updated_at}</p>
          </Col>
          <Col md={3} className="mx-4">
            <p>Due On: {task.due_date}</p>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col className={`${styles.Container} ${styles.MiddleContainer} col-md-6 col-sm-12 col-xsl-12`}>
            <h4>Summary</h4>
            <p>{task.summary}</p>
            <h4>Owner</h4>
            <p>{task.owner}</p>
            {task.collaborators.length === 1 ? (
              <h4>Assignee</h4>
            ) : task.collaborators.length === 0 ? (
              <h4>No collaborators assigned</h4>
            ) : (
              <h4>Assignees</h4>
            )}
            <Row>
              {task.collaborator_details.map((collaborator) => (
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
                        <p
                          className={styles.TextLink}
                        >
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
            className={`${styles.Container} col-md-6 col-sm-12 text-center pt-2`}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
            }}
          >
            <h4>Task Importance: {importance}</h4>
            {task.complete === false && timeRemaining > 0 ? (
              <h4>
                This task is due in {timeRemaining} day
                {timeRemaining !== 1 && "s"}.
              </h4>
            ) : task.complete === false && timeRemaining === 0 ? (
              <h4>This task is due today</h4>
            ) : task.complete === false && timeRemaining < 0 ? (
              <h4>This task is overdue</h4>
            ) : task.complete === true ? (
              <h4>This task has been completed</h4>
            ) : null}
            {task.complete === false ? (
              <div className="mb-2" style={{ alignSelf: "center" }}>
                <Button onClick={handleComplete} variant="success">
                  Complete
                </Button>
              </div>
            ) : null}
          </Col>
        </Row>
      </Container>
      {/* Displaying edit and delete buttons for the task owner */}
      {task.is_owner == true ? (
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
      ) : null}
    </div>
  );
};

TaskDetail.propTypes = {
  match: PropTypes.object,
};

// Exporting the TaskDetail component
export default TaskDetail
