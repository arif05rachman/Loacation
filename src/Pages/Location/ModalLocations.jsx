import React, { useState } from "react";
import {
  Button,
  Col,
  Form,
  Image,
  Input,
  Modal,
  Row,
  Skeleton,
  Typography,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const { Title } = Typography;

const columnSize = { lg: 12, md: 12, xs: 24 };
const columnSizeButton = { lg: 6, md: 6, xs: 24 };
const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const ModalLocations = ({
  form,
  isEdited,
  isLoading,
  visible,
  setVisible,
  handleSave,
  handleCancel,
  locationById,
  fileList,
  setFileList,
}) => {
  return (
    <div className="container-content">
      <Row>
        <Col lg={4} md={6} xs={24}>
          <Button
            type="primary"
            size="large"
            block
            className="u-m2"
            onClick={() => setVisible(true)}
          >
            Tambah Kategori
          </Button>
        </Col>
      </Row>
      <Modal
        title={
          <Title level={5}>Form {isEdited ? "Edit" : "Tambah"} Location</Title>
        }
        centered
        visible={visible}
        width="80rem"
        footer={null}
        onCancel={handleCancel}
      >
        {isLoading ? (
          <Skeleton />
        ) : (
          <Form
            form={form}
            {...layout}
            onFinish={handleSave}
            initialValues={{ is_active: true, is_required_start_date: true }}
          >
            <Row gutter={24}>
              <Col {...columnSize}>
                <Form.Item label="Name" name="Place_Name">
                  <Input placeholder="Masukkan nama Lokasi" required />
                </Form.Item>
              </Col>
              <Col {...columnSize}>
                <Form.Item label="Category" name="Category" required>
                  <Input placeholder="Masukkan Category" />
                </Form.Item>
              </Col>
              <Col {...columnSize}>
                <Form.Item label="City" name="City" required>
                  <Input placeholder="Masukkan City" />
                </Form.Item>
              </Col>
              <Col {...columnSize}>
                <Form.Item label="Price" name="Price" required>
                  <Input placeholder="Masukkan Price" />
                </Form.Item>
              </Col>
              <Col {...columnSize}>
                <Form.Item label="Rating" name="Rating" required>
                  <Input placeholder="Masukkan Rating" />
                </Form.Item>
              </Col>
              <Col {...columnSize}>
                <Form.Item label="Lat" name="Lat" required>
                  <Input placeholder="Masukkan Lat" />
                </Form.Item>
              </Col>
              <Col {...columnSize}>
                <Form.Item label="Long" name="Long" required>
                  <Input placeholder="Masukkan Lat" />
                </Form.Item>
              </Col>
              <Col {...columnSize}>
                <Image src={locationById?.Image} height="10rem" width="10rem" />
                <Form.Item label="Image" name="Image">
                  <Upload
                    name="file"
                    accept="image/jpeg,image/x-png"
                    maxCount={1}
                    fileList={fileList}
                    listType="picture-card"
                    onRemove={() => setFileList(null)}
                    beforeUpload={(file) => {
                      if (file) {
                        setFileList([file]);
                      }
                      return false;
                    }}
                  >
                    <Button icon={<UploadOutlined />} />
                  </Upload>
                </Form.Item>
              </Col>
              <Col {...columnSize}>
                <Form.Item label="Description" name="Description" required>
                  <TextArea placeholder="Masukkan Description" />
                </Form.Item>
              </Col>
            </Row>
            <Row className="u-justify-end" gutter={[24, 24]}>
              <Col {...columnSizeButton} className="u-px1">
                <Button htmlType="submit" type="primary" size="large" block>
                  SIMPAN
                </Button>
              </Col>
              <Col {...columnSizeButton} className="u-px1">
                <Button
                  htmlType="button"
                  size="large"
                  block
                  onClick={handleCancel}
                >
                  BATAL
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default ModalLocations;
