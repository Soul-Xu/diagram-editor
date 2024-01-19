import React, { useState } from 'react';
import { Menu, Layout, Input, Row, Divider, Tooltip } from 'antd';
import { AppstoreOutlined, SettingOutlined, AccountBookOutlined, BookOutlined, CiCircleOutlined, CommentOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid'; // 引入uuid
// @ts-ignore
import styles from "./index.module.scss";
import classnames from "classnames/bind";
const classNames = classnames.bind(styles);

const { Sider } = Layout;

const SideMenu: React.FC = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState<string | null>(null);

  const handleMenuClick = (menuItem: string) => {
    if (menuItem === selectedMenuItem) {
      setSelectedMenuItem(null);
    } else {
      setSelectedMenuItem(menuItem);
    }
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, iconType: string) => {
    const iconId = uuidv4();  // 使用uuid生成唯一的ID
    e.dataTransfer.setData('iconType', iconType);
    e.dataTransfer.setData('iconId', iconId);  // 将随机生成的ID传递给拖动事件
    e.currentTarget.style.cursor = 'grabbing';
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.style.cursor = 'grab'; // 拖动结束时恢复光标样式
  };

  return (
    <div className={classNames("container")}>
      <Sider width={50} theme="light">
        <Menu mode="inline" theme="light" onClick={({ key }) => handleMenuClick(key)}>
          <Menu.Item key="icon" style={{ padding: "0 12px" }}>
            <Tooltip title="图标">
              <AppstoreOutlined />
            </Tooltip>
          </Menu.Item>
          <Menu.Item key="config" style={{ padding: "0 12px" }}>
            <Tooltip title="配置">
              <SettingOutlined />
            </Tooltip>
          </Menu.Item>
        </Menu>
        <Divider />
      </Sider>
      <div style={{ display: selectedMenuItem ? 'block' : 'none', minWidth: "200px", zIndex: "999999", background: "#fff", padding: "10px" }}>
        {selectedMenuItem === 'icon' && (
          <div>
            <Row style={{ marginBottom: "10px", borderBottom: "1px solid #eee", paddingBottom: "10px" }}>
              <div className={classNames("content-item-title")}>
                <span>图标</span>
              </div>
            </Row>
            <Row style={{ marginBottom: "10px", borderBottom: "1px solid #eee", paddingBottom: "10px" }}>
              <div>
                <Input.Search placeholder="搜索图标" onSearch={(value) => console.log('Search icon:', value)} />
              </div>
            </Row>
            <div className={classNames("content-item-list")}>
              <div
                className={classNames("list-item")}
                draggable
                onDragStart={(e) => handleDragStart(e, 'AppstoreOutlined')}
                onDragEnd={handleDragEnd}
                style={{ cursor: 'grab' }} // 初始光标样式
              >
                <AppstoreOutlined style={{ fontSize: '20px' }} />
              </div>
              <div
                className={classNames("list-item")}
                draggable
                onDragStart={(e) => handleDragStart(e, 'AccountBookOutlined')}
                onDragEnd={handleDragEnd}
                style={{ cursor: 'grab' }} // 初始光标样式
              >
                <AccountBookOutlined style={{ fontSize: '20px' }}/>
              </div>
              <div
                className={classNames("list-item")}
                draggable
                onDragStart={(e) => handleDragStart(e, 'BookOutlined')}
                onDragEnd={handleDragEnd}
                style={{ cursor: 'grab' }} // 初始光标样式
              >
                <BookOutlined style={{ fontSize: '20px' }} />
              </div>
              <div
                className={classNames("list-item")}
                draggable
                onDragStart={(e) => handleDragStart(e, 'CiCircleOutlined')}
                onDragEnd={handleDragEnd}
                style={{ cursor: 'grab' }} // 初始光标样式
              >
                <CiCircleOutlined style={{ fontSize: '20px' }} />
              </div>
              <div
                className={classNames("list-item")}
                draggable
                onDragStart={(e) => handleDragStart(e, 'CommentOutlined')}
                onDragEnd={handleDragEnd}
                style={{ cursor: 'grab' }} // 初始光标样式
              >
                <CommentOutlined style={{ fontSize: '20px' }} />
              </div>
            </div>
          </div>
        )}
        {selectedMenuItem === 'config' && (
          <div>
            <Row style={{ marginBottom: "10px", borderBottom: "1px solid #eee", paddingBottom: "10px" }}>
              <div className={classNames("content-item-title")}>
                <span>配置</span>
              </div>
            </Row>
            <Row style={{ marginBottom: "10px", borderBottom: "1px solid #eee", paddingBottom: "10px" }}>
              <div>
                <Input.Search placeholder="搜索配置" onSearch={(value) => console.log('Search icon:', value)} />
              </div>
            </Row>
            <div className={classNames("content-item-list")}>
              <div
                className={classNames("list-item")}
                draggable
                onDragStart={(e) => handleDragStart(e, 'SettingOutlined')}
                onDragEnd={handleDragEnd}
                style={{ cursor: 'grab' }} // 初始光标样式
              > 
                <SettingOutlined style={{ fontSize: '20px' }} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SideMenu;