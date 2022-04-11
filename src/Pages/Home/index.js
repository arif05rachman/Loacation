import loadable from "@loadable/component";

import { HOME_PATH } from "../../url";

const HomeView = loadable(() =>
  import(/* webpackChunkName: "home-view" */ "./Home")
);

export default {
  path: HOME_PATH,
  component: HomeView,
  exact: true,
  auth: true,
};
