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
          throw new Error("An unknown error occorred while trying to fetching users");
        }
      });
    });
  };

  export const GetAllFriends = () => {
    return getToken().then((token) => {
      return fetch(`${baseUrl}/friendList`, {
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

  export const GetNonFriends = () => {
    return getToken().then((token) => {
      return fetch(`${baseUrl}/userList`, {
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
              throw new Error("An unknown error occorred while trying to fetch the account profile");
            }
          });
        });
      };


      export const updateUser = (user) => {
        return getToken().then((token) => {
          return fetch(`${baseUrl}/${user.id}`, {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"            
            },
            body: JSON.stringify(user)
          }).then(resp => {
            if (resp.ok) {
              return;
            } else if (resp.status === 401) {
              throw new Error("Unauthorized");
            } else {
              throw new Error("An unknown error occurred while trying to update your account.");
            }
          });
        });
      }

// export const searchUsers = (criteria, order) => {
//         return getToken().then((token) => {
      
//           return fetch(`${baseUrl}/Search?q=${criteria}&sortDesc=${order}`, {
//             method: "GET",
//             headers: {
//               Authorization: `Bearer ${token}`,
//             }
//           }).then(resp => {
//             if (resp.ok) {
//               return resp.json();
//             } else {
//               throw new Error("An unknown error occurred while trying to search for friends.");
//             }
//           });
//         });
//       };
      