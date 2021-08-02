import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table } from "reactstrap";
import { Container, Row, Card, Button } from "reactstrap";
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
         <Container className="friendSearch">
        <Row className="justify-content-center" xs lg = "12">
        <h1>Add New Friends</h1>
        </Row>
        <Row className="justify-content-center">
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
                <User user={user} key={user.id} initFriendRequest={initFriendRequest}/>
                   ))}
                </tbody>
            </Table>
           </Row>
        </Container>
   </>
   )
};

export default FriendSearch;