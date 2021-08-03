import React from "react";
import { Card, CardBody, } from "reactstrap";
import { Link } from "react-router-dom";
import { ExternalLink } from 'react-external-link';

const FriendGift = ({ gift }) => {

  return (
    <>
      <ul>
        <li>
          <ExternalLink href={`${gift.giftURL}`}><p>{gift.gift}</p></ExternalLink>
        </li>
      </ul>

    </>
  );
};

export default FriendGift;