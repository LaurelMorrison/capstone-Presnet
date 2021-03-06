import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { updateUser, GetCurrentUserAccount } from "../../modules/accountManager";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { GetAllColors } from "../../modules/favoriteColorManager";
import { GetAllSizes } from "../../modules/clothingSizeManager";

const AccountProfileForm = () => {
    const [editUser, setEditUser] = useState([]);
    const [favoriteColor, setFavoriteColors] = useState([]);
    const [clothingSize, setClothingSize] = useState([]);
    const history = useHistory();

    const handleInputChange = (evt) => {
        const value = evt.target.value;
        const key = evt.target.id;

        const userInfo = { ...editUser };

        userInfo[key] = value;
        setEditUser(userInfo);
    };

    const getFavoriteColors = () => {
        return GetAllColors()
            .then(colorsFromAPI => {
                setFavoriteColors(colorsFromAPI)
            })
    }

    const getClothingSizes = () => {
        return GetAllSizes()
            .then(sizesFromAPI => {
                setClothingSize(sizesFromAPI)
            })
    }



    const handleUpdate = (evt) => {
        evt.preventDefault();
        const updatedUser = {
            id: editUser.id,
            firebaseUserId: editUser.firebaseUserId,
            createdTime: editUser.createdTime,
            firstName: editUser.firstName,
            lastName: editUser.lastName,
            address: editUser.address,
            email: editUser.email,
            mobilePhone: editUser.mobilePhone,
            age: editUser.age,
            shoeSize: editUser.shoeSize,
            clothingSizeId: editUser.clothingSizeId,
            favoriteColorId: editUser.favoriteColorId

        };
        updateUser(updatedUser).then((u) => {
            history.push("/userProfile/account");
        });

    };
    useEffect(() => {
        getFavoriteColors();
        getClothingSizes();
        GetCurrentUserAccount()
            .then(u => {
                setEditUser(u);
            });
    }, [])

    return (
        <Form className="accountEdit">
            <h2>Edit Profile</h2>
            <FormGroup className="formBox">
                <Label for="firstName">First Name:</Label>
                <Input type="text" name="firstName" id="firstName" placeholder="firstName"
                    value={editUser.firstName}
                    onChange={handleInputChange} />
            </FormGroup>
            <FormGroup className="formBox">
                <Label for="lastName">Last Name:</Label>
                <Input type="text" name="lastName" id="lastName" placeholder="lastName"
                    value={editUser.lastName}
                    onChange={handleInputChange} />
            </FormGroup>
            <FormGroup className="formBox">
                <Label for="address">Address:</Label>
                <Input type="text" name="address" id="address" placeholder="address"
                    value={editUser.address}
                    onChange={handleInputChange} />
            </FormGroup>
            <FormGroup className="formBox">
                <Label for="email">Email:</Label>
                <Input type="text" name="email" id="email" placeholder="email"
                    value={editUser.email}
                    onChange={handleInputChange} />
            </FormGroup>
            <FormGroup className="formBox">
                <Label for="mobilePhone">Mobile Phone:</Label>
                <Input type="tel" name="mobilePhone" id="mobilePhone" placeholder="mobilePhone"
                    value={editUser.mobilePhone}
                    onChange={handleInputChange} />
            </FormGroup>
            <FormGroup className="formBox">
                <Label for="age">Age:</Label>
                <Input type="text" name="age" id="age" placeholder="age"
                    value={editUser.age}
                    onChange={handleInputChange} />
            </FormGroup>
            <FormGroup className="formBox">
                <Label for="shoeSize">Shoe Size:</Label>
                <Input type="text" name="shoeSize" id="shoeSize" placeholder="shoeSize"
                    value={editUser.shoeSize}
                    onChange={handleInputChange} />
            </FormGroup>
            <FormGroup className="formBox">
                <Label for="clothingSizeId">Size</Label>
                <select value={editUser.clothingSizeId} name="clothingSizeId" id="clothingSizeId" onChange={handleInputChange} className='form-control'>
                    <option value="0">Select a Size</option>
                    {clothingSize.map(s => (
                        <option key={s.id} value={s.id}>{s.size}</option>
                    ))}
                </select>
            </FormGroup>
            <FormGroup className="formBox">
                <Label for="favoriteColorId">Favorite Color</Label>
                <select value={editUser.favoriteColorId} name="favoriteColorId" id="favoriteColorId" onChange={handleInputChange} className='form-control'>
                    <option value="0">Select a Color</option>
                    {favoriteColor.map(c => (
                        <option key={c.id} value={c.id}>{c.color}</option>
                    ))}
                </select>
            </FormGroup>
            <div className="buttonBox">
                <Button className="button space" onClick={handleUpdate}>Submit</Button>
                <Button className="button" onClick={() => history.push(`/userProfile/account`)}>Cancel</Button>
            </div>
        </Form>
    );

};

export default AccountProfileForm;