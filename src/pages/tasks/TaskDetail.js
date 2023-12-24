import React, { useEffect, useState } from 'react';
import { axiosReq } from '../../api/axiosDefaults';
import { Container, Row, Col, Button, } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useCurrentUser } from '../../contexts/CurrentUserContext';

import styles from '../../styles/ProjectDetail.module.css'
import btnStyles from '../../styles/Button.module.css'

const TaskDetail = ({ match }) => {
  const [ task, setTask ] = useState(null);
  const [ errors, setErrors ] = useState();
  const [ timeRemaining, setTimeRemaining ] = useState(null);
  const [ importance, setImportance ] = useState(null);

  const currentUser = useCurrentUser();

  const history = useHistory();

  function formatDate(dateString) {
    const originalDate = new Date(dateString);
    const year = originalDate.getFullYear();
    const month = String(originalDate.getMonth() + 1).padStart(2, '0');
    const day = String(originalDate.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const response = await axiosReq.get(
          `/tasks/${match.params.taskId}`
        );
        const dueDateObject = new Date(response.data.due_date);
        const currentDate = new Date();
        const timeDifference = dueDateObject.getTime() - currentDate.getTime();
        const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
        const upperCaseStr = response.data.importance.charAt(0).toUpperCase() + response.data.importance.slice(1);
        setTask(response.data);
        setTimeRemaining(daysDifference)
        setImportance(upperCaseStr)
      } catch (error) {
        console.error("Error fetching task details:", error);
      }
    };

    fetchTaskDetails();
  }, [match.params.taskId]);

  if (!task) {
    return <p>Loading...</p>;
  } else {
    console.log(task);
  }

  const handleEditClick = () => {
    history.push({
      pathname: `/tasks/edit/${task.id}`,
      state: { taskData: task },
    });
  };

  const handleComplete = async () => {
    try {
      const response = await axiosReq.put(`/tasks/${task.id}/`, { ...task, complete: true, due_date: formatDate(task.due_date) });
      if (response.status === 200) {
        history.push(`/projects/${task.project}`)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleDelete = async () => {
    try {
      await axiosReq.delete(`/tasks/${task.id}/`);
      history.push("/delete");
    } catch (err) {
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
      if (err.response?.status === 403) {
        history.push("/forbidden");
      }
    }
  };

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
      {task.is_owner == true ? (
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
      ) : null}
    </div>
  );
};

export default TaskDetail