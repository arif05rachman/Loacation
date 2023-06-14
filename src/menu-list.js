import { HOME_PATH, LOCATIONS_PATH } from "./url";

import { AppstoreOutlined, PushpinOutlined } from "@ant-design/icons";

export const MenuList = [
  {
    title: "Home",
    path: HOME_PATH,
    icon: AppstoreOutlined,
    childs: [],
  },
  {
    title: "Locations",
    path: LOCATIONS_PATH,
    icon: PushpinOutlined,
    childs: [],
  },
];

export default MenuList;
