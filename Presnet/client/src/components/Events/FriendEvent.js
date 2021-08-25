import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

const FriendEvent = ({ event }) => {

  const date = new Date(event.date);
  const createDateTime = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();

  return (
    <>
      <Card className="friendEventCard p-1">
        <CardBody className="card-content">
          <h5>{event.eventName}</h5>
          {event.userId === 1 ? ("") : (
            <p><Link to={`/friend/getbyid/${event.userId}`}>{event.userProfile.fullName}</Link></p>)}
          <p>{event.eventDetails}</p>
          <p>{createDateTime}</p>
        </CardBody>
      </Card>

    </>
  );
};

export default FriendEvent;