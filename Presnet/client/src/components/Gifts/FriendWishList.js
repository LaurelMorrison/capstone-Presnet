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
        if (friendId) {
            console.log(friendId);
            getFriendWishList(friendId);
        }
    }, [friendId])

    return (
        <>
            <div className="container">
                {!gifts.length ? (<div className="noGiftsMessage">Your friend currently doesnt have any gifts listed, remind them to build a list so you know what to get them!</div>) : (
                    gifts?.map((gift) => (
                        <FriendGift gift={gift} key={gift.id} />
                    ))
                )}
            </div>
        </>
    )
};

export default FriendWishList;