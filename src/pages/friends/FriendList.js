import React, { useState, useEffect } from 'react'
import { axiosReq  } from '../../api/axiosDefaults'
import Avatar from '../../components/Avatar';
import { Button } from 'react-bootstrap';

const FriendList = () => {
  const [ friendList, setFriendList ] = useState({});
  const [ friendProfiles, setFriendProfiles ] = useState({});
  const [ unfriendedFriends, setUnfriendedFriends ] = useState([])


  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
        try {
          const response = await axiosReq.get(`/friends/`);
          if (response.status === 200) {
            const data = response.data.friend_details;
            console.log(data);
            setFriendList(data);

            const profilesPromises = Object.keys(data).map((friendId) =>
            axiosReq.get(`/profiles/${friendId}/`)
          );
          const profilesResponses = await Promise.all(profilesPromises);
          const profilesData = profilesResponses.reduce(
            (acc, profileResponse) => {
              const friendId = profileResponse.data.id;
              acc[friendId] = profileResponse.data;
              return acc;
            },
            {}
          );
          setFriendProfiles(profilesData);
          } else {
            console.error("Failed to fetch friend request data");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
    }
    fetchData();

    return () => {
      isMounted = false;
    }
  }, []);

  const handleUnfriend = async (friendId) => {
    try {
      const response = await axiosReq.put(`/friends/${friendId}/`, {unfriend: true});
      if (response.status == 200) {
        setUnfriendedFriends((prevUnfriendedFriends) => [...prevUnfriendedFriends, friendId]);
      } else {
        console.error('Failed to unfriend');
      }
    } catch(error) {
      console.error('Error unfriending:', error)
    }
  };

  return (
    <div>
      <h2>Friend List</h2>
      <ul>
        {Object.entries(friendList).map(([friendId, friendUsername]) => (
          <li key={friendId}>
            {friendUsername}
            {friendProfiles[friendId] && (
              <>
                {unfriendedFriends.includes(friendId) ? (
                  <div style={{ color: 'red' }}>Unfriended</div>
                ) : (
                  <>
                    <Avatar src={friendProfiles[friendId].image} height={40} />
                    <Button onClick={() => handleUnfriend(friendId)} variant="danger">Unfriend</Button>
                  </>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FriendList