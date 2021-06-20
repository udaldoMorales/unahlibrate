import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Login, Registro } from "./../pages";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/registro" component={Registro} />
      </Switch>
    </Router>
  );
};

export default Routes;
