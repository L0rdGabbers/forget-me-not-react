// FriendRequests.js
// Component for displaying friend requests.

import React, { useEffect, useState } from 'react'
import { axiosReq } from '../../api/axiosDefaults';
import { useHistory } from 'react-router-dom';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import listStyles from '../../styles/EmptyLists.module.css'
import appStyles from '../../App.module.css'
import btnStyles from '../../styles/Button.module.css'

// Component for displaying friend requests.
const FriendRequests = () => {
  // Current user context for accessing user data
  const currentUser = useCurrentUser();
  // State to manage friend request data and data loading status
  const [ friendRequestsData, setFriendRequestsData ] = useState([]);
  const [ dataLoaded, setDataLoaded ] = useState(null);

  // React Router's history object for programmatic navigation
  const history = useHistory();

  // Fetches friend request data on component mount
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const response = await axiosReq.get(`/friend-requests/`);
        if (isMounted && response.status === 200) {
          const data = response.data;
          setFriendRequestsData(data);
          setDataLoaded(true);
        } else {
          console.error("Failed to fetch friend request data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();

    // Cleanup function to prevent state updates on unmounted component
    return () => {
      isMounted = false;
    } 
  }, []);

  // Handles friend request actions (accept, decline, cancel)
  const handleAction = async (request, action) => {
    try {
      await axiosReq.put(`/friend-requests/${request.id}/`, { [action]: true });
      history.push("/friends/list");
    } catch (error) {
      console.error(`Error performing ${action}:`, error);
    }
  };

  // Handles navigation to the friend creation page
  const handleFriendCreateLink = () => {
    history.push('/friends/create')
  }

  // Renders content when there are friend requests
  const hasFriendRequests = () => {
    return (
      <div>
        {/* Heading for the friend requests */}
        <h2>Friend Requests</h2>
        {/* Map through friend requests and render each one */}
        {friendRequestsData.map((request) => (
          <div
            key={request.id}
            style={{
              border: "1px solid #ccc",
              padding: "15px 2rem 2px 5px",
              marginBottom: "8px",
              backgroundColor: "#fff",
            }}
          >
            <Container>
              <Row>
                <Col sm={8} md={4}>
                  {/* Display sender or receiver username based on the request */}
                  {request.sender === currentUser.id ? (
                    <h2>Sent to: {request.receiver_username}</h2>
                  ) : (
                    <h2>Sent from: {request.sender_username}</h2>
                  )}
                </Col>
                <Col
                  sm={8}
                  md={4}
                  className="pt-2 d-flex justify-content-center"
                >
                  {/* Display the date when the friend request was sent */}
                  <h5>sent on {request.created_at}</h5>
                </Col>
                <Col sm={8} md={4} className="d-flex justify-content-center">
                  {/* Action buttons based on the user's role in the request */}
                  {request.receiver === currentUser.id ? (
                    <div>
                      <Button
                        className={`${btnStyles.Button} ${btnStyles.Sml} ${btnStyles.Green}`}
                        onClick={() => handleAction(request, "accept")}
                      >
                        Accept
                      </Button>
                      <Button
                        className={`${btnStyles.Button} ${btnStyles.Sml} ${btnStyles.Red}`}
                        onClick={() => handleAction(request, "decline")}
                      >
                        Decline
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <Button
                        className={`${btnStyles.Button} ${btnStyles.Sml} ${btnStyles.Red}`}
                        onClick={() => handleAction(request, "cancel")}
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </Col>
              </Row>
            </Container>
          </div>
        ))}
      </div>
    );
  }

  // Renders content when there are no friend requests
  const hasNoFriendRequests = () => {
    return (
      <Container
        className={`${listStyles.Container} d-flex flex-column align-items-center justify-content-center`}
      >
        <Row className={`d-flex flex-column align-items-center my-5`}>
          {/* Display message for no friend requests */}
          <h1 className={appStyles.Header}>You do not have any pending friend requests.</h1>
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

  // Conditional rendering based on data availability
  return dataLoaded && friendRequestsData.length !== 0  ? (
    hasFriendRequests()
  ) : dataLoaded ? (
    hasNoFriendRequests()
  ) : (
    // Loading indicator while data is being fetched
    <p>Loading...</p>
  );
}

// Exporting the FriendRequests component
export default FriendRequests;
