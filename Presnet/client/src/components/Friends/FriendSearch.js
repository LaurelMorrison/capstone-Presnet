import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import { searchUsers, GetNonFriends } from "../../modules/accountManager";
import User from "./User"
import { addFriend } from "../../modules/friendManager";

const FriendSearch = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState([])

    const getUserList = () => {
        GetNonFriends().then(users => setUsers(users));
    }

    const initFriendRequest = async (user) => {
        await addFriend(user.id)
        getUserList();
    }

    const handleInputChange = (event) => {
        const newSearch = { ...search }
        let selectedVal = event.target.value
        newSearch[event.target.id] = selectedVal
        setSearch(newSearch)
    }

    const searchAllUsers = (event) => {
        event.preventDefault()
        console.log(search.searchparam)
        searchUsers(search.searchparam, true)
            .then(response => {
                setUsers(response)
            })
    }

    useEffect(() => {
        getUserList();
    }, [])

    return (
        <>
            <div className="friendSearch">
                <h1>Add New Friends</h1>
                <form action="/" method="get">
                    <input
                        type="text"
                        id="searchparam"
                        placeholder="Search users"
                        name="search"
                        onChange={handleInputChange}
                    />
                    <button className="button" type="submit" onClick={searchAllUsers}>Search</button>
                </form>
                <Table>
                    <tbody>
                        {users.map((user) => (
                            <User user={user} key={user.id} initFriendRequest={initFriendRequest} />
                        ))}
                    </tbody>
                </Table>
            </div>
        </>
    )
};

export default FriendSearch;