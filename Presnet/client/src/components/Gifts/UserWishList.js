import React, { useEffect, useState } from "react";
import { GetUserWishlist, deleteGift } from "../../modules/giftManager";
import { Link } from "react-router-dom";
import Gift from "./Gift"

const UserGiftList = () => {
    const [gifts, setGifts] = useState([]);

    const getYourGifts = () => {
        GetUserWishlist().then(gifts => setGifts(gifts));
    }

    const handleDelete = (id) => {
        deleteGift(id)
            .then(() => getYourGifts())
    }

    useEffect(() => {
        getYourGifts();
    }, [])

    return (
        <>
        <div className="container">
        <div className="header m-2 p-2 ">
                <h1>Your Wish List</h1>
                </div>
                <Link to={`/wishList/add`}>
                    <button className="btn btn-secondary" >Add New Gift</button>
                </Link>
                <div className="container">
                    <div className="row m-5 ">
                    {gifts?.map((gift) => (
                        <Gift gift={gift} key={gift.id} handleDelete={handleDelete}/>
                    ))}
                    </div>
                </div>
            </div>
        </>
    )
};

export default UserGiftList;