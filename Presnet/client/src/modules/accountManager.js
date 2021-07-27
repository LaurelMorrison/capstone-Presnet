import { getToken } from './authManager'

const baseUrl = '/api/userProfile';

export const GetAllUsers = () => {
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
          throw new Error("An unknown error occorred while trying to fetching friends");
        }
      });
    });
  };

export const GetUserById = (id) => {
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
              throw new Error("An unknown error occorred while trying to fetch your friend");
            }
          });
        });
      };

export const searchUsers = (criteria, order) => {
        return getToken().then((token) => {
      
          return fetch(`${baseUrl}/Search?q=${criteria}&sortDesc=${order}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            }
          }).then(resp => {
            if (resp.ok) {
              return resp.json();
            } else {
              throw new Error("An unknown error occurred while trying to search for friends.");
            }
          });
        });
      };
      