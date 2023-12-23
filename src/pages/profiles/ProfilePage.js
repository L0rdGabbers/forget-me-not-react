import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap";
import { Link, } from "react-router-dom";

import styles from "../../styles/ProfilePage.module.css"
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { axiosReq } from "../../api/axiosDefaults";

function ProfilePage({ location }) {
  const [profileData, setProfileData] = useState(location.state?.profileData || {});
  const [dataLoaded, setDataLoaded] = useState(false);

  const [ friendList, setFriendList ] = useState([]);
  const [ projectList, setProjectList ] = useState([]);
  const [ requestList, setRequestList ] = useState([]);

  const [ isFriend, setIsFriend ] = useState(false);
  const [ friendRequestPending, setFriendRequestPending ] = useState(false);
  const [ friendRequestAwaiting, setFriendRequestAwaiting ] = useState(false);

  const [profileImage, setProfileImage] = useState("");

  const [errors, setErrors] = useState();

  const [relationProfile, setRelationProfile] = useState({});

  useEffect(() => {
    console.log(relationProfile)
    const fetchData = async () => {
      try {
        const friendsResponse = await axiosReq.get('/friends/');
        const projectsResponse = await axiosReq.get('/projects/');
        const requestsResponse = await axiosReq.get('/friend-requests/');

        if (friendsResponse.status === 200) {
          const data = friendsResponse.data.friend_details;
          const dataArray = Object.values(data);
          setFriendList(dataArray);
        }

        if (projectsResponse.status === 200) {
          const data = projectsResponse.data;
          const dataArray = Object.values(data);
          setProjectList(dataArray);
        }

        if (requestsResponse.status === 200) {
          const data = requestsResponse.data;
          setRequestList(data);
        }

        setProfileData(location.state?.profileData || {});
        setProfileImage(profileData.image || profileData.profile_image || '');

        checkUserRelation(); // Move checkUserRelation here
        fetchProfile(); // Move fetchProfile here
      } catch (error) {
        console.error("Error fetching data:", error);
        if (error.response?.status !== 401) {
          setErrors(error.response?.data);
        }
      }
    };

    const fetchProfile = async () => {
      try {
        if (profileData.id) {
          const response = await axiosReq.get(`/profiles/${profileData.id}`);
          if (response.status === 200) {
            const data = response.data;
            setRelationProfile((prevRelationProfile) => ({
              ...prevRelationProfile,
              ...data,
            }));
          }
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    const checkUserRelation = () => {
      if (friendList.some((friend) => friend.id === profileData.id)) {
        setIsFriend(true);
      } else if (requestList.some((request) => request.sender === profileData.id)) {
        setFriendRequestAwaiting(true);
      } else if (requestList.some((request) => request.receiver === profileData.id)) {
        setFriendRequestPending(true);
      }
    };

    fetchData();
  }, [relationProfile.id]);

  useEffect(() => {
    if (relationProfile == null) {
      setDataLoaded(false);
    }
    if (relationProfile !== null) {
      setDataLoaded(true);
    }
  }, [dataLoaded]);

  const mainProfile = (
    <>
      { isFriend ? (
        <>
          <Row noGutters className="px-3 text-center">
            <Col lg={6} className="text-lg-left">
              <img
                className={styles.ProfileAvatar}
                src={relationProfile.image}
              />
            </Col>

            <Col lg={6} className="text-lg-center">
              <h3 className="m-2">{relationProfile.owner}</h3>

              {profileData.bio ? (
                profileData.bio
              ) : (
                <>
                  <p>
                    This user hasn't written a biography yet.
                  </p>
                </>
              )}
              <p>
                You are working on {" "}
                {projectList.filter((project) => ((!project.complete && project.owner === relationProfile.id) || (!project.complete && project.collaborators.includes(relationProfile.id)))).length}{" "}
                project
                {projectList.filter((project) => ((!project.complete && project.owner === relationProfile.id) || (!project.complete && project.collaborators.includes(relationProfile.id)))).length !== 1
                  ? "s "
                  : " "}
                with this user.
              </p>
              <p>
                You have completed{" "}
                {projectList.filter((project) => ((project.complete && project.owner === relationProfile.id) || (project.complete && project.collaborators.includes(relationProfile.id)))).length}{" "}
                project
                {projectList.filter((project) => ((project.complete && project.owner === relationProfile.id) || (project.complete && project.collaborators.includes(relationProfile.id)))).length !== 1
                  ? "s "
                  : " "}
                with this user.
              </p>
            </Col>
          </Row>
        </>
      ) : friendRequestAwaiting ? (
        <Button>Accept Friend Request</Button>
      ) : friendRequestPending ? (
        <Button>Send Friend Request</Button>
      ) : (
        <p>Loading profile data...</p>
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

export default ProfilePage;