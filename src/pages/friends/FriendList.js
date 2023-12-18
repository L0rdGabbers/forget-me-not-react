import React, { useState, useEffect } from 'react';
import { axiosReq } from '../../api/axiosDefaults';
import Avatar from '../../components/Avatar';
import { Button } from 'react-bootstrap';

const FriendList = () => {
  const [friendList, setFriendList] = useState([]);
  const [friendProfiles, setFriendProfiles] = useState([]);
  const [unfriendedFriends, setUnfriendedFriends] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await axiosReq.get(`/friends/`);
        if (response.status === 200) {
          const friendDetails = response.data.friend_details;
          const profileIds = Object.values(friendDetails).map(
            (friend) => friend.profile_id
          );
          const profilesPromises = profileIds.map((profileId) =>
            axiosReq.get(`/profiles/${profileId}/`)
          );
          const profilesResponses = await Promise.all(profilesPromises);
          const profilesData = profilesResponses.map(
            (profileResponse) => profileResponse.data
          );
          setFriendProfiles(profilesData);
          console.log(profilesData)
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

  return (
    <div>
      <h2>Friend List</h2>
      <ul>
        {friendProfiles.map((profile) => (
          <li key={profile.id}>
            {profile.owner}
            {unfriendedFriends.includes(profile.id) ? (
              <div style={{ color: 'red' }}>Unfriended</div>
            ) : (
              <>
                <Avatar src={profile.image} height={40} />
                <Button
                  onClick={() => handleUnfriend(profile.id)}
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