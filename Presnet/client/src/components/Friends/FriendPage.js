import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Spinner } from "reactstrap";
import FriendList from "./FriendList";
import { onLoginStatusChange } from "../../modules/authManager";
import UserList from "./UserList";

function FriendPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(null);

    useEffect(() => {
      onLoginStatusChange(setIsLoggedIn);
    }, []);
  
  
    if (isLoggedIn === null) {
      return <Spinner className="app-spinner dark"/>;
    }
  
    return (
      <Router>
          <FriendList isLoggedIn={isLoggedIn} />
          <UserList isLoggedIn={isLoggedIn} />
      </Router>
    )
};

export default FriendPage;