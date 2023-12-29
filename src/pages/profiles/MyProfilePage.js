// MyProfilePage.js
// Component for rendering the user's profile page.

import React, { useEffect, useState } from 'react'
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

import styles from "../../styles/ProfilePage.module.css"
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { axiosReq } from "../../api/axiosDefaults";

// Component for rendering the user's profile page.
function MyProfilePage({ location }) {
    // State to store profile data and control data loading
    const [profileData, setProfileData] = useState(location.state?.profileData || {});
    const [dataLoaded, setDataLoaded] = useState(false);
  
    // State to store project list
    const [ projectList, setProjectList ] = useState([]);
  
    // State to store profile image
    const [profileImage, setProfileImage] = useState("");
  
    // State to handle errors
    const [errors, setErrors] = useState();
  
    // useEffect to fetch data when the component mounts
    useEffect(() => {
      const fetchData = async () => {
        try {
          // Fetches projects data
          const projectsResponse = await axiosReq.get('/projects/');
  
          if (projectsResponse.status === 200) {
            const data = projectsResponse.data;
            const dataArray = Object.values(data);
            setProjectList(dataArray);
          }
  
          // Sets profile data and image
          setProfileData(location.state?.profileData || {});
          setProfileImage(profileData.image || profileData.profile_image || '');
          setDataLoaded(true);
  
        } catch (error) {
          console.error("Error fetching data:", error);
          if (error.response?.status !== 401) {
            setErrors(error.response?.data);
          }
        }
      };
      // Calls the fetchData function
      fetchData();
    }, [location.state?.profileData, profileData.image]);
  
    // Renders the main profile content
    const mainProfile = (
      <>
        { dataLoaded ? (
          <>
            {/* User profile details */}
            <Row noGutters className="px-3 text-center">
              <Col lg={12} className="text-lg-center">
                <h3 className="m-2">{profileData.owner}</h3>
                <img
                  className={styles.ProfilePageAvatar}
                  src={profileImage}
                />
                <h3 className="m-2">{profileData.username}</h3>
                {profileData.bio ? (
                  <p className='my-3'>
                    {profileData.bio}
                  </p>
                ) : (
                  <>
                    <p className='my-2'>
                      You haven't written your bio yet, why not write one now?
                    </p>
                  </>
                )}
                {/* Project statistics */}
                <p>
                  You are working on{" "}
                  {projectList.filter((project) => !project.complete).length}{" "}
                  project
                  {projectList.filter((project) => !project.complete).length !== 1
                    ? "s"
                    : ""}
                </p>
                <p>
                  You have completed{" "}
                  {projectList.filter((project) => project.complete).length}{" "}
                  project
                  {projectList.filter((project) => project.complete).length !== 1
                    ? "s"
                    : ""}
                </p>
              </Col>
            </Row>
            {/* Edit profile button */}
            <Row className="justify-content-center">
              <Link to="/profiles/edit">
                <Button className={btnStyles.Button}>Edit Profile Details</Button>
              </Link>
            </Row>
          </>
        ) : (
          // Loading indicator
          <p>Loading...</p>
        )}
      </>
    );
  
    // Renders the entire profile page
    return (
      <Row>
        <Col className="py-2 p-0 p-lg-2" lg={12}>
          <Container className={`${appStyles.Content} ${styles.ProfileContainer}`}>
            { dataLoaded === false ? (
              // Loading indicator
              <p>loading</p>
              ) : (
              // Render main profile content
              mainProfile
              )
            }
          </Container>
        </Col>
        {/* Placeholder column for larger screens */}
        <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        </Col>
      </Row>
    );
  }

export default MyProfilePage;
