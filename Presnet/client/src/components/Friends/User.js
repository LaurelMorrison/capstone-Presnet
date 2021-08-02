import React from "react";
import { Button, CardFooter } from "reactstrap";
import { Link } from "react-router-dom";
import { Card, CardBody } from "reactstrap";

const User = ({ user, initFriendRequest }) => {

  const friendStatus = user.friend.statusId

  return (
    <tr>
          <td><p className="friendCard">{user.fullName}</p></td>
          <td>
            {friendStatus === 3 ? (<p className="pendingRequest">Request Pending</p>): (
          <Button className="button" onClick={() => {initFriendRequest(user)}}>Add friend</Button>)}
        </td>
    </tr>
  );
};

export default User;