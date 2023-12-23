import React, { useEffect, useState } from 'react'
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap";
import { Link, } from "react-router-dom";

import styles from "../../styles/ProfilePage.module.css"
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { axiosReq } from "../../api/axiosDefaults";

function MyProfilePage({ location }) {
    const [profileData, setProfileData] = useState(location.state?.profileData || {});
    const [dataLoaded, setDataLoaded] = useState(false);
  
    const [ friendList, setFriendList ] = useState([]);
    const [ projectList, setProjectList ] = useState([]);
    const [ requestList, setRequestList ] = useState([]);
  
    const [profileImage, setProfileImage] = useState("");
  
    const [errors, setErrors] = useState();
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const projectsResponse = await axiosReq.get('/projects/');
  
          if (projectsResponse.status === 200) {
            const data = projectsResponse.data;
            const dataArray = Object.values(data);
            setFriendList(dataArray);
          }
  
          setProfileData(location.state?.profileData || {});
          setProfileImage(profileData.image || profileData.profile_image || '');
          setDataLoaded(true)
  
        } catch (error) {
          console.error("Error fetching data:", error);
          if (error.response?.status !== 401) {
            setErrors(error.response?.data);
          }
        }
      };
      fetchData();
    });
  
    const mainProfile = (
      <>
        { dataLoaded ? (
          <>
            <Row noGutters className="px-3 text-center">
              <Col lg={6} className="text-lg-left">
                <img
                  className={styles.ProfilePageAvatar}
                  src={profileImage}
                />
              </Col>
  
              <Col lg={6} className="text-lg-center">
                <h3 className="m-2">{profileData.username}</h3>
                {profileData.bio ? (
                  profileData.bio
                ) : (
                  <>
                    <p>
                      You haven't written your bio yet, why not write one now?
                    </p>
                  </>
                )}
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
            <Row className="justify-content-center">
              <Link to="/profiles/edit">
                <Button className={btnStyles.Button}>Edit Profile Details</Button>
              </Link>
            </Row>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </>
    );
  
    return (
      <Row>
        <Col className="py-2 p-0 p-lg-2" lg={10}>
          <Container className={appStyles.Content}>
            { dataLoaded == false ? (
              <p>loading</p>
              ) : (
              mainProfile
              )
            }
          </Container>
        </Col>
        <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        </Col>
      </Row>
    );
  }

export default MyProfilePage