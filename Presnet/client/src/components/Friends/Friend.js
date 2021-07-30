import React from "react";
import { Button } from "reactstrap";
import { Link} from "react-router-dom";

const Friend = ({ friend }) => {

  return (
    <tr>
          <td><p>{friend.firstName}</p></td>
          <td>
          <Button className="button"><Link className="a" to={`/friend/getbyid/${friend.id}`}>Details</Link></Button>
        </td>
    </tr>
  );
};

export default Friend;