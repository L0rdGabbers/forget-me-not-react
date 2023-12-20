import React, { useState, useEffect } from 'react';
import { axiosReq } from '../../api/axiosDefaults';
import Avatar from '../../components/Avatar';
import { Button } from 'react-bootstrap';

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
          <li key={profile.friend_id}>
            {profile.username}
            {unfriendedFriends.includes(profile.friend_id) ? (
              <div style={{ color: 'red' }}>Unfriended</div>
            ) : (
              <>
                <Avatar src={profile.friend_image} height={40} />
                <Button
                  onClick={() => handleUnfriend(profile.friend_id)}
                  variant="danger"
                >
                  Unfriend
                </Button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendList;