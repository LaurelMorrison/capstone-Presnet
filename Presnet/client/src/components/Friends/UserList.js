import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import { GetNonFriends } from "../../modules/accountManager";
import User from "./User"

const UserList = () => {
    const [users, setUsers] = useState([]);

    const getNonFriends = () => {
        GetNonFriends().then(users => setUsers(users));
    }

    useEffect(() => {
        getNonFriends();
    }, [])

    return (
        <>
        <div className="container">
            <div className="row justify-content-center">
             <Table>
             <thead>
               <tr>
                    <th>Grow Your Network</th>
                </tr>
             </thead>
             <tbody>
                    {users?.map((user) => (
                        <User user={user} key={user.Id} />
                    ))}

                </tbody>
            </Table>
            </div>
        </div>
        </>
    )
};

export default UserList;