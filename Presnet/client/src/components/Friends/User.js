import React from "react";
import { Button } from "reactstrap";

const User = ({ user, initFriendRequest }) => {

  const friendStatus = user.friend?user.friend.statusId : 0; 
  const friendId = user.friend?user.friend.friendId : 0;
  const userId = user.friend?user.friend.userId : 0;
  console.log(friendId, userId, friendStatus)
  console.log(user)
  // var SearchResults = getSearchResults()

  // function getSearchResults(){
  //   if (friendStatus == 1){
  //    return "Already your friend";
  //   } else if (friendStatus == 2){
  //     return "This user is blocked"
  //   } 
  return (
    <tr>
          <td><p className="friendCard">{user.fullName}</p></td>
          <td>
            {(friendStatus === 3) ? (<p className="pendingRequest">Request Pending</p>): friendStatus === 2 ? (<p>User is blocked </p>) : (
          <Button className="button" onClick={() => {initFriendRequest(user)}}>Add friend</Button>)}
        </td>
    </tr>
  );
};


export default User;