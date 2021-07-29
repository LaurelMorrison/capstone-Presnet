import React, { useEffect, useState } from "react";
import { GetAllUserEvents, deleteEvent } from "../../modules/eventManager";
import { Link } from "react-router-dom";
import Event from "./Event"

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
        <div className="container">
        <div className="header m-2 p-2 ">
                    <h1>Your Events</h1>
                </div>
                <Link to={`/events/add`}>
                    <button className="btn btn-secondary" >Add New Event</button>
                </Link>
                <div className="container">
                    <div className="row m-5 ">
                    {events?.map((event) => (
                        <Event event={event} key={event.id} handleDelete={handleDelete}/>
                    ))}
                    </div>
                </div>
            </div>
        </>
    )
};

export default UserEventList;