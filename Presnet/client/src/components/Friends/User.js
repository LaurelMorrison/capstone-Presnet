import React from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import { Card, CardBody } from "reactstrap";

const User = ({ user, initFriendRequest }) => {

  const friendStatus = user.friend.statusId

  return (
    <Card>
          <CardBody>
            <p>{user.firstName}</p>
            {friendStatus === 3 ? (<p>Request Pending</p>): (
          <Button className="button" onClick={() => {initFriendRequest(user)}}>Add friend</Button>)}
        </CardBody>
    </Card>
  );
};

export default User;