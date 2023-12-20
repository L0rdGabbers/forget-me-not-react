import React, { useEffect, useState } from 'react';
import { axiosReq } from '../../api/axiosDefaults';
import { Container, Row, Col, Button, } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import styles from '../../styles/ProjectDetail.module.css'

const TaskDetail = ({ match }) => {
  const [task, setTask] = useState(null);
  const [errors, setErrors] = useState();

  const history = useHistory();

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const response = await axiosReq.get(
          `/tasks/${match.params.taskId}`
        );
        setTask(response.data);
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
          <Col className={`${styles.Container} col-md-6 col-sm-12 col-xsl-12`}>
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
              {task.collaborator_usernames.map((collaborator) => (
                <Col key={collaborator} className="col-md-4 col-sm-4">
                  <p>{collaborator}</p>
                </Col>
              ))}
            </Row>
          </Col>
          <Col
            className={`${styles.Container} col-md-6 col-sm-12`}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
            }}
          >
            <div className="mb-2" style={{ alignSelf: "center" }}>
              <Button variant="success">Complete</Button>
            </div>
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
  );
};

export default TaskDetail