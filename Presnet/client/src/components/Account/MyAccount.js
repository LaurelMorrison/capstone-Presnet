import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetCurrentUserAccount } from "../../modules/accountManager";
import UserEventList from "../Events/UserEventList";
import "./Account.css";
import { Container, Row, Col, Card, Button } from "reactstrap";
import account from "../../Images/account.jpeg";

const MyAccount = () => {

    const [user, setUser] = useState();

    useEffect(() => {
        GetCurrentUserAccount()
            .then(setUser);
    }, []);

    if (!user) {
        return null;
    }

    return (
        <>
            <Container>
                <Row className="justify-content-center">
                    <Card className="userCard">
                        <h1>Hello, {user.firstName}!</h1>
                        <ul>
                            <li className="text-left px-2">Name: {user.fullName}</li>
                            <li className="text-left px-2">Email: {user.email}</li>
                            <li className="text-left px-2">Address: {user.address}</li>
                            <li className="text-left px-2">Age: {user.age}</li>
                            <li className="text-left px-2">Shoe Size: {user.shoeSize}</li>
                            <li className="text-left px-2">Favorite Color: {user.favoriteColor.color}</li>
                            <li className="text-left px-2">Clothing Size: {user.clothingSize.size}</li>
                        </ul>
                        <div className="buttonBox">
                            <Link to={`/userprofile/edit/${user.id}`}><Button className="button">Edit Profile</Button></Link>
                        </div>
                    </Card>
                </Row>
                <Row className="account2 justify-content-center">
                    <Col xs lg="6">
                        <div className="AccountImageBox">
                            <img className="accountImage" src={account} alt="celebration present" />
                        </div>
                    </Col>
                    <Col xs lg="6">
                        <UserEventList />
                    </Col>
                </Row>
                <Row className="account3 justify-content-center">
                    <h1>Your Wish List</h1>
                    <p>Have a gift idea? Let your loved ones know, build a wish list to give them a hint at what to get you!</p>
                    <div className="buttonBox">
                        <Link to={`/wishList`}>
                            <button className="button" >Your Wish List</button>
                        </Link>
                    </div>
                </Row>
            </Container>
        </>
    );
};

export default MyAccount;