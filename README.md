// src/components/Toolbar.js
import React from 'react';
import { Button, Space, Dropdown, Menu } from 'antd';
import { FileOutlined, InsertRowAboveOutlined, SettingOutlined } from '@ant-design/icons';

const Toolbar = () => {
  const handleFileMenuClick = ({ key }) => {
    // 处理文件操作
    console.log('File menu action:', key);
  };

  const fileMenu = (
    <Menu onClick={handleFileMenuClick}>
      <Menu.Item key="new">New</Menu.Item>
      <Menu.Item key="open">Open</Menu.Item>
      <Menu.Item key="save">Save</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="settings">Settings</Menu.Item>
    </Menu>
  );

  return (
    <Space>
      <Dropdown overlay={fileMenu} placement="bottomCenter">
        <Button>
          <FileOutlined />
          File
        </Button>
      </Dropdown>
      <Button>
        <InsertRowAboveOutlined />
        Insert
      </Button>
      <Button>
        <SettingOutlined />
        Settings
      </Button>
    </Space>
  );
};

export default Toolbar;
