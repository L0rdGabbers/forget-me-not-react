import React, { useState, useEffect } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Alert } from "react-bootstrap";

import styles from "../../styles/ProjectCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css"
import { axiosReq } from "../../api/axiosDefaults";
import { useHistory } from "react-router-dom";

const ProjectCreateForm = () => {
  const [ errors, setErrors ] = useState({});
  const [ friendList, setFriendList ] = useState([]);

  const [ projectData, setProjectData ] = useState({
    title: "",
    summary: "",
    dueDate: "",
    collaborators: []
  });

  const [ selectedCollaborators, setSelectedCollaborators ] = useState([]);

  const { title, summary, dueDate } = projectData;

  const history = useHistory();

  const handleChange = (event) => {
    setProjectData({
      ...projectData,
      [event.target.name]: event.target.value,
    });
    console.log(projectData)
  };

  const handleCheck = (event) => {
    const { value } = event.target;
    setSelectedCollaborators((prevSelectedCollaborators) =>
      prevSelectedCollaborators.includes(value)
        ? prevSelectedCollaborators.filter((c) => c !== value)
        : [...prevSelectedCollaborators, parseInt(value, 10)]
    );
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", title)
    formData.append("summary", summary)
    formData.append("dueDate", dueDate)
    selectedCollaborators.forEach((collaboratorId) => {
      formData.append("collaborators", collaboratorId);
    });
    try {
      const data = await axiosReq.post('/projects/', formData)
      if (data.status === 201) {
        console.log("Project created", formData)
        history.push('/')
      }
    } catch(error) {
      console.error("Project failed to create:", error)
    }
  }

  
  
  const textFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label>Project Title</Form.Label>
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
        <Form.Label>Collaborators</Form.Label>
        {friendList.map((friend) => (
          <Form.Check
          key={friend.username}
          type="checkbox"
          id={friend.username}
          label={friend.username}
          value={friend.profile_id}
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
    let isMounted = true;
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
    return () => {
      isMounted = false;
    }
  }, [])

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
            >
            <Form.Group className="text-center">
                <div>
                    <h1>PLACEHOLDER FOR IMAGE</h1>
                </div>
                <div className="d-md-none">{textFields}</div>
                <div>{submitButtons}</div>
            </Form.Group>
          </Container>
        </Col>
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default ProjectCreateForm