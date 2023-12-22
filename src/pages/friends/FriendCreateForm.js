import React, { useState, useEffect } from 'react';
import { axiosReq } from '../../api/axiosDefaults';
import { useHistory } from 'react-router-dom';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { Col, Row } from 'react-bootstrap';
import Avatar from '../../components/Avatar';
import { Button } from 'react-bootstrap/';
import btnStyles from '../../styles/Button.module.css'

const FriendCreateForm = () => {
  const currentUser = useCurrentUser();

  const [ friendUsername, setFriendUsername ] = useState("");
  const [ friendList, setFriendList ] = useState({})
  const [ friendRequestData, setFriendRequestData ] = useState([])
  const [ profileFound, setProfileFound ] = useState(0)
  const [ profileData, setProfileData ] = useState([]);
  const [ friend, setFriend ] = useState("");
  const [ unSuccessfullSend, setUnsuccessfullSend ] = useState(0);
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
        const friends = await axiosReq.get('/friends/')
        if (friends.status === 200) {
          const data = friends.data.friend_details;
          console.log(data)
          setFriendList(data)
        }
      } catch (error) {
        console.error("Error fetching friend data:", error)
      }
      try {
        const friendRequests = await axiosReq.get('/friend-requests/')
        if (friendRequests.status === 200) {
          const data = friendRequests.data
          console.log(data)
          setFriendRequestData(data)
        }
      } catch (error) {
        console.error("Error fetching friend request data:", error)
      }
    };
    fetchData();
  }, []); 

  const findProfileByUsername = () => {
    if (profileData && friendUsername) {
      const foundProfile = profileData.find(profile => profile.owner === friendUsername);
      if (foundProfile) {
        setFriend(foundProfile);
        setProfileFound(1);
      } else {
        setProfileFound(2);
      }
    }
  };

  const sendFriendRequest = async (receiverId) => {
    try {
      if (receiverId === currentUser.pk) {
        setUnsuccessfullSend(4)
      } else if (Object.values(friendList).includes(friendUsername)) {
        setUnsuccessfullSend(1)
      } else if (friendRequestData.some(request =>
          request.sender === receiverId)) {
            setUnsuccessfullSend(3)
      } else if (friendRequestData.some(request =>
        request.receiver === receiverId)) {
          setUnsuccessfullSend(2) 

      } else {
        const response = await axiosReq.post('/send-friend-request/', { receiver: receiverId });
        console.log('Friend request sent successfully:', response.data);
        history.push('/friends/requests');
      } 
    } catch (error) {
      console.error('Error sending friend request:', error);
    }
  };
  
  const handleUsernameChange = (event) => {
    setFriendUsername(event.target.value);
  };

  const handleSendFriendRequest = () => {
    sendFriendRequest(friend.id);
  };

  return (
    <div>
      <h2>Send Friend Request</h2>
      <Row>
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
          Check for Username
        </Button>
        <Button
          className={`${btnStyles.Button} ${btnStyles.Sml}`}
          onClick={handleSendFriendRequest}
        >
          Send Friend Request
        </Button>
      </Row>
      <Col>
        {profileFound === 1 && (
          <Row>
            <Avatar src={friend?.image} height={40} />
            <h4 className="pt-1">{friend.owner}</h4>
          </Row>
        )}
        {profileFound === 2 && (
          <Row>
            <h4 className="pt-1">No Profile with that name.</h4>
          </Row>
        )}
      </Col>
      <Col>
        {unSuccessfullSend === 1 && (
          <Row>
            <h4 className="pt-1">This user is already your friend</h4>
          </Row>
        )}
        {unSuccessfullSend === 2 && (
          <Row>
            <h4 className="pt-1">
              You have already sent a request to this user.
            </h4>
          </Row>
        )}
        {unSuccessfullSend === 3 && (
          <Row>
            <h4 className="pt-1">
              This person has already sent you a request. Hurry up and respond.
            </h4>
          </Row>
        )}
        {unSuccessfullSend === 4 && (
          <Row>
            <h4 className="pt-1">
              If you're trying to make your friend count bigger, try a little harder.
            </h4>
          </Row>
        )}
      </Col>
    </div>
  );
};

export default FriendCreateForm;