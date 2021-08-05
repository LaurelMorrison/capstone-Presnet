import React from "react";

const FriendGift = ({ gift }) => {

  return (
    <>
      <ul>
        <li>
          <p><a href={`${gift.giftURL}`} target="_blank" rel="noreferrer">{gift.gift}</a></p>
        </li>
      </ul>

    </>
  );
};

export default FriendGift;