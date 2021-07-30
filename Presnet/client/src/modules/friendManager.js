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

      export const addFriend = (friend) => {
        return getToken().then((token) => {
            return fetch(baseUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(friend)
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