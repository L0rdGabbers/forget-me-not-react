// ProjectCreateForm.js
// Component for rendering a form to create a new project.

import React, { useState, useEffect } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import { axiosReq } from "../../api/axiosDefaults";
import { useHistory } from "react-router-dom";

import styles from "../../styles/ProjectCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import projectStartupImage from "../../assets/project-startup.jpg";

// Component for rendering a form to create a new project.
const ProjectCreateForm = () => {
  // State to manage form errors and friend list
  const [errors, setErrors] = useState({});
  const [friendList, setFriendList] = useState([]);

  // State to manage project data
  const [projectData, setProjectData] = useState({
    title: "",
    summary: "",
    dueDate: "",
    collaborators: [],
  });

  // Destructuring project data for ease of use
  const { title, summary, dueDate } = projectData;

  // React Router history object
  const history = useHistory();

  // Event handler for input change
  const handleChange = (event) => {
    setProjectData({
      ...projectData,
      [event.target.name]: event.target.value,
    });
  };

  // Event handler for checkbox change
  const handleCheck = (event) => {
    const collaboratorId = event.target.value;
    const collaborator = friendList.find((friend) => friend.id === collaboratorId);
    const collaboratorUsername = collaborator ? collaborator.username : "";

    setProjectData((prevData) => ({
      ...prevData,
      collaborators: prevData.collaborators.some((c) => c.id === collaboratorId)
        ? prevData.collaborators.filter((c) => c.id !== collaboratorId)
        : [...prevData.collaborators, { id: collaboratorId, collaborator_username: collaboratorUsername }],
    }));
  };

  // Event handler for form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("summary", summary);
    formData.append("due_date", dueDate);
    projectData.collaborators.forEach((collaborator) => {
      formData.append("collaborators", collaborator.id);
    });

    // Validating dueDate and setting errors if it is empty
    if (!projectData.dueDate) {
      setErrors({ dueDate: ['Due Date is required.'] });
      return;
    }

    try {
      // Making a POST request to create a new project
      await axiosReq.post("/projects/", formData);
      history.push(`/projects/list`);
    } catch (err) {
      // Handling errors and setting them in the state
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  // JSX for text input fields
  const textFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label>Project Title</Form.Label>
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
        <Form.Label>Collaborators</Form.Label>
        {friendList.map((friend) => (
          <Form.Check
            key={friend.username}
            type="checkbox"
            id={friend.username}
            label={friend.username}
            value={friend.id}
            onChange={handleCheck}
          />
        ))}
      </Form.Group>
    </div>
  );

  // JSX for submit buttons
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

  // useEffect to fetch friend list data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching friend list data
        const friends = await axiosReq.get('/friends/')
        if (friends.status === 200) {
          const data = friends.data.friend_details;
          const dataArray = Object.values(data);
          setFriendList(dataArray)
        }
      } catch (error) {
        console.error( error)
        if (error.response?.status !== 401) {
          setErrors(error.response?.data);
        }
      }
    };
    // Fetching data on component mount
    fetchData();
  }, []);

  // Rendering the component layout
  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <div className="text-center">
              <h1 className="mt-5">Create New Project</h1>
              <img className={`${styles.Image} my-5`} src={projectStartupImage} alt="Man facing a project board" />
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
  );
}

// Exporting the ProjectCreateForm component
export default ProjectCreateForm;
