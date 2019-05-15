import React from "react";
import { Switch, Route } from "react-router-dom";
import Master from "./Components/Master/Master";
import Details from "./Components/Details/Details";

export default (
  <Switch>
    <Route exact path="/" component={Master} />
    <Route path="/details/:id" component={Details} />
  </Switch>
);
