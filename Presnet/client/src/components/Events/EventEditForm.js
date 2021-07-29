import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { GetEventById, updateEvent } from "../../modules/eventManager";

const EventEditForm = () => {
    const [updatedEvent, setupdatedEvent] = useState([]);
    const { id } = useParams();
    const history = useHistory();

    const handleInputChange = (evt) => {
        const value = evt.target.value;
        const key = evt.target.id;

        const eventPost = { ...updateEvent };

        eventPost[key] = value;
        setupdatedEvent(eventPost);
    };



    const handleUpdate = (evt) => {
        evt.preventDefault();
        const updatedUserEvent = {
            id: updatedEvent.id,
            userId: updatedEvent.userId,
            eventName: updatedEvent.eventName,
            eventDetails: updatedEvent.eventDetails,
            date: updatedEvent.date,
        };
        updateEvent(updatedUserEvent).then((e) => {
            history.push("/events");
        });

    };
    useEffect(() => {
        GetEventById(id)
            .then(e => {
                setupdatedEvent(e);
            });
    }, [])

    return (
        <Form>
            <h2>Edit Event</h2>
            <FormGroup>
                <Label for="eventName">Event Name</Label>
                <Input type="text" name="eventName" id="eventName" placeholder="eventName"
                    value={updatedEvent.eventName}
                    onChange={handleInputChange} />
            </FormGroup>
            <FormGroup>
                <Label for="eventDetails">Event Details</Label>
                <Input type="text" name="eventDetails" id="eventDetails" placeholder="eventDetails"
                    value={updatedEvent.eventDetails}
                    onChange={handleInputChange} />
            </FormGroup>
            <FormGroup>
                <Label for="date">Date</Label>
                <Input type="date" name="date" id="date" placeholder="date"
                    value={updatedEvent.date}
                    onChange={handleInputChange} />
            </FormGroup>

            <Button className="btn btn-primary" onClick={handleUpdate}>Submit</Button>
            <Button className="btn btn-primary" onClick={() => history.push(`/events`)}>Cancel</Button>
        </Form>
    );

};

export default EventEditForm;