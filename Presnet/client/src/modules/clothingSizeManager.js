const baseUrl = '/api/ClothingSize';


export const GetAllSizes = () => {
    return fetch(baseUrl, {
        method: "GET",
        headers: {
        },
    }).then(res => {
        if (res.ok) {
            return res.json();
        } else {
            throw new Error("An unknown error ocurred while trying to fetch all the sizes")
        }
    })
}

export const GetSizeById = (id) => {
    return fetch(`${baseUrl}/${id}`, {
        method: "GET",
        headers: {
        },
    }).then((res) => res.json())
}