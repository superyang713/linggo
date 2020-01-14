import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Entries from "./containers/Entries";

export default function Routes() {
    return (
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route
            path="/user/:user_name"
            component={Entries}
          />
          <Entries />
        </Switch>
    );
}
