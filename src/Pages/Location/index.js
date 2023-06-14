import loadable from "@loadable/component";

import { LOCATIONS_PATH } from "../../url";

const LocationsView = loadable(() =>
  import(/* webpackChunkName: "login-view" */ "./LocationsView")
);

export default {
  path: LOCATIONS_PATH,
  component: LocationsView,
  exact: true,
  auth: true,
};
