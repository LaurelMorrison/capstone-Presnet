import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { addGift } from '../../modules/giftManager';

const GiftForm = () => {
    const emptyGift = {
        gift: '',
        giftURL: ''
    };

    const [newGift, setNewGift] = useState(emptyGift);
    const history = useHistory();

    const handleInputChange = (evt) => {
        const value = evt.target.value;
        const key = evt.target.id;

        const giftCopy = { ...newGift };

        giftCopy[key] = value;
        setNewGift(giftCopy);
    };


    const handleSave = (evt) => {
        evt.preventDefault();

        addGift(newGift).then((e) => {
            history.push("/userProfile/account");
        });

    };


    return (
        <Form>
            <h2>Add a gift to your wish list:</h2>
            <FormGroup>
                <Label for="gift">Gift: </Label>
                <Input type="text" name="gift" id="gift" placeholder="Gift"
                    value={newGift.gift}
                    onChange={handleInputChange} />
            </FormGroup>
            <FormGroup>
                <Label for="giftURL">Reference URL: </Label>
                <Input type="text" name="giftURL" id="giftURL" placeholder="URL for gift"
                    value={newGift.giftURL}
                    onChange={handleInputChange} />
            </FormGroup>

            <Button className="btn btn-primary" onClick={handleSave}>Add Gift</Button>
            <Button className="btn btn-primary" onClick={() => history.push(`/userProfile/account`)}>Cancel</Button>

        </Form>
    );
};

export default GiftForm;