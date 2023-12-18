import React, { useEffect, useState } from 'react'
import { axiosReq } from '../../api/axiosDefaults';
import { Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProjectList = () => {
  const [ projectList, setProjectList ] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
        try {
          const response = await axiosReq.get(`/projects/`);
          if (response.status === 200) {
            setProjectList(response.data);
            console.log(projectList)
          };
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
    };
    fetchData();

    return () => {
      isMounted = false;
    }
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
          }}
        >
          <Container>
            <Row>
              <Col>
                <h2>
                  <Link to={`/projects/details/${project.id}`}>
                    {project.title}
                  </Link>
                </h2>
              </Col>
            </Row>
            <Row>
              <Col>
                <p>Due: {project.due_date}</p>
                <p>Last Updated: {project.updated_at}</p>
                <p>Tasks remaining: {project.uncompleted_task_count}</p>
                <p>Tasks completed: {project.completed_task_count}</p>
              </Col>
              <Col>
              {project.is_owner ? (
                  <p>Your role: Project Owner</p>
                ) : (
                  <p>Your role: Collaborator</p>
                )}
              </Col>
            </Row>
          </Container>
        </div>
      ))}
    </div>
  );
}

export default ProjectList