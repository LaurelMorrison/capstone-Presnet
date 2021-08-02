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
        <Container>
        <Row className="eventCard1 justify-content-left">
             <div className="eventHeader ">
                    <h1>Your Events</h1>
                </div>
                <Link to={`/events/add`}>
                    <button className="button" >Add a New Event</button>
                </Link>
        </Row>
        <Row className="eventCard2" >
                    <div className="eventMap ">
                    {events?.map((event) => (
                        <Event event={event} key={event.id} handleDelete={handleDelete}/>
                    ))}
                    </div>
        </Row>
         </Container>
        </>
    )
};

export default UserEventList;