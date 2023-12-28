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
import { useHistory, Redirect } from "react-router-dom";
import officeTeamImage from "../../assets/office-team.jpg"

const ProjectEditForm = ({ location }) => {
  const projectData = location.state ? location.state.projectData || {} : {};
  const [ errors, setErrors ] = useState({});
  const [ friendList, setFriendList ] = useState([]);

  const [formData, setFormData] = useState({
    title: projectData.title || "",
    summary: projectData.summary || "",
    dueDate: formatDate(projectData.due_date) || "",
    collaborators: projectData.collaborators.map((collaborator) => collaborator) || [],
    complete: projectData.complete || false,
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
    
    const updatedProject = {
      title: formData.title,
      summary: formData.summary,
      due_date: formData.dueDate,
      collaborators: formData.collaborators,
      complete: formData.complete,
    };

    if (!updatedProject.due_date) {
      setErrors({ dueDate: ['Due Date is required.'] });
      return;
    }

    try {
      await axiosReq.put(`/projects/${projectData.id}/`, updatedProject);
      history.push(`/projects/${projectData.id}`);
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
        <Form.Label>Project Title</Form.Label>
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
          value={formData.dueDate}
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
            type="checkbox"
            key={friend.id}
            id={friend.username}
            label={friend.username}
            value={friend.id}
            checked={formData.collaborators.includes(friend.id)}
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
    fetchData();
  }, [])

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
            >
            <div className="text-center">
              <h1 className="mt-5">Edit {projectData.title} project</h1>
              <img className={`${styles.Image} my-5`} src={officeTeamImage} alt="Man facing a project board" />
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

export default ProjectEditForm