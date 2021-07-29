import { getToken } from './authManager'

const baseUrl = '/api/wishList';

export const GetUserWishlist = () => {
    return getToken().then((token) => {
      return fetch(`${baseUrl}/wishlist`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("An unknown error occorred while trying to fetching the wish list");
        }
      });
    });
  };


    export const GetGiftById = (id) => {
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
              throw new Error("An unknown error occorred while trying to fetch the gift");
            }
          });
        });
      };


    export const updateGift= (editGift) => {
        return getToken().then((token) => {
          return fetch(`${baseUrl}/${editGift.id}`, {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"            
            },
            body: JSON.stringify(editGift)
          }).then(resp => {
            if (resp.ok) {
              return;
            } else if (resp.status === 401) {
              throw new Error("Unauthorized");
            } else {
              throw new Error("An unknown error occurred while trying to update your gift.");
            }
          });
        });
      }

      export const addGift = (gift) => {
        return getToken().then((token) => {
            return fetch(baseUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(gift)
            })
        })};

        export const deleteGift = (giftId) => {
          return getToken().then((token) => {
              return fetch(`${baseUrl}/${giftId}`, {
                  method: "Delete",
                  headers: {
                      Authorization: `Bearer ${token}`,
                      "Content-Type": "application/json"
                  },
              })
            })}