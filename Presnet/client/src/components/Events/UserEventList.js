import React, { useEffect, useState } from "react";
import { GetAllUserEvents, deleteEvent } from "../../modules/eventManager";
import { Link } from "react-router-dom";
import Event from "./Event"
import "./event.css";
import { Container, Row } from "reactstrap";

const UserEventList = () => {
    const [events, setEvents] = useState([]);

    const getYourEvents = () => {
        GetAllUserEvents().then(events => setEvents(events));
    }

    const handleDelete = (id) => {
        deleteEvent(id)
            .then(() => getYourEvents())
    }

    useEffect(() => {
        getYourEvents();
    }, [])

    return (
        <>
            <Container className="userEventSection">
                <Row className="eventCard1 justify-content-center">
                    <div className="eventHeader ">
                        <h1>Your Events</h1>
                    </div>
                    <Link to={`/events/add`}>
                        <button className="button" >Add a New Event</button>
                    </Link>
                </Row>
                <Row className="eventCard2" >
                    <div className="eventMap ">
                        {!events.length ? (<div className="noEventsMessage">You currently don't have any events, add an event today!</div>) : (
                            events?.map((event) => (
                                <Event event={event} key={`userEvent-${event.id}`} handleDelete={handleDelete} />
                            ))
                        )}
                    </div>
                </Row>
            </Container>
        </>
    )
};

export default UserEventList;