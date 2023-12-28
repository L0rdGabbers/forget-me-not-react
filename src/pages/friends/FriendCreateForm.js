import React, { useState, useEffect } from 'react';
import { axiosReq } from '../../api/axiosDefaults';
import { useHistory } from 'react-router-dom';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { Col, Row, Button, Container } from 'react-bootstrap';
import Avatar from '../../components/Avatar';
import styles from '../../styles/FriendCreateEditForm.module.css'
import appStyles from '../../App.module.css'
import btnStyles from '../../styles/Button.module.css'

const FriendCreateForm = () => {
  const currentUser = useCurrentUser();
  const [friendUsername, setFriendUsername] = useState("");
  const [friendList, setFriendList] = useState({});
  const [friendRequestData, setFriendRequestData] = useState([]);
  const [profileFound, setProfileFound] = useState(0);
  const [profileData, setProfileData] = useState([]);
  const [friend, setFriend] = useState("");
  const [unsuccessfullSend, setUnsuccessfullSend] = useState(0);
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosReq.get(`/profiles/`);
        if (response.status === 200) {
          const data = response.data;
          console.log(data);
          setProfileData(data);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
      try {
        const friends = await axiosReq.get("/friends/");
        if (friends.status === 200) {
          const data = friends.data.friend_details;
          console.log(data);
          setFriendList(data);
        }
      } catch (error) {
        console.error("Error fetching friend data:", error);
      }
      try {
        const friendRequests = await axiosReq.get("/friend-requests/");
        if (friendRequests.status === 200) {
          const data = friendRequests.data;
          console.log(data);
          setFriendRequestData(data);
        }
      } catch (error) {
        console.error("Error fetching friend request data:", error);
      }
    };
    fetchData();
  }, []);

  const findProfileByUsername = () => {
    if (
      friendUsername === undefined ||
      friendUsername === null ||
      !friendUsername.trim()
    ) {
      setFriend(null);
      setProfileFound(3); // Empty or undefined username
      return;
    }

    const foundProfile = profileData.find(
      (profile) => profile.owner === friendUsername
    );

    if (foundProfile) {
      setFriend(foundProfile);
      setProfileFound(1);
      setUnsuccessfullSend(0);
      getProfileRelation();
    } else {
      setFriend(null);
      setProfileFound(2); // Username not found
    }
  };

  useEffect(() => {
    if (friend) {
      getProfileRelation();
    }
  }, [friend]);

  const getProfileRelation = () => {
    if (!friend) {
      setProfileFound(2);
      setUnsuccessfullSend(5);
      return;
    } else if (friend) {
      setProfileFound(1);
    }
  
    if (friend.id === currentUser.pk) {
      setUnsuccessfullSend(4);
    } else if (friendList.some((friendObj) => friendObj.username === friendUsername)) {
      setUnsuccessfullSend(1);
    } else if (
      friendRequestData.some((request) => request.sender_username === friendUsername)
    ) {
      setUnsuccessfullSend(3);
    } else if (
      friendRequestData.some((request) => request.receiver_username === friendUsername)
    ) {
      setUnsuccessfullSend(2);
    } else {
      setUnsuccessfullSend(0);
    }
  };

  const sendFriendRequest = async (receiverId) => {
    try {
      const response = await axiosReq.post("/send-friend-request/", {
        receiver: receiverId,
      });
      console.log("Friend request sent successfully:", response.data);
      history.push("/friends/requests");
    } catch (error) {
      console.error("Error sending friend request:", error);
    }
  };

  const handleUsernameChange = (event) => {
    setFriendUsername(event.target.value);
  };

  const handleSendFriendRequest = () => {
    sendFriendRequest(friend.id);
  };

  const handleAction = async (action) => {
    try {
      await axiosReq.put(`/friend-requests/${friend.id}/`, {[action]: true});
      history.push('/friends/list')
    } catch(error) {
      console.error(`Error performing ${action}:`, error)
    }
  };

  return (
    <>
      <Container
        className={`${styles.Container} d-flex flex-column align-items-center justify-content-center`}
      >
        <Row className={`d-flex flex-column align-items-center mb-4`}>
          <h1 className={appStyles.Header}>Create a Friend</h1>
        </Row>
        <Row className={`${styles.Row} d-flex justify-content-center mb-5`}>
          <label>
            Enter Friend Username:
            <input
              type="text"
              value={friendUsername}
              onChange={handleUsernameChange}
              className="mt-2"
            />
          </label>
          <Button
            className={`${btnStyles.Button} ${btnStyles.Sml}`}
            onClick={findProfileByUsername}
          >
            Search Username
          </Button>
        </Row>
        <Col>
          {profileFound === 1 && (
            <Row>
              <Col md={12} className="d-flex justify-content-center mb-4">
                <Avatar src={friend?.image} height={160} />
              </Col>
              <Col md={12} className="d-flex justify-content-center my-5">
                <h4 className="pt-1">{friend.owner}</h4>
              </Col>
              <Col md={12} className="d-flex justify-content-center">
                <Col>
                  {unsuccessfullSend === 0 && (
                    <Col md={12} className="d-flex justify-content-center">
                      <Button
                        className={`${btnStyles.Button}`}
                        onClick={handleSendFriendRequest}
                      >
                        Send Friend Request
                      </Button>
                    </Col>
                  )}
                  {unsuccessfullSend === 1 && (
                    <Col md={12} className="d-flex justify-content-center mb-4">
                      <h4>This user is already your friend</h4>
                    </Col>
                  )}
                  {unsuccessfullSend === 2 && (
                    <Col md={12} className="d-flex justify-content-center mb-4">
                      <h4>You have already sent a request to this user.</h4>
                    </Col>
                  )}
                  {unsuccessfullSend === 3 && (
                    <>
                      <Col
                        md={12}
                        className="d-flex justify-content-center mb-4"
                      >
                        <h4>
                          This person has already sent you a request. Hurry up
                          and respond.
                        </h4>
                      </Col>
                      <Row>
                        <Col
                          md={6}
                          className="d-flex justify-content-center mb-4"
                        >
                          <Button
                            className={`${btnStyles.Button}`}
                            onClick={() => handleAction("accept")}
                          >
                            Accept Friend Request
                          </Button>
                        </Col>
                        <Col
                          md={6}
                          className="d-flex justify-content-center mb-4"
                        >
                          <Button
                            className={`${btnStyles.Button}`}
                            onClick={() => handleAction("decline")}
                          >
                            Decline Friend Request
                          </Button>
                        </Col>
                      </Row>
                    </>
                  )}
                  {unsuccessfullSend === 4 && (
                    <Col md={12} className="d-flex justify-content-center mb-4">
                      <h4>
                        If you're trying to make your friend count bigger, try a
                        little harder.
                      </h4>
                    </Col>
                  )}
                </Col>
              </Col>
            </Row>
          )}
          {profileFound === 2 && (
            <Col md={12} className="d-flex justify-content-center my-5">
              <Col md={12} className="d-flex justify-content-center mb-4">
                <h4>The entered username was not found.</h4>
              </Col>
            </Col>
          )}
          {profileFound === 3 && (
            <Col md={12} className="d-flex justify-content-center my-5">
              <Col md={12} className="d-flex justify-content-center mb-4">
                <h4>Please Enter a Username</h4>
              </Col>
            </Col>
          )}
        </Col>
      </Container>
    </>
  );
}

export default FriendCreateForm;