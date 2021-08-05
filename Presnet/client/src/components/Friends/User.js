import React from "react";
import { Button } from "reactstrap";

const User = ({ user, initFriendRequest }) => {

  const friendStatus = user.friend ? user.friend.statusId : 0;
  console.log(friendStatus);
  
  return (
    <tr>
      <td><p className="friendCard">{user.fullName}</p></td>
      <td>
        {(friendStatus === 3) ? (<p className="pendingRequest">Request Pending</p>) : friendStatus === 2 ? (<p>User is blocked </p>) : (
          <Button className="button" onClick={() => { initFriendRequest(user) }}>Add friend</Button>)}
      </td>
    </tr>
  );
};


export default User;