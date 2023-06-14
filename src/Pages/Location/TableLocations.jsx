import { Table } from "antd";
import React from "react";

const TableLocations = ({
  columns,
  locations,
  isLoadingTable,
  pagination,
  handleChange,
}) => {
  return (
    <div className="container-content">
      <Table
        dataSource={locations}
        columns={columns}
        loading={isLoadingTable}
        pagination={pagination}
        onChange={handleChange}
        scroll={{ x: "auto" }}
      />
    </div>
  );
};

export default TableLocations;
