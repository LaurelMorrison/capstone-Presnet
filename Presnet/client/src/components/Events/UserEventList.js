import React, { useEffect, useState } from "react";
import { GetAllUserEvents } from "../../modules/eventManager";
import Event from "./Event"

const UserEventList = () => {
    const [events, setEvents] = useState([]);

    const getYourEvents = () => {
        GetAllUserEvents().then(events => setEvents(events));
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
                <div className="container">
                    <div className="row m-5 ">
                    {events?.map((event) => (
                        <Event event={event} key={event.id} />
                    ))}
                    </div>
                </div>
            </div>
        </>
    )
};

export default UserEventList;