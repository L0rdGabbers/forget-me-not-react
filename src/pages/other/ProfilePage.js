import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap";

import styles from "../../styles/ProfilePage.module.css"
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { axiosReq } from "../../api/axiosDefaults";

function ProfilePage({ location }) {
  const profileData = location.state.profileData || {};
  const [ hasLoaded, setHasLoaded ] = useState(false);

  const [ friendList, setFriendList ] = useState([]);
  const [ projectList, setProjectList ] = useState([]);
  const [ requestList, setRequestList ] = useState([]);

  const [ isFriend, setIsFriend ] = useState(false);
  const [ isUser, setIsUser ] = useState(false);
  const [ friendRequestPending, setFriendRequestPending ] = useState(false);
  const [ friendRequestAwaiting, setFriendRequestAwaiting ] = useState(false);

  const [ errors, setErrors ] = useState();

  const checkUserRelation = () => {
    if (profileData.is_owner == true) {
      setIsUser(true)
    } else if (friendList.some(friend => friend.id === profileData.profile_id)) {
      setIsFriend(true);
    } else if (requestList.some(request => request.sender === profileData.profile_id)) {
      setFriendRequestAwaiting(true)
    } else if (requestList.some(request => request.receiver === profileData.profile_id)) {
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
    setHasLoaded(true);

    checkUserRelation();
  };

  useEffect(() => {
    fetchData();
    console.log(projectList)
  }, [profileData])


  const mainProfile = (
    <>
      <Row noGutters className="px-3 text-center">
        <Col lg={3} className="text-lg-left">
          <img src={profileData.profile_image} />
        </Col>
        
        <Col lg={6}>
          <h3 className="m-2">{profileData.username}</h3>
        </Col>
        <Col lg={3} className="text-lg-right">
        {isUser ? (
            <p>
              You are working on{" "}
              {projectList.filter((project) => (project.complete === false)).length} projects
            </p>
          ) : isFriend ? (
            <p>This guy is your friend</p>
          ) : friendRequestAwaiting ? (
            <Button>
              Accept Friend Request
            </Button>
          ) : friendRequestPending ? (
            <p>Send friend request</p>
          ) : (
            <Button>
              Send Friend Request
            </Button>
          )}
        </Col>
        <Col className="p-3">Profile content</Col>
      </Row>
    </>
  );

  return (
    <Row>
      <Col className="py-2 p-0 p-lg-2" lg={8}>
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