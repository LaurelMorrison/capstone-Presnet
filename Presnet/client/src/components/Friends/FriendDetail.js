import React, { useEffect, useState } from "react";
import { Card, Button } from "reactstrap";
import { Link, useParams } from "react-router-dom";
import { GetFriendById } from "../../modules/friendManager";

const FriendDetails = () => {

    const [friend, setFriend] = useState();

    const { friendId } = useParams();

    // const history = useHistory();

    // const deleteAFriend = (event) => {
    //     event.preventDefault()
    //     const confirmDelete = window.confirm("Are you sure you would like to delete this friend?")
    //     if (confirmDelete) {
    //         deleteFriend(friend.id).then(() => {history.push('/friend')})
    //     };
    // }

    useEffect(() => {
        GetFriendById(friendId)
            .then(setFriend);
    }, [friendId]);

    if (!friend) {
        return null;
    }

    return (
        <div>
            <Card className="m-4">
                <h1>Let's celebrate {friend.friendProfile.firstName}</h1>
                <p className="text-left px-2">Name: {friend.friendProfile.fullName}</p>
                <p className="text-left px-2">Email: {friend.friendProfile.email}</p>
                <p className="text-left px-2">Address: {friend.friendProfile.address}</p>
                <p className="text-left px-2">Age: {friend.friendProfile.age}</p>
                <p className="text-left px-2">Shoe Size: {friend.friendProfile.shoeSize}</p>
                <p className="text-left px-2">Favorite Color: {friend.favoriteColor.color}</p>
                <p className="text-left px-2">Clothing Size: {friend.clothingSize.size}</p>
                <Button className="b backtofriends"><Link className="a" to={`/friend`}>Back to Friend List</Link></Button>
                {/* <p>{new Date(post.publishDateTime).toLocaleDateString()}</p> */}
                    {/* <Button className="b addComment"><Link className="a" to={`/comment/${post.id}`}>Add Comment</Link></Button>
                    <Button className="b viewComment"><Link className="a" to={`/comment/GetByPostId/${post.id}`}>View Comments</Link></Button>
                    <Button className="b deletePost" onClick={deleteAFriend}>Delete Post</Button> */}
            </Card>
        </div>
    );
};

export default FriendDetails;