import React from "react";
import { Card, CardBody, } from "reactstrap";
import { Link } from "react-router-dom";

const FriendGift = ({ gift }) => {

  return (
      <>
        <Card className="col-s-1 m-4 p-1">
            <CardBody className="card-content">
                <p><Link to={`${gift.giftURL}`}>{gift.gift}</Link></p>
            </CardBody>
        </Card>

      </>
  );
};

export default FriendGift;