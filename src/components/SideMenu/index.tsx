import React, { useState } from 'react';
import { Menu, Layout, Input, Row, Divider, Tooltip, Collapse } from 'antd';
import { AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import { SIDEBAR_BASIC_SHAPES } from './constants'
import styles from "./index.module.scss";
import classnames from "classnames/bind";
const classNames = classnames.bind(styles);

const { Sider } = Layout;
const { Panel } = Collapse;

const SideMenu: React.FC = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState<string | null>(null);

  const handleMenuClick = (menuItem: string) => {
    if (menuItem === selectedMenuItem) {
      setSelectedMenuItem(null);
    } else {
      setSelectedMenuItem(menuItem);
    }
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, shape: any) => {
    const iconId = uuidv4();
    e.dataTransfer.setData('iconId', iconId);
    e.dataTransfer.setData('iconType', shape.key);
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
      <div style={{ display: selectedMenuItem ? 'block' : 'none', minWidth: "200px", zIndex: "9", background: "#fff", padding: "10px" }}>
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
              <Collapse
                bordered={false}
                defaultActiveKey={['common', 'svg', 'picture', 'card']}
              >
                <Panel key="common" header="基本" style={{ width: "202px" }}>
                  <div style={{ display: "flex", flexWrap: "wrap" }}>
                    {SIDEBAR_BASIC_SHAPES.map(shape => (
                      <a
                        href="#"
                        key={`panel_a_${shape.key}`}
                        className={classNames("list-item")}
                        draggable
                        onDragStart={(e: any) => handleDragStart(e, shape)}
                        onDragEnd={handleDragEnd}
                        style={{ cursor: 'grab', marginRight: "10px", marginBottom: "10px" }}
                      >
                        <Tooltip
                          placement="top"
                          title={shape.name}
                          key={`panel_${shape.key}`}
                          className="tooltip"
                        >
                          <span className="iconfont" dangerouslySetInnerHTML={{ __html: shape.iconCode }}></span>
                        </Tooltip>
                      </a>
                    ))}
                  </div>
                </Panel>
              </Collapse>
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
              <Collapse
                bordered={false}
                defaultActiveKey={['common', 'svg', 'picture', 'card']}
              >
                <Panel key="common" header="基本" style={{ width: "202px" }}>
                  <div style={{ display: "flex", flexWrap: "wrap" }}>
                    {SIDEBAR_BASIC_SHAPES.map(shape => (
                      <a
                        href="#"
                        key={`panel_a_${shape.key}`}
                        className={classNames("list-item")}
                        draggable
                        onDragStart={(e: any) => handleDragStart(e, shape)}
                        onDragEnd={handleDragEnd}
                        style={{ cursor: 'grab', marginRight: "10px", marginBottom: "10px" }}
                      >
                        <Tooltip
                          placement="top"
                          title={shape.name}
                          key={`panel_${shape.key}`}
                          className="tooltip"
                        >
                          <span className="iconfont" dangerouslySetInnerHTML={{ __html: shape.iconCode }}></span>
                        </Tooltip>
                      </a>
                    ))}
                  </div>
                </Panel>
              </Collapse>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SideMenu;