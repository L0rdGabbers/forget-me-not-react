import React, { useEffect, useState } from 'react'
import btnStyles from '../../styles/Button.module.css'
import { axiosReq } from '../../api/axiosDefaults';
import { useHistory } from 'react-router-dom';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { Container, Row, Col, Button } from 'react-bootstrap';

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
            const data = response.data;
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

  const handleAction = async (request, action) => {
    try {
      await axiosReq.put(`/friend-requests/${request.id}/`, { [action]: true });
      history.push("/friends/list");
    } catch (error) {
      console.error(`Error performing ${action}:`, error);
    }
  };

  return (
    <div>
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
                {request.sender == currentUser.id ? (
                  <h2>Sent to: {request.receiver_username}</h2>
                ) : (
                  <h2>Sent from: {request.sender_username}</h2>
                )}
              </Col>
              <Col sm={8} md={4} className="pt-2 d-flex justify-content-center">
                <h5>sent on {request.created_at}</h5>
              </Col>
              <Col sm={8} md={4} className="d-flex justify-content-center">
                {request.receiver === currentUser.id ? (
                  <div>
                    <Button className={`${btnStyles.Button} ${btnStyles.Sml} ${btnStyles.Green}`} onClick={() => handleAction(request, "accept")}>
                      Accept
                    </Button>
                    <Button className={`${btnStyles.Button} ${btnStyles.Sml} ${btnStyles.Red}`} onClick={() => handleAction(request, "decline")}>
                      Decline
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Button className={`${btnStyles.Button} ${btnStyles.Sml} ${btnStyles.Red}`} onClick={() => handleAction(request, "cancel")}>
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

export default FriendRequests