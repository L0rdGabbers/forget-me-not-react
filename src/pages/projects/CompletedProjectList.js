// CompletedProjectList.js
// Component for rendering a list of completed projects.

import React, { useEffect, useState } from 'react';
import { axiosReq } from '../../api/axiosDefaults';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link, useHistory } from 'react-router-dom';

import btnStyles from '../../styles/Button.module.css';
import listStyles from '../../styles/EmptyLists.module.css';
import appStyles from '../../App.module.css';

// Component for rendering a list of completed projects.
const CompletedProjectList = () => {
  // State to manage the list of completed projects and loading state
  const [projectList, setProjectList] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  // React Router history object
  const history = useHistory();

  // useEffect to fetch completed projects data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching projects data
        const response = await axiosReq.get(`/projects/`);
        if (response.status === 200) {
          // Filtering completed projects
          const completedProjects = response.data.filter(project => project.complete === true);
          setProjectList(completedProjects);
          setDataLoaded(true);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    // Fetching data on component mount
    fetchData();
  }, []);

  // Function to handle navigation to project creation page
  const handleProjectCreateLink = () => {
    history.push('/projects/create');
  }

  // Function to render the list of completed projects when there are projects
  const hasProjects = () => {
    return (
      <div>
        <h1>Completed Projects</h1>
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
                  <p>Collaborators: {project.collaborators.length}</p>
                </Col>
                <Col>
                  <Link to={`/projects/${project.id}`}>
                    <Button className={btnStyles.Button}>Open Project</Button>
                  </Link>
                </Col>
              </Row>
            </Container>
          </div>
        ))}
      </div>
    );
  }

  // Function to render a message when there are no completed projects
  const hasNoProjects = () => {
    return (
      <Container
        className={`${listStyles.Container} d-flex flex-column align-items-center justify-content-center`}
      >
        <Row className={`d-flex flex-column align-items-center my-5`}>
          <h1 className={appStyles.Header}>
            You have not completed any projects.
          </h1>
        </Row>
        <Row className={`d-flex justify-content-center`}>
          <Button
            className={btnStyles.Button}
            onClick={handleProjectCreateLink}
          >
            Click Here to Create a Project
          </Button>
        </Row>
      </Container>
    );
  }

  // Rendering the component based on data availability and loading state
  return dataLoaded && projectList.length !== 0 ? hasProjects() : dataLoaded ? hasNoProjects() : (<p>Loading...</p>);
}

// Exporting the CompletedProjectList component
export default CompletedProjectList;
