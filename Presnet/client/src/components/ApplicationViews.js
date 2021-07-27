import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Homepage from "./Homepage/Homepage";
import MyAccount from "./Account/MyAccount";
import FriendList from "./Friends/FriendList";
import FriendDetails from "./Friends/FriendDetail";

export default function ApplicationViews({ isLoggedIn }) {
  return (
    <main>
      <Switch>
        <Route path="/" exact>
          {isLoggedIn ? <Homepage /> : <Redirect to="/login" />}
        </Route>

        <Route path="/userProfile">
          {isLoggedIn ? <MyAccount /> : <Redirect to="/login" />}
        </Route>

        <Route exact path="/friend">
          {isLoggedIn ? <FriendList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/friend/getbyid/:friendId(\d+)" exact>
          {isLoggedIn ? <FriendDetails /> : <Redirect to="/login" />}
        </Route>
        {/* <Route path="/friend/add">
          {isLoggedIn ? <FriendForm /> : <Redirect to="/login" />}
        </Route>

        <Route path="/friend/:id(\d+)" exact>
          {isLoggedIn ? <FriendDetails /> : <Redirect to="/login" />}
        </Route> */}

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
