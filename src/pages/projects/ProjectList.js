import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { axiosReq } from '../../api/axiosDefaults';
import { Link } from 'react-router-dom';

import btnStyles from '../../styles/Button.module.css'

const ProjectList = () => {
  const [ projectList, setProjectList ] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosReq.get(`/projects/`);
        if (response.status === 200) {
          const completedProjects = response.data.filter(project => project.complete === false);
          setProjectList(completedProjects);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Project List</h1>
      {projectList.map((project) => (
        <div
          key={project.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
            backgroundColor: "#fff",
          }}
        >
          <Container>
            <Row>
              <Col>
                <h2>
                  <Link to={`/projects/${project.id}`}>{project.title}</Link>
                </h2>
              </Col>
            </Row>
            <Row>
              <Col>
                <p>Due: {project.due_date}</p>
                <p>Last Updated: {project.updated_at}</p>
                {project.is_owner ? (
                  <p>Your role: Project Owner</p>
                ) : (
                  <p>Your role: Collaborator</p>
                )}
              </Col>
              <Col>
                <p>Tasks remaining: {project.uncompleted_task_count}</p>
                <p>Tasks completed: {project.completed_task_count}</p>
              </Col>
              <Col>
                <Link to={`/projects/${project.id}`}>
                  <Button className={btnStyles.Button}>
                    Open Project
                  </Button>
                </Link>
              </Col>
            </Row>
          </Container>
        </div>
      ))}
    </div>
  );
}

export default ProjectList