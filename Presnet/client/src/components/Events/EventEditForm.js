import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { GetEventById, updateEvent } from "../../modules/eventManager";
import { momentDateFixer } from "../../modules/helper";

const EventEditForm = () => {
    const [updatedEvent, setupdatedEvent] = useState([]);
    const { id } = useParams();
    const history = useHistory();

    const fetchEvent = () => {
        return GetEventById(id).then(event => {
            let editedEvent = event
            editedEvent.date = momentDateFixer(event)
            setupdatedEvent(editedEvent)
        });
    }

    const handleInputChange = (evt) => {
        const value = evt.target.value;
        const key = evt.target.id;

        const eventPost = { ...updatedEvent };

        eventPost[key] = value;
        setupdatedEvent(eventPost);
    };

    const handleDate = (evt) => {
        evt.preventDefault();
        let eventPost = { ...updatedEvent };
        console.log(evt.target.value)
        let editDate = evt.target.value
        eventPost[evt.target.id] = editDate
        setupdatedEvent(eventPost)
    }


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
        fetchEvent()
    }, [])

    return (
        <Form className="eventEditForm">
            <h2>Edit Event</h2>
            <FormGroup className="formBox">
                <Label for="eventName">Event Name</Label>
                <Input type="text" name="eventName" id="eventName" placeholder="eventName"
                    value={updatedEvent.eventName}
                    onChange={handleInputChange} />
            </FormGroup>
            <FormGroup className="formBox">
                <Label for="eventDetails">Event Details</Label>
                <Input type="text" name="eventDetails" id="eventDetails" placeholder="eventDetails"
                    value={updatedEvent.eventDetails}
                    onChange={handleInputChange} />
            </FormGroup>
            <FormGroup className="formBox">
                <Label for="date">Date</Label>
                <Input type="date" name="date" id="date" placeholder="date"
                    defaultValue={momentDateFixer(updatedEvent)} value={updatedEvent.date} 
                    format="YYYY-MM-DD" onChange={handleDate}  />
            </FormGroup>
            <div className="buttonBox">
            <Button className="button" onClick={handleUpdate}>Submit</Button>
            <Button className="button" onClick={() => history.push(`/events`)}>Cancel</Button>
            </div>
        </Form>
    );

};

export default EventEditForm;