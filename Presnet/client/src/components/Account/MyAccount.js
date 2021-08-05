import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetCurrentUserAccount } from "../../modules/accountManager";
import UserEventList from "../Events/UserEventList";
import "./Account.css";
import { Container, Row, Col, Card, Button } from "reactstrap";
import account from "../../Images/account.jpeg";
import AccountPageBackground from "../../Images/AccountPageBackground.png";

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
                <Row className="accountHeader justify-content-center">
                    <h1 className="headline">Hello {user.firstName}!</h1>
                </Row>
                <Row className="account1 justify-content-center">
                    <Card className="userCard">
                        <h1 className="userProfileHeader">User Profile</h1>
                        <ul>
                            <li className="text-left px-2">Name: {user.fullName}</li>
                            <li className="text-left px-2">Email: {user.email}</li>
                            <li className="text-left px-2">Address: {user.address}</li>
                            <li className="text-left px-2">Mobile Phone: {user.mobilePhone}</li>
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
                    <h1>Your Wish List</h1>
                    <p>Have a gift idea? Let your loved ones know, build a wish list to give them a hint at what to get you!</p>
                    <div className="buttonBox">
                        <Link to={`/wishList`}>
                            <button className="button" >Your Wish List</button>
                        </Link>
                    </div>
                </Row>
                <Row className="account3">
                    <Col xs lg="6" className="accountImageBox">
                        <img className="accountImage1" src={account} alt="celebration present" />
                        <img className="accountImage2" src={AccountPageBackground} alt="celebration present" />
                    </Col>
                    <Col xs lg="6">
                        <UserEventList />
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default MyAccount;