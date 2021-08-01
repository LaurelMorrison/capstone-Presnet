import React from "react";

const FriendRequest = ({friendRequest, acceptFriendAndRefresh, rejectFriendAndRefresh}) => {

  return (
      <>
            <p>Will you be my friend</p>
            <p>{friendRequest.userProfile.fullName}</p>
            <button className="button" onClick={() => {acceptFriendAndRefresh(friendRequest.id)}}>Accept</button>
            <button className="button" onClick={() => {rejectFriendAndRefresh(friendRequest.id)}}>Decline</button>
    </>
  );
};

export default FriendRequest;