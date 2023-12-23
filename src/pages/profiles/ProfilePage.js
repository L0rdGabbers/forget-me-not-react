import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap";
import { Link, useHistory, } from "react-router-dom";

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
  const [ isUnknown, setIsUnknown ] = useState(false);
  const [ friendRequestId, setFriendRequestId ] = useState(null);
  const [ useEffectCounter, setUseEffectCounter ] = useState(0)

  const [profileImage, setProfileImage] = useState("");

  const [errors, setErrors] = useState();
  const history = useHistory();

  const [relationProfile, setRelationProfile] = useState({});

  useEffect(() => {
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

        checkUserRelation();
        fetchProfile();
        setDataLoaded(true)
      } catch (error) {
        console.error("Error fetching data:", error);
        if (error.response?.status !== 401) {
          setErrors(error.response?.data);
        }
      }
    };

    const fetchProfile = async () => {
      console.log("Fetching profile")
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
      console.log("Checking user relation")
      const friendRequestSender = requestList.find(
        (request) => request.sender === profileData.id && request.is_active === true
      );
    
      if (friendList.some((friend) => friend.id === profileData.id)) {
        setIsFriend(true);
      } else if (friendRequestSender) {
        setFriendRequestAwaiting(true);
        setFriendRequestId(friendRequestSender.id);
      } else if (requestList.some((request) => request.receiver === profileData.id && request.is_active === true)) {
        setFriendRequestPending(true);
      } else {
        setIsUnknown(true);
      }
      setUseEffectCounter(prevData => prevData + 1);
      console.log(useEffectCounter)
      console.log(isFriend, friendRequestAwaiting, friendRequestPending, isUnknown)
    };

    fetchData();
  }, [relationProfile.id]);


  const handleFriendRequest = async () => {
    try {
      const response = await axiosReq.post('/send-friend-request/', { receiver: relationProfile.id });
        console.log('Friend request sent successfully:', response.data);
        history.push('/friends/requests');
    } catch(error){
      console.error(error)
    }
  }

  const handleAction = async (action) => {
    try {
      await axiosReq.put(`/friend-requests/${friendRequestId}/`, {[action]: true});
      if (action == "accept") {
        setFriendRequestAwaiting(false)
        setIsFriend(true)
        history.push('/friends/list')
      } else if (action == "decline") {
        setFriendRequestAwaiting(false)
        setIsUnknown(true)
      }
    } catch(error) {
      console.error(`Error performing ${action}:`, error)
    }
  };

  const mainProfile = (
    <>
      {isFriend ||
      friendRequestAwaiting ||
      friendRequestPending ||
      isUnknown ? (
        <Row noGutters className="px-3 text-center">
          <Col lg={12} className="text-lg-center">
            <img className={styles.ProfileAvatar} src={relationProfile.image} />
            <h3 className="m-2">{relationProfile.owner}</h3>

            {profileData.bio ? (
              profileData.bio
            ) : (
              <>
                <p>This user hasn't written a biography yet.</p>
              </>
            )}
            <p>
              You are working on{" "}
              {
                projectList.filter(
                  (project) =>
                    (!project.complete &&
                      project.owner === relationProfile.id) ||
                    (!project.complete &&
                      project.collaborators.includes(relationProfile.id))
                ).length
              }{" "}
              project
              {projectList.filter(
                (project) =>
                  (!project.complete && project.owner === relationProfile.id) ||
                  (!project.complete &&
                    project.collaborators.includes(relationProfile.id))
              ).length !== 1
                ? "s "
                : " "}
              with this user.
            </p>
            <p>
              You have completed{" "}
              {
                projectList.filter(
                  (project) =>
                    (project.complete &&
                      project.owner === relationProfile.id) ||
                    (project.complete &&
                      project.collaborators.includes(relationProfile.id))
                ).length
              }{" "}
              project
              {projectList.filter(
                (project) =>
                  (project.complete && project.owner === relationProfile.id) ||
                  (project.complete &&
                    project.collaborators.includes(relationProfile.id))
              ).length !== 1
                ? "s "
                : " "}
              with this user.
            </p>
            {isFriend ? (
              <></>
            ) : friendRequestAwaiting ? (
              <>
                <Button
                  className={`${btnStyles.Button}`}
                  onClick={() => handleAction("accept")}
                >
                  Accept Friend Request
                </Button>
                <Button
                  className={`${btnStyles.Button}`}
                  onClick={() => handleAction("decline")}
                >
                  Decline Friend Request
                </Button>
              </>
            ) : friendRequestPending ? (
              <>
                <Button className={`${btnStyles.DisabledButton}`} disabled>
                  Friend Request Pending
                </Button>
              </>
            ) : isUnknown ? (
              <>
                <Button
                  onClick={handleFriendRequest}
                  className={`${btnStyles.Button}`}
                >
                  Send Friend Request
                </Button>
              </>
            ) : (
              <p>Profile data not found.</p>
            )}
          </Col>
        </Row>
      ) : null}
    </>
  );
    

  return (
    <Row>
      <Col className="py-2 p-0 p-lg-2" lg={12}>
        <Container className={`${appStyles.Content} ${styles.ProfileContainer}`}>
          { useEffectCounter == 1 ? (
            <p>loading</p>
            ) : (
            mainProfile
            )
          }
        </Container>
      </Col>
    </Row>
  );
}

export default ProfilePage;