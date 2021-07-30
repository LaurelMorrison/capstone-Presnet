import React from "react";
import { Button } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import { deleteFriend } from "../../modules/friendManager";

const Friend = ({ friend }) => {
  const history = useHistory();

  const handleDelete = () => {
    if (window.confirm('Are you sure?')) {
        deleteFriend(friend.id).then(() => {
            history.push(`/friends`);
        });
    }
}

  return (
    <tr>
          <td><p>{friend.firstName}</p></td>
          <td>
          <Button className="button"><Link className="a" to={`/friend/getbyid/${friend.id}`}>Details</Link></Button>
          <Button className="button" onClick={handleDelete}>Delete</Button>
        </td>
    </tr>
  );
};

export default Friend;