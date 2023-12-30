// ProfilePage.js
// Component for rendering user profile details and managing friend requests.

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";

import styles from "../../styles/ProfilePage.module.css"
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { axiosReq } from "../../api/axiosDefaults";

// Component for rendering user profile details and managing friend requests.
function ProfilePage({ location }) {
  // State to manage profile data and loading state
  const [profileData, setProfileData] = useState(location.state?.profileData || {});

  // States for managing friend lists, project lists, friend requests, and user relations
  const [ friendList, setFriendList ] = useState([]);
  const [ projectList, setProjectList ] = useState([]);
  const [ requestList, setRequestList ] = useState([]);
  const [ isFriend, setIsFriend ] = useState(false);
  const [ friendRequestPending, setFriendRequestPending ] = useState(false);
  const [ friendRequestAwaiting, setFriendRequestAwaiting ] = useState(false);
  const [ isUnknown, setIsUnknown ] = useState(false);
  const [ friendRequestId, setFriendRequestId ] = useState(null);
  const [ useEffectCounter, setUseEffectCounter ] = useState(0)

  // History object from react-router-dom
  const history = useHistory();

  // State to manage relation profile details
  const [relationProfile, setRelationProfile] = useState({});

  // useEffect to fetch data and check user relation
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!location.state) {
          // Redirect to Error404 if location.state is not available
          history.push("/error404");
          return;
        }
        // Fetching friend details, projects, and friend requests
        const friendsResponse = await axiosReq.get('/friends/');
        const projectsResponse = await axiosReq.get('/projects/');
        const requestsResponse = await axiosReq.get('/friend-requests/');

        // Setting friend list, project list, and friend request list
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

        // Setting profile data and image
        setProfileData(location.state?.profileData || {});

        // Checking user relation and fetching profile
        checkUserRelation();
        fetchProfile();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Function to fetch profile data
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

    // Function to check user relation
    const checkUserRelation = () => {
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
    };

    // Fetching data
    fetchData();
  }, [relationProfile.id]);

  // Function to handle sending friend request
  const handleFriendRequest = async () => {
    try {
      await axiosReq.post('/send-friend-request/', { receiver: relationProfile.id });
      history.push('/friends/requests');
    } catch(error){
      console.error(error)
    }
  }

  // Function to handle friend request action (accept or decline)
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

  // JSX for main profile view
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
                <p>This user hasn`&apos;`t written a biography yet.</p>
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

  // JSX for rendering the component
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

ProfilePage.propTypes = {
  location: PropTypes.object, // Corrected PropTypes definition
};

// Exporting the ProfilePage component
export default ProfilePage;
