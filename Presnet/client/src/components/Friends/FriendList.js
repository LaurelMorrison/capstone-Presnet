import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import Friend from "./Friend"
import { GetAllFriends } from "../../modules/accountManager";
import FriendRequest from "./FriendRequest";
import { GetFriendRequest, acceptFriendRequest, rejectFriendRequest } from "../../modules/friendManager"
import { GetFriendsEvents } from "../../modules/eventManager";

const FriendList = () => {
    const [friends, setFriends] = useState([]);
    const [friendRequests, setFriendRequests] = useState([]);
    const [isDeleted, setIsDeleted] = useState(false);

    const getFriends = () => {
        GetAllFriends().then(friends => setFriends(friends));
    }

    const getFriendRequests = () => {
        GetFriendRequest().then(friendRequests => setFriendRequests(friendRequests));
    }

    const acceptFriendAndRefresh = async (friendRequestId) => {
        await acceptFriendRequest(friendRequestId)
        getFriends();
        getFriendRequests();
    }

    const rejectFriendAndRefresh = async (friendRequestId) => {
        await rejectFriendRequest(friendRequestId)
        getFriends();
        getFriendRequests();
    }

    useEffect(() => {
        getFriends();
        getFriendRequests();
    }, [isDeleted])

    return (
        <>
        <div className="container">
         <div className="row justify-content-center">
             <h1>Friend List</h1>
             <Table>
             <tbody>
                    {friends?.map((friend) => (
                        <Friend friend={friend} key={friend.Id} setIsDeleted={setIsDeleted} isDeleted={isDeleted} />
                    ))}

                </tbody>
            </Table>
            </div>
        <div className="row justify-content-center">
             <Table>
             <thead>
               <tr>
                    <th>Friends</th>
                </tr>
             </thead>
             <tbody>
                    {friendRequests?.map((friendRequest) => (
                        <FriendRequest friendRequest={friendRequest} key={friendRequest.Id} acceptFriendAndRefresh={acceptFriendAndRefresh} rejectFriendAndRefresh={rejectFriendAndRefresh} />
                    ))}

                </tbody>
            </Table>
            </div>
        </div>
        </>
    )
};

export default FriendList;