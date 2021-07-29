import React from "react";
import { Card, CardBody } from "reactstrap";

const Event = ({ event }) => {

  return (
      <>
        <Card className="col-s-1 m-4 p-1">
          <p>{event.eventName}</p>
          <p>{event.eventDetails}</p>
          <p>{event.date}</p>
          </Card>

      </>
  );
};

export default Event;