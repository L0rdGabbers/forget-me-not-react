// ProfileEditForm.js
// Component for rendering the form to edit user profile details.

import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Button  from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser, useSetCurrentUser } from "../../contexts/CurrentUserContext";

import styles from "../../styles/ProfilePage.module.css"
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import silhouetteImage from "../../assets/silhouette.jpg"

// Component for rendering the form to edit user profile details.
function ProfileEditForm() {
  // Fetching the current user and the function to set the current user
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  // State to manage the new image, preview image, and bio
  const [ newImage, setNewImage ] = useState("");
  const [ previewImage, setPreviewImage ] = useState("") 
  const [ newBio, setNewBio ] = useState("");

  // Getting the history object from react-router-dom
  const history = useHistory();

  // useEffect to run code when the component mounts and when the currentUser changes
  useEffect(() => {
    // Checking if currentUser is not null
    if (currentUser !== null) {
      // Setting the newBio and previewImage states
      setNewBio(currentUser.bio)
      setPreviewImage(currentUser?.image || currentUser?.profile_image || "")
    }
    // Cleanup function to set hasLoaded to false when the component unmounts
  }, [currentUser])

  // Function to handle the change of the image
  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      const imageUrl = URL.createObjectURL(selectedImage);
      setPreviewImage(imageUrl);
      setNewImage(selectedImage);
      return () => URL.revokeObjectURL(imageUrl);
    }
  };

  // Function to handle the change of the bio
  const handleBioChange = (event) => {
    setNewBio(event.target.value);
  };

  // Function to handle the form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Creating a FormData object to send image and bio
    const formData = new FormData();
    if (newImage) {
      formData.append("image", newImage);
    }
    formData.append("bio", newBio);

    try {
      // Making a PUT request to update the user's profile
      const response = await axiosReq.put(`/profiles/${currentUser.id}/`, formData);
      // Setting the currentUser context with the updated data
      setCurrentUser(response.data);
      // Redirecting to the user's profile page
      history.push({
        pathname: `/myprofile`,
        state: {profileData: response.data}
      });
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
  

  // JSX for text fields (image and bio) in the form
  const textFields = (
    <div className="text-center">
      <Form.Group>
        <img
          className={styles.ProfilePageAvatar}
          src={previewImage}
          alt="Profile Avatar"
        />
        <Col sm={12}>
          <Form.File
            id="image"
            label="Change Profile Image"
            accept="image/*"
            onChange={handleImageChange}
          />
        </Col>
      </Form.Group>
      <Form.Group>
        <Form.Label>Bio</Form.Label>
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

  // JSX for submit buttons in the form
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

  // JSX for the entire form
  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <div className="text-center">
              <h1 className="mt-5">Edit Profile Data</h1>
              <img
                className={`${styles.Image} my-5`}
                src={silhouetteImage}
                alt="Female Silhouette"
              />
            </div>
            {/* JSX for text fields and submit buttons */}
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

// Exporting the ProfileEditForm component
export default ProfileEditForm;
