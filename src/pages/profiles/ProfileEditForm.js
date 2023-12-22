import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { Form } from "react-bootstrap";

import styles from "../../styles/ProfilePage.module.css"
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser, useSetCurrentUser } from "../../contexts/CurrentUserContext";

function ProfileEditForm() {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const [ hasLoaded, setHasLoaded ] = useState(false);

  const [ newImage, setNewImage ] = useState("");
  const [ previewImage, setPreviewImage ] = useState("") 
  const [ newBio, setNewBio ] = useState("");



  const history = useHistory();

  useEffect(() => {

    if (currentUser !== null) {
      console.log("Current User:", currentUser);
      setHasLoaded(true);
      setNewBio(currentUser.bio)
      setPreviewImage(currentUser?.image || currentUser?.profile_image || "")
    }
  
    return () => {
      setHasLoaded(false);
    };
  }, [currentUser])

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      const imageUrl = URL.createObjectURL(selectedImage);
      setPreviewImage(imageUrl);
      setNewImage(selectedImage);
      return () => URL.revokeObjectURL(imageUrl);
    }
  };

  const handleBioChange = (event) => {
    setNewBio(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    if (newImage) {
      formData.append("image", newImage);
    }
    formData.append("bio", newBio);

    try {
      const response = await axiosReq.put(`/profiles/${currentUser.id}/`, formData);
      setCurrentUser(response.data);
      history.push({
        pathname: `/profiles/${currentUser.id}`,
        state: {profileData: response.data}
      });
      console.log(formData)
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
  

  const textFields = (
    <div className="text-center">
      <Form.Group>
        <label htmlFor="image">
          <img
            className={styles.ProfilePageAvatar}
            src={previewImage}
          />
        </label>
        <Form.File
          id="image"
          label="Change Profile Image"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Write something interesting about yourself..."
          value={newBio}
          onChange={handleBioChange}
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

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <div>
              <h1>PLACEHOLDER FOR IMAGE</h1>
            </div>
            <div className="d-md-none">{textFields}</div>
            <div>{submitButtons}</div>
          </Container>
        </Col>
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default ProfileEditForm;