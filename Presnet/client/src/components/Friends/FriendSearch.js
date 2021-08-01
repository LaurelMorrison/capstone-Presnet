import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Table } from "reactstrap";
import { searchUsers, GetNonFriends } from "../../modules/accountManager";
import User from "./User"
import { addFriend } from "../../modules/friendManager";

const FriendSearch = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState([])

    const getUserList = () => {
        GetNonFriends().then(users => setUsers(users));
    }

    const initFriendRequest = async(user) => {
        await addFriend(user.id)
        getUserList();
      }

    const handleInputChange = (event) => {
        const newSearch = {...search}
        let selectedVal = event.target.value
        newSearch[event.target.id] = selectedVal
        setSearch(newSearch)
    }

    const searchAllUsers = (event) => {
        event.preventDefault()
        console.log(search.searchparam)
        searchUsers(search.searchparam,true)
        .then(response => {
            setUsers(response)
        })
      }

    useEffect(() => {
        getUserList();
    }, [])

    return (
        <>
        <div>
        <h2>Add a new friend</h2>
        <form action="/" method="get">
            <label htmlFor="header-search">
                <span className="visually-hidden">Search for Friends</span>
            </label>
            <input
                type="text"
                id="searchparam"
                placeholder="Search users"
                name="search"
                onChange={handleInputChange}
            />
           <button type="submit" onClick={searchAllUsers}>Search</button>
        </form>
           <div className="row justify-content-center">
                 {users.map((user) => (
                <User user={user} key={user.id} initFriendRequest={initFriendRequest}/>
                   ))}
           </div>
      </div>
   </>
   )
};

export default FriendSearch;