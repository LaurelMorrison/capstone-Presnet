import React, { useEffect, useState } from "react";
import { GetFriendsEvents } from "../../modules/eventManager";
import FriendEvent from "./FriendEvent"

const FriendEventList = () => {
    const [events, setEvents] = useState([]);

    const getYourEvents = () => {
        GetFriendsEvents().then(events => setEvents(events));
    }

    useEffect(() => {
        getYourEvents();
    }, [])

    return (
        <>
        <div className="container">
        <div className="header m-2 p-2 ">
            <h1>Friends Events</h1>
        </div>
            <div className="container">
                <div className="row m-5 ">
                    {events?.map((event) => (
                        <FriendEvent event={event} key={event.id} />
                    ))}
                </div>
            </div>
        </div>
        </>
    )
};

export default FriendEventList;