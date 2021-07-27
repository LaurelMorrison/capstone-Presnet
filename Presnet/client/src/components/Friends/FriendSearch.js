import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Table } from "reactstrap";
import { searchUsers } from "../../modules/accountManager";

const FriendList = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState([])



    const getNonFriends = () => {
        getAllFriends().then(users => setUsers(users));
    }

    const searchUsers = (event) => {
        event.preventDefault()
        console.log(search.searchparam)
        searchUsers(search.searchparam,true)
        .then(response => {
            setUsers(response)
        })
      }

    useEffect(() => {
        getNonFriends();
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
                name="s"
                onChange={handleInputChange}
            />
           <button type="submit" onClick={searchUsers}>Search</button>
        </form>
           <div className="row justify-content-center">
                 {users.map((user) => (
                <User user={user} key={user.id} />
                   ))}
           </div>
      </div>
   </>
   )
};

export default FriendList;