import React from "react";
import { Card, CardBody, Button, CardFooter } from "reactstrap";
import { Link } from "react-router-dom";

const Event = ({ event, handleDelete }) => {

    const date = new Date(event.date);
    const createDateTime = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();

    return (
        <>
            <Card className="eventCard p-1">
                <CardBody className="card-content">
                    <h5>{event.eventName}</h5>
                    <p>{event.eventDetails}</p>
                    <p>{createDateTime}</p>
                </CardBody>
                <CardFooter className="buttonBox">
                    <Link to={`/events/edit/${event.id}`}>
                        <Button className="button space">Edit</Button>
                    </Link>
                    <Button className="button" onClick={() => handleDelete(event.id)}>Delete</Button>
                </CardFooter>
            </Card>

        </>
    );
};

export default Event;