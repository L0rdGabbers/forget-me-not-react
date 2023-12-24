import React, { useState, useEffect } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Alert } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import { useHistory } from "react-router-dom";

import styles from "../../styles/ProjectCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css"
import taskEditImage from "../../assets/task-edit.jpg"

const TaskEditForm = ({ location }) => {
  const taskData = location.state.taskData || {};
  const [ errors, setErrors ] = useState({});
  const [ assigneeList, setAssigneeList ] = useState([]);

  const importanceChoices = [
    { value: 'low', label: 'Low' },
    { value: 'moderate', label: 'Moderate' },
    { value: 'crucial', label: 'Crucial' },
  ];

  const [formData, setFormData] = useState({
    title: taskData.title || "",
    summary: taskData.summary || "",
    dueDate: formatDate(taskData.due_date) || "",
    importance: taskData.importance,
    project: taskData.project,
    collaborators: taskData.collaborators.map((collaborator) => collaborator) || [],
    complete: taskData.complete || false,
  });

  const history = useHistory();

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleCheck = (event) => {
    const collaboratorId = Number(event.target.value);
    console.log(collaboratorId)
  
    setFormData((prevData) => ({
      ...prevData,
      collaborators: prevData.collaborators.includes(collaboratorId)
        ? prevData.collaborators.filter((c) => c !== collaboratorId)
        : [...prevData.collaborators, collaboratorId],
    }));
  };
  
  

  const handleCompleteCheck = (event) => {
    setFormData({
      ...formData,
      complete: event.target.checked,
    });
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const updatedTask = {
      title: formData.title,
      summary: formData.summary,
      due_date: formData.dueDate,
      collaborators: formData.collaborators,
      complete: formData.complete,
      project: formData.project
    };

    try {
      await axiosReq.put(`/tasks/${taskData.id}/`, updatedTask);
      history.push(`/tasks/${taskData.id}`);
    } catch (err) {
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
      if (err.response?.status === 403) {
        history.push('/forbidden')
      }
    }
  };

  function formatDate(dateString) {
    const originalDate = new Date(dateString);
    const year = originalDate.getFullYear();
    const month = String(originalDate.getMonth() + 1).padStart(2, '0');
    const day = String(originalDate.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }
  
  
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

  useEffect(() => {
    const fetchData = async () => {
      try {
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
          console.log(assigneeList);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log("Task Data:", taskData)
    console.log("Form Data:", formData)
    console.log("Assignee List:", assigneeList)
  }, [taskData, assigneeList])

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

export default TaskEditForm