import React, { useState, useEffect } from 'react'
import { axiosReq } from '../../api/axiosDefaults';
import axios from 'axios';

const FriendCreateForm = () => {
    const [friendUsername, setFriendUsername] = useState('');
    const [profileData, setProfileData] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axiosReq.get(`/profiles/`);
          if (response.status === 200) {
            const data = response.data;
            console.log(data)
            setProfileData(data);
          } else {
            console.error('Failed to fetch user data');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
      fetchData();
    }, []); 

    const handleUsernameChange = (event) => {
      setFriendUsername(event.target.value)
    }

    const findProfileByUsername = () => {
      if (profileData && friendUsername) {
        const profilesArray = Object.values(profileData.results)
        const foundProfile = profilesArray.find(profile => profile && profile.owner === friendUsername)


        if (foundProfile) {
          console.log('Profile found', foundProfile);
        } else {
          console.log('Profile not found');
        }
      }
    };

  return (
    <div>
      <h2>Send Friend Request</h2>
      <label>
        Enter Friend Username:
        <input type="text" value={friendUsername} onChange={handleUsernameChange} />
      </label>
      <button onClick={findProfileByUsername} disabled={!friendUsername.trim()}>Get data</button>
    </div>
  )
}

export default FriendCreateForm