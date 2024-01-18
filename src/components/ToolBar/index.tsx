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
      <Menu.Item key="new">新建</Menu.Item>
      <Menu.Item key="open">打开</Menu.Item>
      <Menu.Item key="save">保存</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="settings">设置</Menu.Item>
    </Menu>
  );

  return (
    <Space>
      <Dropdown overlay={fileMenu} placement="bottomCenter">
        <Button type="text">
          {/* <FileOutlined /> */}
          文件
        </Button>
      </Dropdown>
      <Button type="text">
        {/* <InsertRowAboveOutlined /> */}
        查看
      </Button>
      <Button type="text">
        {/* <InsertRowAboveOutlined /> */}
        插入
      </Button>
      <Button type="text">
        {/* <SettingOutlined /> */}
        设置
      </Button>
    </Space>
  );
};

export default Toolbar;
