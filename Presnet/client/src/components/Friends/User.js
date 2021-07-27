import React from "react";
import { Button } from "reactstrap";
import { Link, useParams, useHistory } from "react-router-dom";
import { deleteFriend, getAllFriends } from "../../modules/friendManager";
import { Card, CardBody } from "reactstrap";


const User = ({ user }) => {

  return (
    <Card>
          <CardBody>
            <p>{user.firstName}</p>
          <Button className="b addFriend"><Link className="a" to={`/friend`}>Add friend</Link></Button>
        </CardBody>
    </Card>
  );
};

export default User;