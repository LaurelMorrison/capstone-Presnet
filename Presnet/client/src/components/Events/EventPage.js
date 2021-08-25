import React, { useEffect, useState } from 'react';
import { onLoginStatusChange } from "../../modules/authManager";
import UserEventList from "./UserEventList";
import FriendEventList from "./FriendsEventList";
import { Container, Row, Spinner, Col } from "reactstrap";
import events from "../../Images/events4.jpeg";
import eventsBackground from "../../Images/eventsBackground.png";

function EventPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    onLoginStatusChange(setIsLoggedIn);
  }, []);


  if (isLoggedIn === null) {
    return <Spinner className="app-spinner dark" />;
  }

  return (
    <>
      <Container>
        <Row className="justify-content-center" lg="12">
          <UserEventList isLoggedIn={isLoggedIn} />
        </Row>

        <Row className="friendEventBlock justify-content-center" lg="12">
          <Col xs lg="8">
            <FriendEventList isLoggedIn={isLoggedIn} />
          </Col>
          <Col xs lg="4">
            <div className="eventImageBox">
              <img className="eventImage1" src={events} alt="celebratory event" />
              <img className="eventImage2" src={eventsBackground} alt="celebratory event" />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
};

export default EventPage;