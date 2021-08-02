import React from "react";
import { Card, CardBody, Button, CardFooter } from "reactstrap";
import "./friend.css"

const FriendRequest = ({friendRequest, acceptFriendAndRefresh, rejectFriendAndRefresh}) => {

  return (
      <>
        <Card className="friendRequestCard p-1">
            <CardBody className="card-content">
                <p>Request from: {friendRequest.userProfile.fullName}</p>
                <p>Will you be my friend?</p>
            </CardBody>
            <CardFooter className="cardFooter">
                <button className="button space" onClick={() => {acceptFriendAndRefresh(friendRequest.id)}}>Accept</button>
                <button className="button" onClick={() => {rejectFriendAndRefresh(friendRequest.id)}}>Decline</button>
            </CardFooter>
        </Card>
    </>
  );
};

export default FriendRequest;