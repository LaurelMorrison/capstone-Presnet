import React from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import { Card, CardBody } from "reactstrap";


const User = ({ user }) => {

  return (
    <Card>
          <CardBody>
            <p>{user.firstName}</p>
          <Button className="button"><Link className="a" to={`/friend`}>Add friend</Link></Button>
        </CardBody>
    </Card>
  );
};

export default User;