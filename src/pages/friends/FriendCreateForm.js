import React, { useState, useEffect } from 'react';
import { axiosReq } from '../../api/axiosDefaults';
import { useHistory } from 'react-router-dom';
import { useCurrentUser } from '../../contexts/CurrentUserContext';

const FriendCreateForm = () => {
  const currentUser = useCurrentUser();

  const [ friendUsername, setFriendUsername ] = useState("");
  const [ profileData, setProfileData ] = useState([]);
  const [ friendId, setFriendId ] = useState("");
  const [ friendListData, setFriendListData ] = useState([]);
  const history = useHistory();

  useEffect(() => {
    let isMounted = true;
    
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
        }
      } catch (error) {
        console.error("Error fetching friend data:", error)
      }
    };
    fetchData();

    return () => {
      isMounted = false;
    };
  }, []); 

  const findProfileByUsername = () => {
    if (profileData && friendUsername) {
      const profilesArray = Object.values(profileData.results)
      const foundProfile = profilesArray.find(profile => profile && profile.owner === friendUsername)

      if (foundProfile) {
        console.log('Profile found', foundProfile);
        setFriendId(foundProfile.id)
      } else {
        console.log('Profile not found');
      }
    }
  };

  const sendFriendRequest = async (receiverId) => {
    try {
      if (receiverId !== currentUser.pk) {
        const response = await axiosReq.post('/send-friend-request/', { receiver: receiverId });
        console.log('Friend request sent successfully:', response.data);
        history.push('/') // Update later to push to friend requests page.
      } else {
        console.log("Cannot send a friend request to yourself.");
      }
    } catch (error) {
      console.error('Error sending friend request:', error);
    }
  };

  const handleUsernameChange = (event) => {
    setFriendUsername(event.target.value);
  };

  const handleSendFriendRequest = () => {
    sendFriendRequest(friendId);
  };

  return (
    <div>
      <h2>Send Friend Request</h2>
      <label>
        Enter Friend Username:
        <input type="text" value={friendUsername} onChange={handleUsernameChange} />
      </label>
      <button onClick={findProfileByUsername}>Check for Username</button>
      <button onClick={handleSendFriendRequest}>Send Friend Request</button>
    </div>
  );
};

export default FriendCreateForm;