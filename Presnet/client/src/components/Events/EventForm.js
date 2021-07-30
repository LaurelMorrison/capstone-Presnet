import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { addEvent } from '../../modules/eventManager';

const EventForm = () => {
    const emptyEvent = {
        eventName: '',
        eventDetails: '',
        date: 0
    };

    const [newEvent, setNewEvent] = useState(emptyEvent);
    const history = useHistory();

    const handleInputChange = (evt) => {
        const value = evt.target.value;
        const key = evt.target.id;

        const eventCopy = { ...newEvent };

        eventCopy[key] = value;
        setNewEvent(eventCopy);
    };


    const handleSave = (evt) => {
        evt.preventDefault();
        addEvent(newEvent).then((e) => {
            history.push("/events");
        });

    };


    return (
        <Form>
            <h2>Add a New Event</h2>
            <FormGroup>
                <Label for="eventName">Event Name: </Label>
                <Input type="text" name="eventName" id="eventName" placeholder="Name"
                    value={newEvent.eventName}
                    onChange={handleInputChange} />
            </FormGroup>
            <FormGroup>
                <Label for="eventDetails">Details: </Label>
                <Input type="text" name="eventDetails" id="eventDetails" placeholder="Details"
                    value={newEvent.eventDetails}
                    onChange={handleInputChange} />
            </FormGroup>
            <FormGroup>
                <Label for="date">Date: </Label>
                <Input type="date" name="date" id="date" placeholder="Date"
                    value={newEvent.date}
                    onChange={handleInputChange} />
            </FormGroup>
        

            <Button className="btn btn-primary" onClick={handleSave}>Submit</Button>
            <Button className="btn btn-primary" onClick={() => history.push(`/events`)}>Cancel</Button>

        </Form>
    );
};

export default EventForm;