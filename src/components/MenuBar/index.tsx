// src/components/MenuBar.js
import React from 'react';
import { Button, Space, Dropdown, Menu } from 'antd';

const MenuBar = () => {
  const handleFileMenuClick = ({ key }) => {
    // 处理文件操作
    console.log('File menu action:', key);
  };

  const handleInsertMenuClick = ({ key }) => {
    console.log('Insert menu action:', key);
  };

  const handleSettingMenuClick = ({ key }) => {
    console.log('Setting menu action:', key);
  };

  const fileMenu = (
    <Menu onClick={handleFileMenuClick}>
      <Menu.Item key="new">新建</Menu.Item>
      <Menu.Item key="open">打开</Menu.Item>
      <Menu.Item key="save">保存</Menu.Item>
    </Menu>
  );

  const insertMenu = (
    <Menu onClick={handleInsertMenuClick}>
      <Menu.Item key="grid">插入网格</Menu.Item>
      <Menu.Item key="canvas">插入画布</Menu.Item>
    </Menu>
  );

  const settingMenu = (
    <Menu onClick={handleSettingMenuClick}>
      <Menu.Item key="grid">显示网格</Menu.Item>
      <Menu.Item key="background">背景颜色</Menu.Item>
      <Menu.Item key="icon">图标尺寸</Menu.Item>
    </Menu>
  );

  return (
    <Space>
      <Dropdown overlay={fileMenu} placement="bottomCenter">
        <Button type="text">
          文件
        </Button>
      </Dropdown>
      <Dropdown overlay={insertMenu} placement="bottomCenter">
        <Button type="text">
          插入
        </Button>
      </Dropdown>
      <Dropdown overlay={settingMenu} placement="bottomCenter">
        <Button type="text">
          设置
        </Button>
      </Dropdown>
    </Space>
  );
};

export default MenuBar;
