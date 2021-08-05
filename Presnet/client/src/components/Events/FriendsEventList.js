import React, { useEffect, useState } from "react";
import { GetFriendsEvents } from "../../modules/eventManager";
import FriendEvent from "./FriendEvent"
import { Container, Row } from "reactstrap";

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
            <Container className="friendEventSection">
                <Row className="eventCard1 justify-content-center">
                    <div className="eventHeader">
                        <h1>Friends Events</h1>
                    </div>
                </Row>
                <Row className="eventCard2" >
                    <div className="eventMap">
                        {!events.length ? (<div className="noEventsMessage">You have no upcoming friend events.</div>) : (
                            events?.map((event) => (
                                <FriendEvent event={event} key={event.id} />
                            ))
                        )}
                    </div>
                </Row>
            </Container>
        </>
    )
};

export default FriendEventList;