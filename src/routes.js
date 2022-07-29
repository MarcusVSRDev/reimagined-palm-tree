import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Profiles from "./Pages/Profiles";

export default function Routes() {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>

        <Route exact path="/registro">
          <Register />
        </Route>

        <Route exact path="/perfis">
          <Profiles />
        </Route>


      </Switch>
    </div >
  );
}
