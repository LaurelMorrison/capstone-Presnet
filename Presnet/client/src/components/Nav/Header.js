import React, { useState } from 'react';
import { NavLink as RRNavLink } from "react-router-dom";
import {
    Collapse, Navbar, NavbarBrand, Nav, NavItem, NavLink, NavbarToggler, Badge
} from 'reactstrap';
import { logout } from "../../modules/authManager";
import Logo from "../../Images/Logo.png";
import { GetFriendRequest} from "../../modules/friendManager"

export default function Header({ isLoggedIn }) {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const countFriendRequests = GetFriendRequest().length;

    return (
        <div>
            <Navbar light expand="md" className="navBar">
                <NavbarBrand tag={RRNavLink} to="/"><img className="logo" src={Logo} alt="Presnet Logo" /></NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={!isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        {isLoggedIn &&
                            <>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/userProfile/account"> My Account</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/Friends" > Friends <Badge className="notificationBadge">{countFriendRequests}</Badge></NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/Events"> Events</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/WishList"> Wish List</NavLink>
                                </NavItem>
                                <NavItem>
                                    <a aria-current="page" className="nav-link"
                                        style={{ cursor: "pointer" }} onClick={logout}>Logout</a>
                                </NavItem>
                            </>
                        }
                        {!isLoggedIn &&
                            <>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/login">Login</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/register">Register</NavLink>
                                </NavItem>
                            </>
                        }
                    </Nav>

                </Collapse>
            </Navbar>
        </div>
    );
}