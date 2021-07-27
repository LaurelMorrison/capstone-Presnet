import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Table } from "reactstrap";
import Friend from "./Friend"
import { getAllFriends } from "../../modules/friendManager"
import { searchUsers } from "../../modules/accountManager";

const FriendList = () => {
    const [friends, setFriends] = useState([]);
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState([])


    const getFriends = () => {
        getAllFriends().then(friends => setFriends(friends));
    }

    useEffect(() => {
        getFriends();
    }, [])

    return (
        <>
        <div className="container">
         <div className="row justify-content-center">
             <Table>
             <thead>
               <tr>
                    <th>Friends</th>
                </tr>
             </thead>
             <tbody>
                    {friends?.map((friend) => (
                        <Friend friend={friend} key={friend.Id} />
                    ))}

                </tbody>
            </Table>
            </div>
        </div>
        </>
    )
};

export default FriendList;