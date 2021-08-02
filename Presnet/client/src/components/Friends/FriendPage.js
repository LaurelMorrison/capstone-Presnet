import React, { useEffect, useState } from 'react';
import { Spinner } from "reactstrap";
import FriendList from "./FriendList";
import { onLoginStatusChange } from "../../modules/authManager";
import FriendSearch from "./FriendSearch";
import { Link } from "react-router-dom";
import { Container, Row, Button } from "reactstrap";

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
        <Container>
        <Row className="justify-content-center"  lg = "12">
          <FriendList isLoggedIn={isLoggedIn} />
          <FriendSearch isLoggedIn={isLoggedIn} />
          </Row>
             <Row className="eventCallout justify-content-center" lg = "12">
            <h1>
            Add an Event
            </h1>
            <p>
            Have an exciting event or reason to celebrate coming up? Let your loved ones know, so they can cheer you on and be there for you!
            </p>
                <div className="buttonBox">
                    <Button className="button"><Link to={`/events`}>Add a New Event</Link></Button>
                </div>
                </Row>
        </Container>
      </>
    )
};

export default FriendPage;