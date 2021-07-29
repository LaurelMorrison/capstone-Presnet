import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Spinner } from "reactstrap";
import { onLoginStatusChange } from "../../modules/authManager";
import UserEventList from "./UserEventList";
import FriendEventList from "./FriendsEventList";

function EventPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(null);

    useEffect(() => {
      onLoginStatusChange(setIsLoggedIn);
    }, []);
  
  
    if (isLoggedIn === null) {
      return <Spinner className="app-spinner dark"/>;
    }
  
    return (
      <>
          <UserEventList isLoggedIn={isLoggedIn} />
          <FriendEventList isLoggedIn={isLoggedIn} />
      </>
    )
};

export default EventPage;