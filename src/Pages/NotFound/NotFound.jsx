import React from "react";
import { Result, Button } from "antd";
import { Link } from "react-router-dom";
import { HOME_PATH } from "../../url";

const NotFound = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<Link to={HOME_PATH}>Back Home</Link>}
    />
  );
};

export default NotFound;
