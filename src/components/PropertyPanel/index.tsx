// components/PropertyPanel.tsx
import React, { useState } from 'react';
import { Layout, Menu, Input, Row, Divider } from 'antd';
import { EditOutlined, InfoCircleOutlined, SettingOutlined, LineChartOutlined } from '@ant-design/icons';
import classnames from "classnames/bind";
// @ts-ignore
import styles from "./index.module.scss"; // 换成你的样式文件路径
const classNames = classnames.bind(styles);

const { Sider, Content } = Layout;

const PropertyPanel: React.FC = () => {
  const [showContent, setShowContent] = useState(false)
  const [selectedMenuItem, setSelectedMenuItem] = useState<string | null>(null);

  const handleMenuClick = (menuItem: string) => {
    if (menuItem === selectedMenuItem) {
      // 如果点击的是当前已选中的 menuItem，切换显示状态
      setShowContent(!showContent);
    } else {
      // 如果点击的是不同的 menuItem，保持之前的显示状态
      setSelectedMenuItem(menuItem);
      setShowContent(true);
    }
  };

  return (
    <div className={classNames("container")} style={{ background: '#fff', borderRadius: '4px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', display: showContent ? 'flex' : ""}}>
      <Sider theme="light" width={60} style={{ borderRight: '1px solid #e8e8e8', width: "60px", height: "800px", boxSizing: "border-box" }}>
        <Menu mode="vertical" defaultSelectedKeys={['basic']} style={{ height: '100%', borderRight: 'none' }} onClick={({ key }) => handleMenuClick(key)}>
          <Menu.Item key="basic" icon={<InfoCircleOutlined />} style={{ padding: "0px 8px 0 16px", width: "50px", textAlign: "center" }} />
          <Menu.Item key="details" icon={<EditOutlined />} style={{ padding: "0px 8px 0 16px", width: "50px", textAlign: "center" }} />
          <Menu.Item key="config" icon={<SettingOutlined />} style={{ padding: "0px 8px 0 16px", width: "50px", textAlign: "center" }} />
          <Menu.Item key="trend" icon={<LineChartOutlined />} style={{ padding: "0px 8px 0 16px", width: "50px", textAlign: "center" }} />
        </Menu>
      </Sider>
      <Content style={{ padding: '10px', flex: 1 }}>
        <div>
          {selectedMenuItem === 'basic' && (
            <div>
              <Row style={{ marginBottom: "10px", borderBottom: "1px solid #eee", paddingBottom: "10px" }}>
                <div className={classNames("content-item-title")}>
                  <span>基本信息</span>
                </div>
              </Row>
              {/* 在这里可以展示基本信息的具体内容 */}
            </div>
          )}
          {selectedMenuItem === 'details' && (
            <div>
              <Row style={{ marginBottom: "10px", borderBottom: "1px solid #eee", paddingBottom: "10px" }}>
                <div className={classNames("content-item-title")}>
                  <span>详情信息</span>
                </div>
              </Row>
              {/* 在这里可以展示详情信息的具体内容 */}
            </div>
          )}
          {selectedMenuItem === 'config' && (
            <div>
              <Row style={{ marginBottom: "10px", borderBottom: "1px solid #eee", paddingBottom: "10px" }}>
                <div className={classNames("content-item-title")}>
                  <span>配置信息</span>
                </div>
              </Row>
              {/* 在这里可以展示配置信息的具体内容 */}
            </div>
          )}
          {selectedMenuItem === 'trend' && (
            <div>
              <Row style={{ marginBottom: "10px", borderBottom: "1px solid #eee", paddingBottom: "10px" }}>
                <div className={classNames("content-item-title")}>
                  <span>变化趋势</span>
              </div>
            </Row>
              {/* 在这里可以展示变化趋势的具体内容 */}
            </div>
          )}
        </div>
      </Content>
    </div>
  );
};

export default PropertyPanel;
