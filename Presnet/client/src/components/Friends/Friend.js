import React from "react";
import { Button } from "reactstrap";
import { Link, useParams, useHistory } from "react-router-dom";
import { deleteFriend, getAllFriends } from "../../modules/friendManager";

const Friend = ({ friend }) => {

  const date = new Date(friend.createDateTime);
  const createDateTime = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
  const history = useHistory();

//   const deleteAFriend = (event) => {
//     event.preventDefault()
//     const confirmDelete = window.confirm("Please confirm if you want to delete this friend?")
//     if (confirmDelete){
//         deleteFriend(friend.id).then(() => {getAllFriends()})
//     };
//   }


  return (
    <tr>
          <td><strong>{friend.friendProfile.firstName}</strong></td>
          <td>
          <Button className="b friendDetails"><Link className="a" to={`/friend/getbyid/${friend.friendId}`}>Details</Link></Button>
        </td>
        {/* <td>
          <Button color="danger" onClick={deleteAFriend}>Delete</Button>
        </td>       */}
    </tr>
  );
};

export default Friend;