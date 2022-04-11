import React from "react";
import { Route } from "react-router-dom";
import LayoutView from "../layout/LayoutView";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => (
        <LayoutView>
          <Component {...props} />
        </LayoutView>
      )}
    />
  );
};

export default PrivateRoute;
