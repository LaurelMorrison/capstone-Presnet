import React, { useEffect, useState } from "react";
import { GetUpcomingEvents } from "../../modules/eventManager";
import UpcomingEvent from "./UpcomingEvent"
import "./event.css";
import { Container, Row } from "reactstrap";
import { Table } from "reactstrap";

const UpcomingEventList = () => {
    const [upcomingevents, setUpcomingEvents] = useState([]);

    const getUpcomingEvents = () => {
        GetUpcomingEvents().then(upcomingevents => setUpcomingEvents(upcomingevents));
    }

    const upcomingEvents = getUpcomingEvents();
    // console.log(upcomingEvents.slice(0,5))

    useEffect(() => {
        getUpcomingEvents();
    }, [])

    return (
        <>
        <Container>
        <Row className="eventCard2" >
            <Table>
                 <thead>
                    <tr>
                    <th>Event</th>
                    <th>Date</th>
                    <th>Friend</th>
                    <th>Details</th>
                    </tr>
                </thead>

                <tbody>
                    {upcomingevents?.map((event) => (
                        <UpcomingEvent event={event} key={event.id} />
                    ))}
                </tbody>
            </Table>
        </Row>
         </Container>
        </>
    )
};

export default UpcomingEventList;