import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const Loading = <LoadingOutlined style={{ fontSize: 80 }} spin />;

const LoadingDefault = ({ isLoading }) => {
  return (
    <>
      {isLoading && (
        <div className="loading-container">
          <div className="loading-loader">
            <Spin indicator={Loading} />
          </div>
        </div>
      )}
    </>
  );
};

export default LoadingDefault;
