import React from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { deleteFriend } from "../../modules/friendManager";

const Friend = ({ friend, setIsDeleted, isDeleted }) => {
  const history = useHistory();

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to unfriend?')) {
      deleteFriend(id).then(() => {
        setIsDeleted(!isDeleted)
        history.push(`/friends`);
      });
    }
  }

  return (
    <tr>
      <td><p className="friendCard">{friend.fullName}</p></td>
      <td>
        <Link to={`/friend/getbyid/${friend.id}`}><Button className="button space">Details</Button></Link>
        <Button className="button" onClick={() => handleDelete(friend.id)}>Unfriend</Button>
      </td>
    </tr>
  );
};

export default Friend;