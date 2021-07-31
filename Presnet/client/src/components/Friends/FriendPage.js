import React, { useEffect, useState } from 'react';
import { Spinner } from "reactstrap";
import FriendList from "./FriendList";
import { onLoginStatusChange } from "../../modules/authManager";
import UserList from "./UserList";
import { Link } from "react-router-dom";

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
          <UserList isLoggedIn={isLoggedIn} />
          <div>
            <h1>
            Add an Event
            </h1>
            <h3>
            Have an exciting event coming up?
            </h3>
                <Link to={`/events/add`}>
                    <button className="btn btn-secondary" >Add a New Event</button>
                </Link>
          </div>
      </>
    )
};

export default FriendPage;