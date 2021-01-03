import React from "react";
import { Redirect, Route } from "react-router";

const AuthRoute = props => {
  const { type } = props;
  if (type === "guest") return <Redirect to="/home" />;
  else if (type === "private") return <Redirect to="/" />;

  return <Route {...props} />;
};

export default AuthRoute