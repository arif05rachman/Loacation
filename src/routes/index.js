import React, { Fragment, useEffect } from "react";
import { Switch, Redirect, useLocation } from "react-router-dom";
import { utilities } from "../styles/_utilities";
import { LOGIN_PATH, NOT_FOUND_PATH } from "../url";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import { useAppContext } from "../context/AppContext";
import { Spin } from "antd";
import MenuList from "../menu-list";
const Router = ({ listRoutes, preRoutes, postRoutes }) => {
  const { globalState, setState } = useAppContext();
  const location = useLocation();

  useEffect(() => {
    if (!globalState?.listOfAllowedMenu) {
      setState({ listOfAllowedMenu: MenuList });
    }
  }, []);

  if (!globalState?.listOfAllowedMenu && location.pathname !== LOGIN_PATH)
    return <Spin size="large" />;

  return (
    <div className={utilities}>
      <Switch>
        {listRoutes?.map((route, i) => {
          if (route.auth) {
            return <PrivateRoute {...route} key={i} />;
          }
          return <PublicRoute {...route} key={i} />;
        })}
        <Redirect to={NOT_FOUND_PATH} />
      </Switch>
    </div>
  );
};

export default Router;
