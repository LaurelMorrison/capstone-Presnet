import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import Friend from "./Friend"
import { GetAllFriends } from "../../modules/accountManager";

const FriendList = () => {
    const [friends, setFriends] = useState([]);
    const [isDeleted, setIsDeleted] = useState(false);
    const getFriends = () => {
        GetAllFriends().then(friends => setFriends(friends));
    }

    useEffect(() => {
        getFriends();
    }, [isDeleted])

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
                        <Friend friend={friend} key={friend.Id} setIsDeleted={setIsDeleted} isDeleted={isDeleted} />
                    ))}

                </tbody>
            </Table>
            </div>
        </div>
        </>
    )
};

export default FriendList;