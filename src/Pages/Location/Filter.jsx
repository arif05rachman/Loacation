import { Button, Col, Form, Input, Row } from "antd";
import React from "react";

const columnSize = { lg: 12, md: 12, xs: 24 };

const Filter = ({ form, layout }) => {
  return (
    <div className="container-content">
      <Form {...layout} form={form} layout="vertical">
        <Row gutter={[24, 24]}>
          <Col {...columnSize}>
            <Form.Item name="name" label="Nama Lokasi">
              <Input placeholder="Type name" />
            </Form.Item>
          </Col>
          <Col {...columnSize}>
            <Form.Item name="city" label="Nama Kota">
              <Input placeholder="Type name" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button type="primary" shape="round">
              Cari
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Filter;
