const baseUrl = '/api/FavoriteColor';


export const GetAllColors = () => {
        return fetch(baseUrl, {
            method: "GET",
            headers: {
            },
        }).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("An unknown error ocurred while trying to fetch all the colors")
            }
        })
}

export const GetColorById = (id) => {
        return fetch(`${baseUrl}/${id}`, {
            method: "GET",
            headers: {
            },
        }).then((res) => res.json())
}