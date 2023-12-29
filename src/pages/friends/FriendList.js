// FriendList.js
// Component for displaying the list of friends.

import React, { useState, useEffect } from 'react';
import { axiosReq } from '../../api/axiosDefaults';
import Avatar from '../../components/Avatar';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import { Link, useHistory } from 'react-router-dom';

import listStyles from '../../styles/EmptyLists.module.css'
import appStyles from '../../App.module.css'
import btnStyles from '../../styles/Button.module.css'

// Component for displaying the list of friends.
const FriendList = () => {
  // State to manage friend data, unfriended friends, and display messages
  const [friendList, setFriendList] = useState([]);
  const [unfriendedFriends, setUnfriendedFriends] = useState([]);
  const [showUnfriendMessage, setShowUnfriendMessage] = useState(false);
  const [dataLoaded, setDataLoaded ] = useState(null);

  // React Router's history object for programmatic navigation
  const history = useHistory();

  // Fetches friend data on component mount
  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await axiosReq.get(`/friends/`);
        if (isMounted && response.status === 200) {
          const friendDetails = response.data.friend_details;
          setFriendList(friendDetails);
          setDataLoaded(true);
        } else {
          console.error('Failed to fetch friend request data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  // Handles unfriending a friend
  const handleUnfriend = async (friendId) => {
    try {
      const response = await axiosReq.put(`/friends/${friendId}/`, {
        unfriend: true,
      });
      if (response.status === 200) {
        setFriendList((prevFriendList) =>
          prevFriendList.filter((friend) => friend.friend_id !== friendId)
        );
        setUnfriendedFriends((prevUnfriendedFriends) => [
          ...prevUnfriendedFriends,
          friendId,
        ]);
        setShowUnfriendMessage(true);
      } else {
        console.error("Failed to unfriend");
      }
    } catch (error) {
      console.error("Error unfriending:", error);
    }
  };

  // Handles navigation to the friend creation page
  const handleFriendCreateLink = () => {
    history.push('/friends/create')
  }

  // Renders content when there are friends in the friend list
  const hasFriends = () => {
    return (
      <div>
        {/* Heading for the friend list */}
        <h2>Friend List</h2>
        {/* Display success message after unfriending */}
        {showUnfriendMessage && (
          <Alert variant="success" onClose={() => setShowUnfriendMessage(false)} dismissible>
            Friend has been unfriended successfully!
          </Alert>
        )}
        {/* Render each friend in a list */}
        <ul>
          {friendList.map((profile) => (
            <div
              key={profile.id}
              style={{
                border: '1px solid #ccc',
                padding: '15px 2rem 2px 5px',
                marginBottom: '8px',
                backgroundColor: '#fff',
              }}
            >
              <Container>
                <Row>
                  <Col sm={2} md={2}>
                    {/* Display friend's avatar */}
                    <Avatar className="" src={profile.friend_image} height={50} />
                  </Col>
                  <Col sm={8} md={4}>
                    <h2>
                      {/* Link to the friend's profile */}
                      <Link
                        to={{
                          pathname: `/profiles/${profile.id}`,
                          state: { profileData: profile },
                        }}
                      >
                        {profile.username}
                      </Link>
                    </h2>
                  </Col>
                  <Col sm={3} md={2}>
                    {/* Button to unfriend the friend */}
                    <Button
                      onClick={() => handleUnfriend(profile.friend_id)}
                      variant="danger"
                    >
                      Unfriend
                    </Button>
                  </Col>
                </Row>
              </Container>
            </div>
          ))}
        </ul>
      </div>
    )
  }

  // Renders content when there are no friends in the friend list
  const hasNoFriends = () => {
    return (
      <Container
        className={`${listStyles.Container} d-flex flex-column align-items-center justify-content-center`}
      >
        <Row className={`d-flex flex-column align-items-center my-5`}>
          {/* Display message for no friends */}
          <h1 className={appStyles.Header}>You do not have any friends.</h1>
        </Row>
        <Row className={`d-flex justify-content-center`}>
          {/* Button to navigate to friend creation page */}
          <Button className={btnStyles.Button} onClick={handleFriendCreateLink}>
            Click Here to send a Friend Request
          </Button>
        </Row>
      </Container>
    );
  }

  // Renders the component based on dataLoaded and the presence of friends
  return dataLoaded && friendList.length !== 0  ? (
    hasFriends()
  ) : dataLoaded ? (
    hasNoFriends()
  ) : (
    // Loading indicator while data is being fetched
    <p>Loading...</p>
  );
};

export default FriendList;
