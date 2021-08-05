import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import Friend from "./Friend"
import { GetAllFriends } from "../../modules/accountManager";
import FriendRequest from "./FriendRequest";
import { acceptFriendRequest, rejectFriendRequest } from "../../modules/friendManager"
import { Container, Row } from "reactstrap";
import "./friend.css"
import { useFriendRequests} from "../../modules/useFriendRequest";

const FriendList = () => {
    const [friends, setFriends] = useState([]);
    const {friendRequests, loadFriendRequests} = useFriendRequests();
    const [isDeleted, setIsDeleted] = useState(false);

    const getFriends = () => {
        GetAllFriends().then(friends => setFriends(friends));
    }

    const acceptFriendAndRefresh = async (friendRequestId) => {
        await acceptFriendRequest(friendRequestId)
        getFriends();
        loadFriendRequests();
    }

    const rejectFriendAndRefresh = async (friendRequestId) => {
        await rejectFriendRequest(friendRequestId)
        getFriends();
        loadFriendRequests();
    }

    useEffect(() => {
        getFriends();
        loadFriendRequests();
    }, [isDeleted])

    return (
        <>
            <Container>
                <Row className="friendList justify-content-center">
                    <h1 className="friendListHeader">Friend List</h1>
                    <Table>
                        <tbody>
                            {!friends.length ? ("You dont have any friends yet, add some today!") : (
                            friends?.map((friend) => (
                                <Friend friend={friend} key={`friend-${friend.id}`} setIsDeleted={setIsDeleted} isDeleted={isDeleted} />
                            ))
                            )}

                        </tbody>
                    </Table>
                </Row>
                </Container>
                <br />
                <Container>
                {!friendRequests.length ? (<br />) : (
                <Row className="friendRequests justify-content-center">
                    <h1 className="friendRequestHeader">Friend Requests</h1>
                    <Table>
                        <tbody>
                            {friendRequests?.map((friendRequest) => (
                                <FriendRequest friendRequest={friendRequest} key={`friendRequest-${friendRequest.id}`} acceptFriendAndRefresh={acceptFriendAndRefresh} rejectFriendAndRefresh={rejectFriendAndRefresh} />
                            ))}

                        </tbody>
                    </Table>
                </Row>
                )}
            </Container>
        </>
    )
};

export default FriendList;