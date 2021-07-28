import React, { useEffect, useState } from "react";
import { Card, Button } from "reactstrap";
import { Link, useParams } from "react-router-dom";
import { GetUserById } from "../../modules/accountManager";

const MyAccount = () => {

    const [user, setUser] = useState();

    const { id } = useParams();

    // const history = useHistory();

    // const deleteAFriend = (event) => {
    //     event.preventDefault()
    //     const confirmDelete = window.confirm("Are you sure you would like to delete this friend?")
    //     if (confirmDelete) {
    //         deleteFriend(friend.id).then(() => {history.push('/friend')})
    //     };
    // }

    useEffect(() => {
      GetUserById(id)
            .then(setUser);
    }, [id]);

    if (!user) {
        return null;
    }

    return (
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
                <Button className="b editUser"><Link className="a" to={`/userprofile/edit/${user.Buttonid}`}>Edit Profile</Link></Button>
            </Card>
        </div>
    );
};

export default MyAccount;