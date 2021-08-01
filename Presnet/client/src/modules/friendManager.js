import { getToken } from './authManager'

const baseUrl = '/api/friend';


export const GetFriendById = (friendId) => {
        return getToken().then((token) => {
          return fetch(`${baseUrl}/getbyid/${friendId}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${ token }`
            }
          }).then(res => {
            if (res.ok) {
              return res.json();
            } else {
              throw new Error("An unknown error occorred while trying to fetch your friend");
            }
          });
        });
      };

      export const addFriend = (friendId) => {
        return getToken().then((token) => {
            return fetch(`${baseUrl}/${friendId}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            })
        })};

        export const deleteFriend = (id) => {
          return getToken().then((token) => {
              return fetch(`${baseUrl}/${id}`, {
                  method: "DELETE",
                  headers: {
                      Authorization: `Bearer ${token}`,
                      "Content-Type": "application/json"
                  },
              })
            })}


   export const GetFriendRequest = () => {
       return getToken().then((token) => {
                return fetch(`${baseUrl}/pending`, {
                  method: "GET",
                  headers: {
                    Authorization: `Bearer ${token}`
                  }
                }).then(res => {
                  if (res.ok) {
                    return res.json();
                  } else {
                    throw new Error("An unknown error occorred while trying to fetching your friends");
                  }
                });
              });
            };

  export const acceptFriendRequest = (friendRequestId) => {
              return getToken().then((token) => {
                return fetch(`${baseUrl}/accept/${friendRequestId}`, {
                  method: "PUT",
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"            
                  },
                }).then(resp => {
                  if (resp.ok) {
                    return;
                  } else if (resp.status === 401) {
                    throw new Error("Unauthorized");
                  } else {
                    throw new Error("An unknown error occurred while trying to add a friend.");
                  }
                });
              });
            }

  export const rejectFriendRequest = (friendRequestId) => {
              return getToken().then((token) => {
                return fetch(`${baseUrl}/reject/${friendRequestId}`, {
                  method: "PUT",
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"            
                  },
                }).then(resp => {
                  if (resp.ok) {
                    return;
                  } else if (resp.status === 401) {
                    throw new Error("Unauthorized");
                  } else {
                    throw new Error("An unknown error occurred while trying to add a friend.");
                  }
                });
              });
            }            