import React, { useEffect } from "react";
import useLocations from "./useLocations";
import TableLocations from "./TableLocations";
import ModalLocations from "./ModalLocations";
// import Filter from "./Filter";

const LocationsView = () => {
  const {
    columns,
    // formFilter,
    formModal,
    isLoadingModal,
    isLoadingTable,
    // layoutFilter,
    locations,
    pagination,
    handleTableChange,
    // isEditedModal,
    isVisibleModal,
    setIsVisibleModal,
    handleSave,
    handleCancel,
    locationById,
    fetchLocations,
    isEditModal,
    fileList,
    setFileList,
  } = useLocations();

  useEffect(() => {
    fetchLocations();
  }, []);

  return (
    <div>
      {/* <Filter layout={layoutFilter} form={formFilter} /> */}
      <ModalLocations
        form={formModal}
        isEdited={isEditModal}
        isLoading={isLoadingModal}
        visible={isVisibleModal}
        setVisible={setIsVisibleModal}
        handleSave={handleSave}
        handleCancel={handleCancel}
        locationById={locationById}
        fileList={fileList}
        setFileList={setFileList}
      />
      <TableLocations
        columns={columns}
        locations={locations}
        isLoading={isLoadingTable}
        pagination={pagination}
        handleChange={handleTableChange}
      />
    </div>
  );
};

export default LocationsView;
