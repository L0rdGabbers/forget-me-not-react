import React, { useState, useEffect } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

import styles from "../../styles/ProjectCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css"
import { axiosReq } from "../../api/axiosDefaults";
import { useHistory, useLocation } from "react-router-dom";
import postItImage from "../../assets/post-it.jpg"

const TaskCreateForm = () => {
  const [ errors, setErrors ] = useState({});
  const [ assigneeList, setAssigneeList ] = useState([]);

  const location = useLocation();
  const projectId = location.state?.projectId || null;

  const [ project, setProject ] = useState([]);

  const importanceChoices = [
    { value: 'low', label: 'Low' },
    { value: 'moderate', label: 'Moderate' },
    { value: 'crucial', label: 'Crucial' },
  ];

  const [ taskData, setTaskData ] = useState({
    title: "",
    summary: "",
    dueDate: "",
    project: "",
    importance: "",
    collaborators: []
  });

  const { title, summary, dueDate, importance } = taskData;

  const history = useHistory();

  const handleChange = (event) => {
    setTaskData({
      ...taskData,
      [event.target.name]: event.target.value,
    });
  };

  const handleCheck = (event) => {
    const collaboratorId = event.target.value;
  
    setTaskData((prevData) => ({
      ...prevData,
      collaborators: prevData.collaborators.includes(collaboratorId)
        ? prevData.collaborators.filter((c) => c !== collaboratorId)
        : [...prevData.collaborators, collaboratorId],
    }));
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    const collaboratorsArray = taskData.collaborators;

    collaboratorsArray.forEach((collaboratorId) => {
        formData.append("collaborators", collaboratorId);
    });
    formData.append("title", title);
    formData.append("summary", summary);
    formData.append("due_date", dueDate);
    formData.append("project", projectId);
    formData.append("importance", importance)
    if (!taskData.dueDate) {
      setErrors({ dueDate: ['Due Date is required.'] });
      return;
    }
    try {
      await axiosReq.post("/tasks/", formData);
      history.push(`/projects/${projectId}`);
    } catch (err) {
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  
  
  const textFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label>Task Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          onChange={handleChange}
          >
        </Form.Control>
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
          >
        </Form.Control>
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
          >
        </Form.Control>
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const project = await axiosReq.get(`/projects/${projectId}`)
        if (project.status === 200) {
          const projectName = project.data.title;
          setProject(projectName)
            
          const owner = {
              id: project.data.profile_id,
              username: project.data.owner,
          }
          const collaborators = project.data.collaborators;

          const profilesPromises = collaborators.map((id) =>
            axiosReq.get(`/profiles/${id}/`)
          );
          const profilesResponses = await Promise.all(profilesPromises);
          const profilesData = profilesResponses.map(
            (profileResponse) => profileResponse.data
          );

          const combinedAssignees = profilesData.map((profile) => ({
            id: profile.id,
            username: profile.owner,
          }));

          setAssigneeList([owner, ...combinedAssignees]);
        }
      } catch(error) {
        console.error(error)
      }
    };
    fetchData();
  }, [])

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

export default TaskCreateForm