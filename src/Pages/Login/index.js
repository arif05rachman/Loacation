import loadable from "@loadable/component";

import { LOGIN_PATH } from "../../url";

const LoginView = loadable(() =>
  import(/* webpackChunkName: "login-view" */ "./Login")
);

export default {
  path: LOGIN_PATH,
  component: LoginView,
  exact: true,
  //   auth: true,
};
