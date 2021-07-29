import React, { useEffect, useState } from "react";
import { GetUserWishlist } from "../../modules/giftManager";
import FriendGift from "./FriendGift"

const FriendWishList = () => {
    const [gifts, setGifts] = useState([]);

    const getYourEvents = () => {
        GetUserWishlist().then(events => setGifts(events));
    }

    useEffect(() => {
        getYourEvents();
    }, [])

    return (
        <>
        <div className="container">
        <div className="header m-2 p-2 ">
            <h1>Friend's Gift List</h1>
        </div>
            <div className="container">
                <div className="row m-5 ">
                    {gifts?.map((gift) => (
                        <FriendGift gift={gift} key={gift.id} />
                    ))}
                </div>
            </div>
        </div>
        </>
    )
};

export default FriendWishList;