import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { GetGiftById, updateGift } from "../../modules/giftManager";

const GiftEditForm = () => {
    const [updatedGift, setupdatedGift] = useState([]);
    const { id } = useParams();
    const history = useHistory();

    const handleInputChange = (evt) => {
        const value = evt.target.value;
        const key = evt.target.id;

        const wishListItem = { ...updatedGift };

        wishListItem[key] = value;
        setupdatedGift(wishListItem);
    };



    const handleUpdate = (evt) => {
        evt.preventDefault();
        const updatedUserGift = {
            id: updatedGift.id,
            userId: updatedGift.userId,
            gift: updatedGift.gift,
            giftURL: updatedGift.giftURL
        };
        updateGift(updatedUserGift).then((g) => {
            history.push("/userProfile/account");
        });

    };
    useEffect(() => {
        GetGiftById(id)
            .then(g => {
                setupdatedGift(g);
            });
    }, [id])

    return (
        <Form className="giftForm">
            <h2>Edit Gift</h2>
            <FormGroup className="formBox">
                <Label for="gift">Gift</Label>
                <Input type="text" name="gift" id="gift" placeholder="gift"
                    value={updatedGift.gift}
                    onChange={handleInputChange} />
            </FormGroup>
            <FormGroup className="formBox">
                <Label for="giftURL">Gift URL</Label>
                <Input type="text" name="giftURL" id="giftURL" placeholder="URL for gift"
                    value={updatedGift.giftURL}
                    onChange={handleInputChange} />
            </FormGroup>
            <div className="buttonBox">
                <Button className="button" onClick={handleUpdate}>Submit</Button>
                <Button className="button" onClick={() => history.push(`/wishList`)}>Cancel</Button>
            </div>
        </Form>
    );

};

export default GiftEditForm;