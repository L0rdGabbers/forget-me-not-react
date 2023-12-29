// ProjectList.js
// Component for displaying a list of projects

import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { axiosReq } from '../../api/axiosDefaults';
import { Link, useHistory } from 'react-router-dom';

import listStyles from '../../styles/EmptyLists.module.css'
import appStyles from '../../App.module.css'
import btnStyles from '../../styles/Button.module.css'

// Component for displaying a list of projects
const ProjectList = () => {
  // State to store the list of projects and data loading status
  const [projectList, setProjectList] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(null);

  // React Router history object
  const history = useHistory();

  // Fetching project data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Making a GET request to fetch the list of projects
        const response = await axiosReq.get(`/projects/`);
        // Checking if the request was successful
        if (response.status === 200) {
          // Filtering uncompleted projects from the response data
          const uncompletedProjects = response.data.filter(project => project.complete === false);
          // Updating state with the list of uncompleted projects
          setProjectList(uncompletedProjects);
          // Setting data loading status to true
          setDataLoaded(true);
        }
      } catch (error) {
        // Logging errors to the console
        console.error("Error fetching user data:", error);
      }
    };
    // Fetching project data on component mount
    fetchData();
  }, []);

  // Event handler for navigating to the project creation page
  const handleProjectCreateLink = () => {
    history.push('/projects/create');
  }

  // JSX for rendering when there are projects
  const hasProjects = () => (
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
                  <Button className={btnStyles.Button}>Open Project</Button>
                </Link>
              </Col>
            </Row>
          </Container>
        </div>
      ))}
    </div>
  );

  // JSX for rendering when there are no projects
  const hasNoProjects = () => (
    <Container
      className={`${listStyles.Container} d-flex flex-column align-items-center justify-content-center`}
    >
      <Row className={`d-flex flex-column align-items-center my-5`}>
        <h1 className={appStyles.Header}>
          You do not own or collaborate on any projects
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

  // Conditionally rendering either the list of projects or a message
  return dataLoaded && projectList.length !== 0 ? (
    hasProjects()
  ) : dataLoaded ? (
    hasNoProjects()
  ) : (
    <p>Loading...</p>
  );
}

// Exporting the ProjectList component
export default ProjectList
