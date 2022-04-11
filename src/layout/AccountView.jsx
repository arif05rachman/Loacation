import React, { useState } from "react";
import { Avatar, Popover, Button } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import localStorageHooks from "../utils/localStorageHooks";
import LoadingDefault from "../components/LoadingDefault";
import Message from "../utils/message";
import { LOCALSTORAGE_KEY } from "../constants";
import { LOGIN_PATH } from "../url";

const AccountView = () => {
  const { getLocalStorage, removeLocalStorage } = localStorageHooks();
  const [isLoading] = useState(false);
  const { errorMessage } = Message();
  const userName = getLocalStorage(LOCALSTORAGE_KEY.USER_NAME) | "Arif";

  const setLogout = () => {
    return Object.values(LOCALSTORAGE_KEY).map((value) => {
      return removeLocalStorage(value);
    });
  };

  const onLogout = async () => {
    const response = await setLogout();
    if (response) {
      window.location.href = LOGIN_PATH;
    } else {
      errorMessage("Terjadi kesalahan, silahkan coba beberapa saat lagi!");
    }
  };

  const contentPopover = (
    <Button type="primary" icon={<LogoutOutlined />} onClick={onLogout}>
      Logout
    </Button>
  );

  return (
    <div className="account-header">
      <LoadingDefault isLoading={isLoading} />
      <Popover placement="bottomRight" content={contentPopover} trigger="click">
        <a type="text" className="greeting account-name" href="#_">
          <Avatar size="default" icon={<UserOutlined />} />
          {userName || "Arif"}
        </a>
      </Popover>
    </div>
  );
};

export default AccountView;
