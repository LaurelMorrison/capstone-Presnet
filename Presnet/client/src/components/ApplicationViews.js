import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Homepage from "./Homepage/Homepage";
import MyAccount from "./Account/MyAccount";
import FriendPage from "./Friends/FriendPage";
import FriendDetails from "./Friends/FriendDetail";
import AccountProfileForm from "./Account/AccountProfileForm";

export default function ApplicationViews({ isLoggedIn }) {
  return (
    <main>
      <Switch>
        <Route path="/" exact>
          {isLoggedIn ? <Homepage /> : <Redirect to="/login" />}
        </Route>

        <Route exact path="/userProfile/account">
          {isLoggedIn ? <MyAccount /> : <Redirect to="/login" />}
        </Route>

        <Route path="/userprofile/edit/:id(\d+)">
          {isLoggedIn ? <AccountProfileForm /> : <Redirect to="/login" />}
        </Route>

        <Route exact path="/Friends">
          {isLoggedIn ? <FriendPage /> : <Redirect to="/login" />}
        </Route>

        <Route path="/friend/getbyid/:friendId(\d+)" exact>
          {isLoggedIn ? <FriendDetails /> : <Redirect to="/login" />}
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/register">
          <Register />
        </Route>
      </Switch>
    </main>
  );
};
