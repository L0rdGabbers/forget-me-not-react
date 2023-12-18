import React, { useEffect, useState } from 'react';
import { axiosReq } from '../../api/axiosDefaults';
import { Container, Row, Col, Button, } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

import styles from '../../styles/ProjectDetail.module.css'

const ProjectDetail = ({ match }) => {
  const [project, setProject] = useState(null);

  const history = useHistory();

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await axiosReq.get(`/projects/${match.params.projectId}`);
        setProject(response.data); // Assuming the API response contains project details
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

  return (
    <div>
      <Container fluid className={styles.Container}>
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
          <Col className={`${styles.Container} col-md-6 col-sm-12 col-xsl-12`}>
            <h4>Summary</h4>
            <p>{project.summary}</p>
            <h4>Owner</h4>
            <p>{project.owner}</p>
            <h4>Collaborators</h4>
            <Row>
              {project.collaborator_usernames.map((collaborator) => (
                <Col key={collaborator} className='col-md-4 col-sm-4'>
                  <p>{collaborator}</p>
                </Col>
              ))}
            </Row>
          </Col>
          <Col className={`${styles.Container} col-md-6 col-sm-12`}>
            <h4>Tasks</h4>
            {project.uncompleted_tasks.length > 0 ||
            project.completed_tasks.length > 0 ? (
              <ul>
                {project.uncompleted_tasks.map((task) => (
                  <li key={task.id}>
                    <Link to={`/tasks/${task.id}`}>
                      <p>{task.name}</p>
                    </Link>
                  </li>
                ))}
                {project.completed_tasks.map((task) => (
                  <li key={task.id}>
                    <Link to={`/tasks/${task.id}`}>
                      <p>{task.name}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No tasks assigned.</p>
            )}
            <Button variant="primary" onClick={handleAddTask}>
              Add Task
            </Button>
          </Col>
        </Row>
      </Container>

      <Container fluid className={styles.Container}>
        <Row>
          <Button variant="warning">Edit Details</Button>
          <Button variant="danger">Delete</Button>
        </Row>
      </Container>
    </div>
  );
};

export default ProjectDetail;