import React, { useState, useEffect } from 'react'
import { axiosReq  } from '../../api/axiosDefaults'
import Avatar from '../../components/Avatar';

const FriendList = () => {
  const [ friendList, setFriendList ] = useState({});
  const [ friendProfiles, setFriendProfiles ] = useState({});


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
  }, [])

  return (
    <div>
      <h2>Friend List</h2>
      <ul>
        {Object.entries(friendList).map(([friendId, friendUsername]) => (
          <li key={friendId}>
            {friendUsername}
            {friendProfiles[friendId] && (
              <>
                <Avatar src={friendProfiles[friendId].image} height={40} />
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FriendList