import React from "react";
import { Card, CardBody, Button, CardFooter } from "reactstrap";
import { Link } from "react-router-dom";

const Event = ({ event, handleDelete  }) => {

    const date = new Date(event.date);
    const createDateTime = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();

  return (
      <>
        <Card className="col-s-1 m-4 p-1">
            <CardBody className="card-content">
                <p>{event.eventName}</p>
                <p>{event.eventDetails}</p>
                <p>{createDateTime}</p>
            </CardBody>
            <CardFooter className="text-center">
                    <Link to={`/events/edit/${event.id}`}>
                        <Button className="button">Edit</Button>
                    </Link>
                    <Link>
                        <Button className="button" onClick={() => handleDelete(event.id)}>Delete</Button>
                    </Link>
            </CardFooter>
        </Card>

      </>
  );
};

export default Event;