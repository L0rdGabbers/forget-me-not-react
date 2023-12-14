import React, { useEffect, useState } from 'react'
import { axiosReq } from '../../api/axiosDefaults';
import { useHistory } from 'react-router-dom';
import { useCurrentUser } from '../../contexts/CurrentUserContext';

const FriendRequests = () => {
  const currentUser = useCurrentUser();

  const [ friendRequestsData, setFriendRequestsData ] = useState([]);

  const history = useHistory();

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
        try {
          const response = await axiosReq.get(`/friend-requests/`);
          if (response.status === 200) {
            const data = response.data.results;
            console.log(data);
            setFriendRequestsData(data);
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

  const FriendRequestRow = ({ request }) => {
    const { id, sender_username, receiver_username, created_at,  } = request;

    const handleAction = async (action) => {
      try {
        await axiosReq.put(`/friend-requests/${id}/`, {[action]: true});
        history.push('/')
      } catch(error) {
        console.error(`Error performing ${action}:`, error)
      }
    };

    return (
      <div>
        <p>Sender: {sender_username}</p>
        <p>Receiver: {receiver_username}</p>
        <p>Sent: {created_at}</p>
        {receiver_username == currentUser.username ? (
          <div>
            <button onClick={() => handleAction("accept")}>Accept</button>
            <button onClick={() => handleAction("decline")}>Decline</button>
          </div>
        ) : (
          <div>
            <button onClick={() => handleAction("cancel")}>Cancel</button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      {friendRequestsData.map((request) => (
        <FriendRequestRow key={request.id} request={request} />
      ))}
    </div>
  )
}

export default FriendRequests