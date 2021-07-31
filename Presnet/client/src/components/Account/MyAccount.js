import React, { useEffect, useState } from "react";
import { Card, Button } from "reactstrap";
import { Link, useParams } from "react-router-dom";
import { GetCurrentUserAccount, GetUserById } from "../../modules/accountManager";
import UserEventList from "../Events/UserEventList";

const MyAccount = () => {

    const [user, setUser] = useState();

    // const history = useHistory();

    // const deleteAFriend = (event) => {
    //     event.preventDefault()
    //     const confirmDelete = window.confirm("Are you sure you would like to delete this friend?")
    //     if (confirmDelete) {
    //         deleteFriend(friend.id).then(() => {history.push('/friend')})
    //     };
    // }

    useEffect(() => {
      GetCurrentUserAccount()
            .then(setUser);
    }, []);

    if (!user) {
        return null;
    }

    return (
        <>
        <div>
            <Card className="m-4">
                <h1>Hello, {user.firstName}!</h1>
                <p className="text-left px-2">Name: {user.fullName}</p>
                <p className="text-left px-2">Email: {user.email}</p>
                <p className="text-left px-2">Address: {user.address}</p>
                <p className="text-left px-2">Age: {user.age}</p>
                <p className="text-left px-2">Shoe Size: {user.shoeSize}</p>
                <p className="text-left px-2">Favorite Color: {user.favoriteColor.color}</p>
                <p className="text-left px-2">Clothing Size: {user.clothingSize.size}</p>
                <Button className="b editUser"><Link className="a" to={`/userprofile/edit/${user.id}`}>Edit Profile</Link></Button>
            </Card>
        </div>
        <div>
            <UserEventList />
        </div>
        <div>
            <h1>Your Wish List</h1>
            <p>Have a gift idea? Let your loved ones know, build a wish list to give them a hint at what to get you!</p>
            <Link to={`/wishList`}>
                    <button className="btn btn-secondary" >Your Wish List</button>
                </Link>
        </div>
        </>
    );
};

export default MyAccount;