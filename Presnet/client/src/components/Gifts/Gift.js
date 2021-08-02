import React from "react";
import { Card, CardBody, Button, CardFooter } from "reactstrap";
import { Link } from "react-router-dom";

const Gift = ({ gift, handleDelete  }) => {

  return (
      <>
        <Card className="giftCard col-s-1 m-4 p-1">
            <CardBody className="card-content">
                <p><Link to={`${gift.giftURL}`}>{gift.gift}</Link></p>
            </CardBody>
            <CardFooter className="cardFooter text-center">
                    <Link to={`/wishlist/edit/${gift.id}`}>
                        <Button className="button space">Edit</Button>
                    </Link>
                    <Link>
                        <Button className="button" onClick={() => handleDelete(gift.id)}>Delete</Button>
                    </Link>
            </CardFooter>
        </Card>

      </>
  );
};

export default Gift;