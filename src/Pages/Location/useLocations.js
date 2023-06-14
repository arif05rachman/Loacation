import React, { useState } from "react";
import { Button, Form, Image, Rate, Tooltip } from "antd";
import { getKeyData } from "../../utils/getKeyData";
import { EditOutlined } from "@ant-design/icons";
import Message from "../../utils/message";
import { fetcher } from "../../hooks/useAxios";
import { LOCATIONS_URL } from "api-url";

const useLocations = () => {
  const [formFilter] = Form.useForm();
  const [formModal] = Form.useForm();

  const [locations, setLocations] = useState([]);
  const [locationById, setLocationById] = useState([]);
  const [isLoadingTable, setIsLoadingTable] = useState(false);
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);
  const [fileList, setFileList] = useState();

  const { errorMessage, successMessage } = Message();

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const [params, setParams] = useState({
    limit: 10,
    offset: 0,
  });
  const [layoutFilter] = useState({
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
  });

  const [columns] = useState([
    {
      title: "No",
      align: "center",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Name",
      dataIndex: "Place_Name",
      key: "Place_Name",
    },
    {
      title: "Category",
      dataIndex: "Category",
      key: "Category",
    },
    {
      title: "City",
      dataIndex: "City",
      key: "City",
    },
    {
      title: "Price",
      dataIndex: "Price",
      key: "Price",
    },
    {
      title: "Rating",
      dataIndex: "Rating",
      key: "Rating",
      render: (rating) => (
        <Tooltip title={rating} color="grey" placement="top">
          <div>
            <Rate disabled allowHalf defaultValue={rating} />
          </div>
        </Tooltip>
      ),
    },
    {
      title: "Image",
      dataIndex: "Image",
      key: "Image",
      render: (image) => <Image src={image} height="3rem" width="3rem" />,
    },
    {
      title: "Action",
      align: "center",
      dataIndex: "_id",
      key: "_id",
      render: (id) => (
        <Tooltip title="Edit" color="grey" placement="right">
          <Button
            type="primary"
            shape="circle"
            icon={<EditOutlined />}
            onClick={() => handleEdit(id)}
          />
        </Tooltip>
      ),
    },
  ]);

  const fetchLocations = async (fetchParams) => {
    setIsLoadingTable(true);

    const newParams = fetchParams ? { ...params, ...fetchParams } : params;
    setParams(newParams);

    const request = {
      method: "GET",
      params: newParams,
    };

    try {
      const res = await fetcher(LOCATIONS_URL, request);
      if (res) {
        const { data } = res;
        const { page, per_page, total_data } = data.pagination;
        const modifyData = getKeyData(data?.locations, page, per_page);
        setLocations(modifyData);
        setParams({ ...newParams });

        if (total_data && page) {
          setPagination({
            current: page,
            pageSize: per_page,
            total: total_data,
          });
        } else {
          setPagination({ current: 1, pageSize: per_page, total: 10 });
        }
      }
    } catch (error) {
      errorMessage(error);
    } finally {
      setIsLoadingTable(false);
    }
  };

  const fetchLocationById = async (id) => {
    setIsLoadingModal(true);
    try {
      const res = await fetcher(`${LOCATIONS_URL}/${id}`);
      if (!res) throw new Error("Gagal memuat data Location");
      const {
        _id,
        Place_Name,
        City,
        Category,
        Description,
        Image,
        Lat,
        Long,
        Price,
        Rating,
      } = res.data.location;
      setLocationById({
        _id,
        Place_Name,
        City,
        Category,
        Description,
        Image,
        Lat,
        Long,
        Price,
        Rating,
      });
      formModal.setFieldsValue({
        Place_Name,
        City,
        Category,
        Description,
        Image,
        Lat,
        Long,
        Price,
        Rating,
      });
    } catch (error) {
      errorMessage(error);
    } finally {
      setIsLoadingModal(false);
    }
  };

  const handleTableChange = (page, _, record) => {
    const { current, pageSize } = page;
    // const { order, columnKey } = record;
    const newParams = {
      ...params,
      offset: (current - 1) * pageSize,
      limit: pageSize,
      // sort: order && columnKey,
      // order: orderTable(order),
    };

    setPagination(page);
    fetchLocations(newParams);
  };

  const handleSave = async (valuesForm) => {
    setIsLoadingModal(true);
    const {
      Place_Name,
      Description,
      Category,
      City,
      Price,
      Rating,
      Lat,
      Long,
      Image,
    } = valuesForm;

    const formData = new FormData();
    formData.append("Place_Name", Place_Name);
    formData.append("Description", Description);
    formData.append("Category", Category);
    formData.append("City", City);
    formData.append("Price", Price);
    formData.append("Rating", Rating);
    formData.append("Lat", Lat);
    formData.append("Long", Long);
    formData.append("Image", Image?.file);
    let request = {
      headers: { "Content-Type": "multipart/form-data" },
      method: "POST",
      data: formData,
    };
    if (locationById?._id) {
      request.method = "PUT";
    }
    try {
      const res = await fetcher(
        locationById?._id
          ? `${LOCATIONS_URL}/${locationById?._id}`
          : LOCATIONS_URL,
        request
      );
      if (!res) throw new Error("Data lokasi gagal di simpan!");
      successMessage("Data lokasi berhasil di simpan!");
      resetForm();
      fetchLocations();
    } catch (error) {
      errorMessage(error);
    } finally {
      setIsLoadingModal(false);
    }
  };

  const handleEdit = (id) => {
    setIsEditModal(true);
    setIsVisibleModal(true);
    fetchLocationById(id);
  };

  const handleCancel = () => {
    resetForm();
  };

  const resetForm = () => {
    setIsVisibleModal(false);
    formModal.resetFields();
    setIsEditModal(false);
    setLocationById({});
    setFileList(null);
  };

  return {
    formFilter,
    formModal,
    locations,
    isLoadingModal,
    isLoadingTable,
    columns,
    layoutFilter,
    fetchLocations,
    pagination,
    handleSave,
    handleCancel,
    locationById,
    isEditModal,
    isVisibleModal,
    setIsVisibleModal,
    handleTableChange,
    fileList,
    setFileList,
  };
};

export default useLocations;
