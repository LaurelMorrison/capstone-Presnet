import React from "react";
import { Card, CardBody, Button, CardFooter } from "reactstrap";
import { Link } from "react-router-dom";

const FriendEvent = ({ event  }) => {

    const date = new Date(event.date);
    const createDateTime = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();

  return (
      <>
        <Card className="col-s-1 m-4 p-1">
            <CardBody className="card-content">
                <p>{event.eventName}</p>
                <p><Link to={`/friend/getbyid/${event.userId}`}>{event.userProfile.firstName}</Link></p>
                <p>{event.eventDetails}</p>
                <p>{createDateTime}</p>
            </CardBody>
        </Card>

      </>
  );
};

export default FriendEvent;