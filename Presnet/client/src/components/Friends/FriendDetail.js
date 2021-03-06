import React, { useEffect, useState } from "react";
import { Card, Button } from "reactstrap";
import { Link, useParams } from "react-router-dom";
import { GetFriendById } from "../../modules/friendManager";
// import FriendEventList from "../Events/UserEventList";
import FriendWishList from "../Gifts/FriendWishList";

const FriendDetails = () => {

    const [friend, setFriend] = useState();
    const { friendId } = useParams();

    useEffect(() => {
        GetFriendById(friendId)
            .then(setFriend);
    }, [friendId]);

    if (!friend) {
        return null;
    }

    return (
        <>
            <div>
                <Card className="userCard m-4">
                    <h1>Let's celebrate {friend.userProfile.firstName}</h1>
                    <p className="text-left px-2">Name: {friend.userProfile.fullName}</p>
                    <p className="text-left px-2">Email: {friend.userProfile.email}</p>
                    <p className="text-left px-2">Address: {friend.userProfile.address}</p>
                    <p className="text-left px-2">Age: {friend.userProfile.age}</p>
                    <p className="text-left px-2">Shoe Size: {friend.userProfile.shoeSize}</p>
                    <p className="text-left px-2">Favorite Color: {friend.favoriteColor.color}</p>
                    <p className="text-left px-2">Clothing Size: {friend.clothingSize.size}</p>
                    <Link className="a" to={`/friends`}><Button className="button">Back to Friend List</Button></Link>

                </Card>
            </div>
            {/* <div className="friendsEventCallout">
            <h1>{friend.friendProfile.firstName}'s Events</h1>
             <FriendEventList />
        </div> */}
            <div>
                <div className="friendsWishListCallout">
                    <h1>Wish List</h1>
                    <p>Need an idea on what to get? Check out their wish list to get the perfect gift!</p>
                    <FriendWishList />
                </div>
            </div>
        </>
    );
};

export default FriendDetails;