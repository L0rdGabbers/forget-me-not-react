// FriendCreateForm.js
// Component for creating a new friend and sending friend requests.

import React, { useState, useEffect } from 'react';
import { axiosReq } from '../../api/axiosDefaults';
import { useHistory } from 'react-router-dom';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Avatar from '../../components/Avatar';
import styles from '../../styles/FriendCreateForm.module.css'
import appStyles from '../../App.module.css'
import btnStyles from '../../styles/Button.module.css'

// Component for creating a new friend and sending friend requests.
const FriendCreateForm = () => {
  // Current user data from context
  const currentUser = useCurrentUser();

  // State for handling friend creation and user input
  const [friendUsername, setFriendUsername] = useState("");
  const [friendList, setFriendList] = useState({});
  const [friendRequestData, setFriendRequestData] = useState([]);
  const [profileFound, setProfileFound] = useState(0);
  const [profileData, setProfileData] = useState([]);
  const [friend, setFriend] = useState("");
  const [unsuccessfulSend, setUnsuccessfulSend] = useState(0);

  // React Router's history object for programmatic navigation
  const history = useHistory();

  // Fetches user data, friend data, and friend request data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosReq.get(`/profiles/`);
        if (response.status === 200) {
          const data = response.data;
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
          setFriendList(data);
        }
      } catch (error) {
        console.error("Error fetching friend data:", error);
      }
      try {
        const friendRequests = await axiosReq.get("/friend-requests/");
        if (friendRequests.status === 200) {
          const data = friendRequests.data;
          setFriendRequestData(data);
        }
      } catch (error) {
        console.error("Error fetching friend request data:", error);
      }
    };
    fetchData();
  }, []);

  // Finds a profile by username and sets the friend state
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
      setUnsuccessfulSend(0);
      getProfileRelation();
    } else {
      setFriend(null);
      setProfileFound(2); // Username not found
    }
  };

  // Effect to call getProfileRelation when friend state changes
  useEffect(() => {
    if (friend) {
      getProfileRelation();
    }
  }, [friend]);

  // Gets the profile relation status for the current user and friend
  const getProfileRelation = () => {
    if (!friend) {
      setProfileFound(2);
      setUnsuccessfulSend(5);
      return;
    } else if (friend) {
      setProfileFound(1);
    }
  
    if (friend.id === currentUser.pk) {
      setUnsuccessfulSend(4);
    } else if (friendList.some((friendObj) => friendObj.username === friendUsername)) {
      setUnsuccessfulSend(1);
    } else if (
      friendRequestData.some((request) => request.sender_username === friendUsername)
    ) {
      setUnsuccessfulSend(3);
    } else if (
      friendRequestData.some((request) => request.receiver_username === friendUsername)
    ) {
      setUnsuccessfulSend(2);
    } else {
      setUnsuccessfulSend(0);
    }
  };

  // Sends a friend request to the specified user
  const handleSendFriendRequest = async (receiverId) => {
    try {
      await axiosReq.post("/send-friend-request/", {
        receiver: receiverId,
      });
      history.push("/friends/requests");
    } catch (error) {
      console.error("Error sending friend request:", error);
    }
  };

  // Handles change in the username input field
  const handleUsernameChange = (event) => {
    setFriendUsername(event.target.value);
  };

  // Handles the action to be performed based on the current profile relation status
  const handleAction = async (action) => {
    try {
      await axiosReq.put(`/friend-requests/${friend.id}/`, {[action]: true});
      history.push('/friends/list')
    } catch(error) {
      console.error(`Error performing ${action}:`, error)
    }
  };

  // JSX structure for the FriendCreateForm component
  return (
    <>
      <Container
        className={`${styles.Container} d-flex flex-column align-items-center justify-content-center`}
      >
        <Row className={`d-flex flex-column align-items-center mb-4`}>
          {/* Heading for the friend creation form */}
          <h1 className={appStyles.Header}>Create a Friend</h1>
        </Row>
        <Row className={`${styles.Row} d-flex justify-content-center mb-5`}>
          {/* Input field for entering friend username */}
          <label>
            Enter Friend Username:
            <input
              type="text"
              value={friendUsername}
              onChange={handleUsernameChange}
              className="mt-2"
            />
          </label>
          {/* Button to search for the entered username */}
          <Button
            className={`${btnStyles.Button} ${btnStyles.Sml}`}
            onClick={findProfileByUsername}
          >
            Search Username
          </Button>
        </Row>
        <Col>
          {/* Render content based on profileFound and unsuccessfulSend states */}
          {profileFound === 1 && (
            <Row>
              {/* Display friend information */}
              <Col md={12} className="d-flex justify-content-center mb-4">
                <Avatar src={friend?.image} height={160} />
              </Col>
              <Col md={12} className="d-flex justify-content-center my-5">
                <h4 className="pt-1">{friend.owner}</h4>
              </Col>
              <Col md={12} className="d-flex justify-content-center">
                <Col>
                  {/* Display buttons based on unsuccessfulSend state */}
                  {unsuccessfulSend === 0 && (
                    <Col md={12} className="d-flex justify-content-center">
                      {/* Button to send friend request */}
                      <Button
                        className={`${btnStyles.Button}`}
                        onClick={() => handleSendFriendRequest(friend.id)}
                      >
                        Send Friend Request
                      </Button>
                    </Col>
                  )}
                  {unsuccessfulSend === 1 && (
                    <Col md={12} className="d-flex justify-content-center mb-4">
                      {/* Display message for existing friendship */}
                      <h4 className='text-center'>This user is already your friend</h4>
                    </Col>
                  )}
                  {unsuccessfulSend === 2 && (
                    <Col md={12} className="d-flex justify-content-center mb-4">
                      {/* Display message for pending outgoing friend request */}
                      <h4 className='text-center'>You have already sent a request to this user.</h4>
                    </Col>
                  )}
                  {unsuccessfulSend === 3 && (
                    <>
                      <Col
                        md={12}
                        className="d-flex justify-content-center mb-4"
                      >
                        {/* Display message for pending incoming friend request */}
                        <h4 className='text-center'>
                          This person has already sent you a request.
                        </h4>
                      </Col>
                      <Row>
                        {/* Buttons to accept or decline friend request */}
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
                  {unsuccessfulSend === 4 && (
                    <Col md={12} className="d-flex justify-content-center mb-4">
                      {/* Display message for self-profile */}
                      <h4>
                        Hey look! It`&apos;`s You!
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
                {/* Display message for username not found */}
                <h4>The entered username was not found.</h4>
              </Col>
            </Col>
          )}
          {profileFound === 3 && (
            <Col md={12} className="d-flex justify-content-center my-5">
              <Col md={12} className="d-flex justify-content-center mb-4">
                {/* Display message for empty or undefined username */}
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
