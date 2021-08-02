import React from "react";

const UpcomingEvent = ({ event  }) => {

    const date = new Date(event.date);
    const createDateTime = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();

  return (
      <>
        <tr>
            <td><p>{event.eventName}</p></td>
            <td><p>{createDateTime}</p></td>
            <td><p>{event.userProfile.firstName}</p></td>
            <td><p>{event.eventDetails}</p></td>
        </tr>
      </>
  );
};

export default UpcomingEvent;