import React, { useState, useEffect } from 'react';
import { axiosReq } from '../../api/axiosDefaults';
import Avatar from '../../components/Avatar';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const FriendList = () => {
  const [ friendList, setFriendList ] = useState([])
  const [unfriendedFriends, setUnfriendedFriends] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await axiosReq.get(`/friends/`);
        if (response.status === 200) {
          const friendDetails = response.data.friend_details;
          setFriendList(friendDetails)
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

  const handleUnfriend = async (friendId) => {
    try {
      const response = await axiosReq.put(`/friends/${friendId}/`, {
        unfriend: true,
      });
      if (response.status === 200) {
        setUnfriendedFriends((prevUnfriendedFriends) => [
          ...prevUnfriendedFriends,
          friendId,
        ]);
      } else {
        console.error('Failed to unfriend');
      }
    } catch (error) {
      console.error('Error unfriending:', error);
    }
  };

  console.log(friendList)

  return (
    <div>
      <h2>Friend List</h2>
      <ul>
        {friendList.map((profile) => (
          <div
            key={profile.id}
            style={{
              border: "1px solid #ccc",
              padding: "15px 2rem 2px 5px",
              marginBottom: "8px",
              backgroundColor: "#fff",
            }}
          >
            <Container>
              <Row>
                <Col sm={2} md={2}>
                  <Avatar className="" src={profile.friend_image} height={50} />
                </Col>
                <Col sm={8} md={4}>
                  <h2>
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
                <Col sm={9} md={4}>
                  <p>Collaborated on twenty projects</p>
                </Col>
                <Col sm={3} md={2}>
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
  );
};

export default FriendList;