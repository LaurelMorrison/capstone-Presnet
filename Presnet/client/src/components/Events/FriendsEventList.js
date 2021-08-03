import React, { useEffect, useState } from "react";
import { GetFriendsEvents } from "../../modules/eventManager";
import FriendEvent from "./FriendEvent"

const FriendEventList = () => {
    const [events, setEvents] = useState([]);

    const getFriendEvents = () => {
        GetFriendsEvents().then(events => setEvents(events));
    }

    useEffect(() => {
        getFriendEvents();
    }, [])

    return (
        <>
        <div className="container">
        <div className="header m-2 p-2 ">
            <h1>Friends Events</h1>
        </div>
            <div className="container">
                <div className="row m-5 ">
                {!events.length ? (<div className="noEventsMessage">You have no upcoming friend events.</div>): (
                    events?.map((event) => ( 
                        <FriendEvent event={event} key={event.id} />
                    ))
                )}
                </div>
            </div>
        </div>
        </>
    )
};

export default FriendEventList;