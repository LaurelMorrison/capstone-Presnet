import React, { useEffect, useState } from 'react';
import { Spinner } from "reactstrap";
import FriendList from "./FriendList";
import { onLoginStatusChange } from "../../modules/authManager";
import FriendSearch from "./FriendSearch";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "reactstrap";

function FriendPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(null);

    useEffect(() => {
      onLoginStatusChange(setIsLoggedIn);
    }, []);
  
  
    if (isLoggedIn === null) {
      return <Spinner className="app-spinner dark"/>;
    }
  
    return (
      <>
          <FriendList isLoggedIn={isLoggedIn} />
          <FriendSearch isLoggedIn={isLoggedIn} />
          <Container>
             <Row className="eventCallout justify-content-center" xs lg = "12">
            <h1>
            Add an Event
            </h1>
            <p>
            Have an exciting event or reason to celebrate coming up? Let your loved ones know, so they can cheer you on and be there for you!
            </p>
                <div className="buttonBox">
                    <button className="button" to={`/events/add`}>Add a New Event</button>
                </div>
                </Row>
        </Container>
      </>
    )
};

export default FriendPage;