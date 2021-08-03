import React, { useEffect, useState } from "react";
import { GetUserWishlist, deleteGift } from "../../modules/giftManager";
import { Link } from "react-router-dom";
import Gift from "./Gift"
import "./Gift.css";
import { Container, Row } from "reactstrap";

const UserGiftList = () => {
    const [gifts, setGifts] = useState([]);

    const getYourGifts = () => {
        GetUserWishlist().then(gifts => setGifts(gifts));
    }

    const handleDelete = (id) => {
        deleteGift(id)
            .then(() => getYourGifts())
    }

    useEffect(() => {
        getYourGifts();
    }, [])

    return (
        <>
            <Container className="userWishList">
                <Row className="justify-content-center" >
                    <h1>Your Wish List</h1>
                    <Link to={`/wishList/add`}>
                        <button className="button" >Add New Gift</button>
                    </Link>
                    <div className="container">
                        <div className="row m-5 ">
                            {!gifts.length ? (<div className="noGiftsMessage">You currently dont have any gifts on your wishlist, add some today!</div>) : (
                                gifts?.map((gift) => (
                                    <Gift gift={gift} key={gift.id} handleDelete={handleDelete} />
                                ))
                            )}
                        </div>
                    </div>
                </Row>
            </Container>
        </>
    )
};

export default UserGiftList;