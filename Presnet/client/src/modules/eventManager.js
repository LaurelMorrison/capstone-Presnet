import { getToken } from './authManager'

const baseUrl = '/api/event';

export const GetAllUserEvents = () => {
    return getToken().then((token) => {
      return fetch(`${baseUrl}/userevents`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("An unknown error occorred while trying to fetching your events");
        }
      });
    });
  };

  export const GetFriendsEvents = () => {
    return getToken().then((token) => {
      return fetch(`${baseUrl}/friendevents`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("An unknown error occorred while trying to fetching your friends events.");
        }
      });
    });
  };

  export const GetUpcomingEvents = () => {
    return getToken().then((token) => {
      return fetch(`${baseUrl}/upcomingevents`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("An unknown error occorred while trying to fetching your upcoming events.");
        }
      });
    });
  };

export const GetEventById = (id) => {
        return getToken().then((token) => {
          return fetch(`${baseUrl}/${id}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${ token }`
            }
          }).then(res => {
            if (res.ok) {
              return res.json();
            } else {
              throw new Error("An unknown error occorred while trying to fetch the event");
            }
          });
        });
      };


      export const updateEvent= (editEvent) => {
        return getToken().then((token) => {
          return fetch(`${baseUrl}/${editEvent.id}`, {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"            
            },
            body: JSON.stringify(editEvent)
          }).then(resp => {
            if (resp.ok) {
              return;
            } else if (resp.status === 401) {
              throw new Error("Unauthorized");
            } else {
              throw new Error("An unknown error occurred while trying to update your event.");
            }
          });
        });
      }

      export const addEvent = (event) => {
        return getToken().then((token) => {
            return fetch(baseUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(event)
            })
        })};

        export const deleteEvent = (eventId) => {
          return getToken().then((token) => {
              return fetch(`${baseUrl}/${eventId}`, {
                  method: "Delete",
                  headers: {
                      Authorization: `Bearer ${token}`,
                      "Content-Type": "application/json"
                  },
              })
            })}