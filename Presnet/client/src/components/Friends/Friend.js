import React from "react";
import { Button } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import { deleteFriend } from "../../modules/friendManager";
import { GetUserWishlist } from "../../modules/giftManager";

const Friend = ({ friend, setIsDeleted, isDeleted }) => {
  const history = useHistory();

  const handleDelete = (id) => {
    console.log(friend)
    if (window.confirm('Are you sure you want to unfriend?')) {
        deleteFriend(id).then(() => {
            setIsDeleted(!isDeleted)
            history.push(`/friends`);
        });
    }
}

  return (
    <tr>
          <td><p>{friend.fullName}</p></td>
          <td>
          <Button className="button" to={`/friend/getbyid/${friend.id}`}>Details</Button>
          <Button className="button" onClick={() =>handleDelete(friend.id)}>Unfriend</Button>
        </td>
    </tr>
  );
};

export default Friend;