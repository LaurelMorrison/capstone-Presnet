import React, { useEffect, useState } from "react";
import { GetFriendsWishlist } from "../../modules/giftManager";
import FriendGift from "./FriendGift"
import { useParams } from "react-router-dom";
import { GetFriendById } from "../../modules/friendManager";

const FriendWishList = () => {
    const [gifts, setGifts] = useState([]);
    const { friendId } = useParams();

    const getFriendWishList = (friendId) => {
        GetFriendsWishlist(friendId).then(gifts => setGifts(gifts));
    }

    useEffect(() => {
        if (friendId){
            console.log(friendId);
        getFriendWishList(friendId);}
    }, [friendId])

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