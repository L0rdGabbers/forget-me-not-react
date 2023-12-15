import React from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import styles from "../../styles/ProjectCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css"

const ProjectCreateForm = () => {

  const textFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label>Project Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
        >
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Summary</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="summary"
        >
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Due Date</Form.Label>
        <Form.Control
          type="date"
          name="dueDate"
        >
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Collaborators</Form.Label>
        <Form.Check
          key="friendId1"
          type="checkbox"
          id="collaborator-friendId1"
          label="friend-username1"
        >
        </Form.Check>
        <Form.Check
          key="friendId2"
          type="checkbox"
          id="collaborator-friendId2"
          label="friend-username2"
        >
        </Form.Check>
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
        <Button className={btnStyles.Button} onClick={() => {}}>
          Cancel
        </Button>
      </Row>
    </>
  );

  return (
    <Form>
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