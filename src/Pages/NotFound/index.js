import loadable from "@loadable/component";

import { NOT_FOUND_PATH } from "../../url";

const NotFoundView = loadable(() =>
  import(/* webpackChunkName: "404-view" */ "./NotFound")
);

export default {
  path: NOT_FOUND_PATH,
  component: NotFoundView,
  exact: true,
  auth: true,
};
