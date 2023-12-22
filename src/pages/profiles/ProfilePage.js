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

function ProfilePage({ location }) {
  const profileData = location.state?.profileData || {};
  const [ hasLoaded, setHasLoaded ] = useState(false);

  const [ friendList, setFriendList ] = useState([]);
  const [ projectList, setProjectList ] = useState([]);
  const [ requestList, setRequestList ] = useState([]);

  const [ isFriend, setIsFriend ] = useState(false);
  const [ isUser, setIsUser ] = useState(false);
  const [ friendRequestPending, setFriendRequestPending ] = useState(false);
  const [ friendRequestAwaiting, setFriendRequestAwaiting ] = useState(false);

  const [ profileImage, setProfileImage ] = useState("")

  const [ errors, setErrors ] = useState();

  const checkUserRelation = () => {
    if (profileData.is_owner == true) {
      setIsUser(true)
    } else if (friendList.some(friend => friend.profile_id === profileData.id)) {
      setIsFriend(true);
    } else if (requestList.some(request => request.sender === profileData.id)) {
      setFriendRequestAwaiting(true)
    } else if (requestList.some(request => request.receiver === profileData.id)) {
      setFriendRequestPending(true)
    }
  }

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
    try {
      const projects = await axiosReq.get('/projects/')
      if (projects.status === 200) {
        const data = projects.data;
        const dataArray = Object.values(data);
        setProjectList(dataArray)
      }
    } catch (error) {
      console.error( error)
      if (error.response?.status !== 401) {
        setErrors(error.response?.data);
      }
    }
    try {
      const Requests = await axiosReq.get('/friend-requests/')
      if (Requests.status === 200) {
        const data = Requests.data
        console.log(data)
        setRequestList(data)
      }
    } catch (error) {
      console.error("Error fetching friend request data:", error)
    }
    setProfileImage(profileData.image || profileData.profile_image || "");
    setHasLoaded(true);
    checkUserRelation();
  };

  useEffect(() => {
    const fetchDataAndSetImage = async () => {
      await fetchData();
    };
  
    fetchDataAndSetImage();
  }, [profileData]);

  const mainProfile = (
    <>
      {isUser ? (
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
      ) : isFriend ? (
        <p>This guy is your friend</p>
      ) : friendRequestAwaiting ? (
        <Button>Accept Friend Request</Button>
      ) : friendRequestPending ? (
        <p>Send friend request</p>
      ) : (
        <Button>Send Friend Request</Button>
      )}
    </>
  );

  return (
    <Row>
      <Col className="py-2 p-0 p-lg-2" lg={10}>
        <Container className={appStyles.Content}>
          {hasLoaded ? (
            <>
              {mainProfile}
            </>
          ) : (
            <>Loading...</>
          )}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
      </Col>
    </Row>
  );
}

export default ProfilePage;