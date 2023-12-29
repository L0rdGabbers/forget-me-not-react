// TaskCreateForm.js
// Component for creating a new task
import React, { useState, useEffect } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

import styles from "../../styles/ProjectTaskCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css"
import { axiosReq } from "../../api/axiosDefaults";
import { useHistory, useLocation } from "react-router-dom";
import postItImage from "../../assets/post-it.jpg"

// Component for creating a new task
const TaskCreateForm = () => {
  // State to store form errors and the list of assignees
  const [errors, setErrors] = useState({});
  const [assigneeList, setAssigneeList] = useState([]);

  // Using React Router's location hook to get the projectId from the route
  const location = useLocation();
  const projectId = location.state?.projectId || null;

  // State to store the project data
  const [project, setProject] = useState([]);

  // Choices for the task importance dropdown
  const importanceChoices = [
    { value: 'low', label: 'Low' },
    { value: 'moderate', label: 'Moderate' },
    { value: 'crucial', label: 'Crucial' },
  ];

  // State to store the task data
  const [taskData, setTaskData] = useState({
    title: "",
    summary: "",
    dueDate: "",
    project: "",
    importance: "",
    collaborators: []
  });

  const { title, summary, dueDate, importance } = taskData;

  // React Router history object
  const history = useHistory();

  // Event handler for handling changes in form fields
  const handleChange = (event) => {
    setTaskData({
      ...taskData,
      [event.target.name]: event.target.value,
    });
  };

  // Event handler for handling checkbox changes for assignees
  const handleCheck = (event) => {
    const collaboratorId = event.target.value;
  
    setTaskData((prevData) => ({
      ...prevData,
      collaborators: prevData.collaborators.includes(collaboratorId)
        ? prevData.collaborators.filter((c) => c !== collaboratorId)
        : [...prevData.collaborators, collaboratorId],
    }));
  };

  // Event handler for handling form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    // Adding collaborators to the form data
    const collaboratorsArray = taskData.collaborators;
    collaboratorsArray.forEach((collaboratorId) => {
        formData.append("collaborators", collaboratorId);
    });

    // Adding other task details to the form data
    formData.append("title", title);
    formData.append("summary", summary);
    formData.append("due_date", dueDate);
    formData.append("project", projectId);
    formData.append("importance", importance)

    // Checking if due date is provided
    if (!taskData.dueDate) {
      setErrors({ dueDate: ['Due Date is required.'] });
      return;
    }

    try {
      // Making a POST request to create a new task
      await axiosReq.post("/tasks/", formData);
      // Redirecting to the project page after task creation
      history.push(`/projects/${projectId}`);
    } catch (err) {
      // Handling errors and updating state
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  // JSX for rendering form fields
  const textFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label>Task Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          onChange={handleChange}
        ></Form.Control>
      </Form.Group>
      {errors?.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label>Summary</Form.Label>
        <Form.Control
          onChange={handleChange}
          as="textarea"
          rows={6}
          name="summary"
        ></Form.Control>
      </Form.Group>
      {errors?.summary?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group controlId="importance">
        <Form.Label>Importance</Form.Label>
        <Form.Control as="select">
          {importanceChoices.map((choice) => (
            <option key={choice.value} value={choice.value}>
              {choice.label}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      {errors?.importance?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label>Due Date</Form.Label>
        <Form.Control
          type="date"
          name="dueDate"
          onChange={handleChange}
        ></Form.Control>
      </Form.Group>
      {errors?.dueDate?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label>Assignee</Form.Label>
        {assigneeList.map((assignee) => (
          <Form.Check
            key={assignee.id}
            type="checkbox"
            id={assignee.username}
            label={assignee.username}
            value={assignee.id}
            onChange={handleCheck}
          />
        ))}
      </Form.Group>
    </div>
  );
  
  // JSX for rendering form submission buttons
  const submitButtons = (
    <>
      <Row className="justify-content-center">
        <Button className={btnStyles.Button} type="submit">
          Create
        </Button>
      </Row>
      <Row className="justify-content-center">
        <Button className={btnStyles.Button} onClick={() => history.goBack()}>
          Cancel
        </Button>
      </Row>
    </>
  );

  // Fetching project data on component mount
  useEffect(() => {
    const fetchData = async () => {
      if (!location.state) {
        // Redirect to Error404 if location.state is not available
        history.push('/error404');
        return;
      }
      try {
        // Making a GET request to fetch project details
        const project = await axiosReq.get(`/projects/${projectId}`)
        // Checking if the request was successful
        if (project.status === 200) {
          // Extracting project name from the response
          const projectName = project.data.title;
          // Updating state with the project name
          setProject(projectName)
            
          // Creating an owner object with owner details
          const owner = {
            id: project.data.profile_id,
            username: project.data.owner,
          }

          // Extracting collaborator IDs from the response
          const collaborators = project.data.collaborators;

          // Fetching details of each collaborator using promises
          const profilesPromises = collaborators.map((id) =>
            axiosReq.get(`/profiles/${id}/`)
          );

          // Resolving all promises concurrently
          const profilesResponses = await Promise.all(profilesPromises);

          // Extracting data from each response
          const profilesData = profilesResponses.map(
            (profileResponse) => profileResponse.data
          );

          // Combining owner and collaborator details into a list
          const combinedAssignees = profilesData.map((profile) => ({
            id: profile.id,
            username: profile.owner,
          }));

          // Updating state with the list of assignees
          setAssigneeList([owner, ...combinedAssignees]);
        }
      } catch(error) {
        // Logging errors to the console
        console.error(error)
      }
    };
    // Fetching project data on component mount
    fetchData();
  }, [projectId])

  // JSX for rendering the entire component
  return (
    <>
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <div className="text-center">
              <h1 className="mt-5">Create new task for {project}</h1>
              <img className={`${styles.Image} my-5`} src={postItImage} alt="Man facing a project board" />
              <div className="d-md-none">{textFields}</div>
              <div>{submitButtons}</div>
            </div>
          </Container>
        </Col>
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
    </>
  );
}

// Exporting the TaskCreateForm component
export default TaskCreateForm
