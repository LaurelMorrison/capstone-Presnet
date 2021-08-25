import React, { useEffect, useState } from "react";
import { Table, Container, Row } from "reactstrap";
import { GetNonFriends } from "../../modules/accountManager";
import User from "./User"
import { addFriend } from "../../modules/friendManager";

const FriendSearch = () => {
    const [users, setUsers] = useState([]);
    const [displayList, setDisplayList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const getUserList = () => {
        GetNonFriends().then(users => {
            setUsers(users)
            filterFriendList(searchTerm, users)
        });
    }

    const initFriendRequest = async (user) => {
        await addFriend(user.id)
        getUserList();
    }

    const searchAllUsers = (event) => {
        let selectedVal = event.target.value
        setSearchTerm(selectedVal)
        filterFriendList(selectedVal, users)
        }

    const filterFriendList = (searchTerm, users) =>{
        const searchedFriends = searchTerm ? ([...users].filter(x => x.fullName.toLowerCase().includes(searchTerm.toLowerCase()))) : [...users]
        setDisplayList(searchedFriends.slice(0,5))
    }

    useEffect(() => {
        getUserList();
    }, [])

    return (
        <>
            <Container>
                <Row className="friendList justify-content-center">
                    <div className="friendSearch">
                        <h1>Add New Friends</h1>
                        <form action="/" method="get">
                            <input
                                type="text"
                                id="searchparam"
                                placeholder="Search users"
                                name="search"
                                value={searchTerm}
                                onChange={searchAllUsers}
                            />
                        </form>
                        <Table>
                            <tbody>
                                {!displayList.length ? ("No matches, try another name.") : (
                                    displayList.map((user) => (
                                        <User user={user} key={user.id} initFriendRequest={initFriendRequest} />
                                    ))
                                )}
                            </tbody>
                        </Table>

                    </div>
                </Row>
            </Container>
        </>
    )
};

export default FriendSearch;