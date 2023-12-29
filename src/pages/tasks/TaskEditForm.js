// TaskEditForm.js
// Component for editing details of a task

import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import { axiosReq } from "../../api/axiosDefaults";
import { useHistory } from "react-router-dom";

import styles from "../../styles/ProjectTaskCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import taskEditImage from "../../assets/task-edit.jpg";

const TaskEditForm = ({ location }) => {
  // Extracting task data from the location state
  const taskData = location.state ? location.state.taskData || {} : {};
  
  // States for form data, errors, and assignee list
  const [errors, setErrors] = useState({});
  const [assigneeList, setAssigneeList] = useState([]);

  // Importance choices
  const importanceChoices = [
    { value: "low", label: "Low" },
    { value: "moderate", label: "Moderate" },
    { value: "crucial", label: "Crucial" },
  ];

  // Initial form data based on the task details
  const [formData, setFormData] = useState({
    title: taskData.title || "",
    summary: taskData.summary || "",
    dueDate: formatDate(taskData.due_date) || "",
    importance: taskData.importance,
    project: taskData.project,
    collaborators: taskData.collaborators ? taskData.collaborators.map((collaborator) => collaborator) : [],
    complete: taskData.complete || false,
  });

  // React Router history object
  const history = useHistory();

  // Event handler for form input changes
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  // Event handler for collaborator checkbox changes
  const handleCheck = (event) => {
    const collaboratorId = Number(event.target.value);

    setFormData((prevData) => ({
      ...prevData,
      collaborators: prevData.collaborators.includes(collaboratorId)
        ? prevData.collaborators.filter((c) => c !== collaboratorId)
        : [...prevData.collaborators, collaboratorId],
    }));
  };

  // Event handler for complete checkbox changes
  const handleCompleteCheck = (event) => {
    setFormData({
      ...formData,
      complete: event.target.checked,
    });
  };

  // Event handler for form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Creating updated task object
    const updatedTask = {
      title: formData.title,
      summary: formData.summary,
      due_date: formData.dueDate,
      collaborators: formData.collaborators,
      complete: formData.complete,
      project: formData.project,
    };

    // Validating due date presence
    if (!updatedTask.due_date) {
      setErrors({ dueDate: ["Due Date is required."] });
      return;
    }

    try {
      // Making a PUT request to update the task
      await axiosReq.put(`/tasks/${taskData.id}/`, updatedTask);
      // Redirecting to the task details page
      history.push(`/tasks/${taskData.id}`);
    } catch (err) {
      // Handling errors and updating state
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
      // Redirecting to the forbidden page if the user doesn't have permission
      if (err.response?.status === 403) {
        history.push('/forbidden');
      }
    }
  };

  // Function to format date string
  function formatDate(dateString) {
    const originalDate = new Date(dateString);
    const year = originalDate.getFullYear();
    const month = String(originalDate.getMonth() + 1).padStart(2, '0');
    const day = String(originalDate.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  // JSX for text fields and alerts
  const textFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label>Task Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={formData.title}
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
          value={formData.summary}
        ></Form.Control>
      </Form.Group>
      {errors?.summary?.map((message, idx) => (
        <Alert variant="warning" key={`${idx}-${message}`}>
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label>Due Date</Form.Label>
        <Form.Control
          type="date"
          name="dueDate"
          onChange={handleChange}
          value={formData.dueDate}
        ></Form.Control>
      </Form.Group>
      {errors?.dueDate?.map((message, idx) => (
        <Alert variant="warning" key={`${idx}-${message}`}>
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
        <Form.Label>Collaborators</Form.Label>
        {assigneeList.map((assignee, index) => (
          <Form.Check
            type="checkbox"
            key={`${index}-${assignee.id}`}
            id={assignee.username}
            label={assignee.username}
            value={assignee.id}
            checked={formData.collaborators.includes(assignee.id)}
            onChange={handleCheck}
          />
        ))}
      </Form.Group>
      <Form.Group>
        <Form.Label>Complete</Form.Label>
        <Form.Check
          type="checkbox"
          id="complete"
          checked={formData.complete}
          onChange={handleCompleteCheck}
        />
      </Form.Group>
    </div>
  );

  // JSX for submit buttons
  const submitButtons = (
    <>
      <Row className="justify-content-center">
        <Button className={btnStyles.Button} type="submit">
          Update
        </Button>
      </Row>
      <Row className="justify-content-center">
        <Button className={btnStyles.Button} onClick={() => history.goBack()}>
          Cancel
        </Button>
      </Row>
    </>
  );

  // Fetching assignee data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!taskData.collaborators) {
          // Redirect to Error404 if location.state is not available
          history.push('/error404');
          return;
        }
        // Making a GET request to get task details
        const task = await axiosReq.get(`/tasks/${taskData.id}`);
        if (task.status === 200) {
          const owner = {
            id: task.data.profile_id,
            username: task.data.owner,
          };

          const collaborators = task.data.collaborators;

          const profilesPromises = collaborators.map((id) =>
            axiosReq.get(`/profiles/${id}/`)
          );
          const profilesResponses = await Promise.all(profilesPromises);
          const profilesData = profilesResponses.map(
            (profileResponse) => profileResponse.data
          );

          let combinedAssignees = profilesData.map((profile) => ({
            id: profile.id,
            username: profile.owner,
          }));

          const isOwnerInCollaborators = collaborators.includes(owner.id);

          if (isOwnerInCollaborators) {
            combinedAssignees = combinedAssignees.filter(
              (assignee) => assignee.username !== owner.username
            );
          }

          setAssigneeList([owner, ...combinedAssignees]);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  // JSX for the entire component
  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <div className="text-center">
              <h1 className="mt-5">Edit {taskData.title}</h1>
              <img
                className={`${styles.Image} my-5`}
                src={taskEditImage}
                alt="Man facing a project board"
              />
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

export default TaskEditForm;
