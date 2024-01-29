import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';

const SaveCanvasModal = ({ visible, onCancel, onSave }) => {
  const [form] = Form.useForm();

  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        onSave(values);
        form.resetFields();
      })
      .catch((errorInfo) => {
        console.log('Validation Failed:', errorInfo);
      });
  };

  return (
    <Modal
      title="保存画布"
      visible={visible}
      onCancel={onCancel}
      onOk={handleSave}
      okText="确定"
      cancelText="取消"
      destroyOnClose
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="canvasName"
          label="画布名称"
          rules={[{ required: true, message: '请输入画布名称' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="canvasDescription"
          label="画布描述"
          rules={[{ required: true, message: '请输入画布描述' }]}
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SaveCanvasModal
