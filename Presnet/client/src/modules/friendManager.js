import { getToken } from './authManager'

const baseUrl = '/api/friend';

export const getAllFriends = () => {
    return getToken().then((token) => {
      return fetch(baseUrl, {
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

      export const addFriend = (comment) => {
        return getToken().then((token) => {
            return fetch(baseUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(comment)
            })
        })};

        export const deleteFriend = (friendId) => {
          return getToken().then((token) => {
              return fetch(`${baseUrl}/delete/${friendId}`, {
                  method: "Delete",
                  headers: {
                      Authorization: `Bearer ${token}`,
                      "Content-Type": "application/json"
                  },
              })
            })}