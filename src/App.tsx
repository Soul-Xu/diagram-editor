import React, { useState, useRef } from 'react';
import { Divider, Layout } from 'antd';
import Toolbar from './components/ToolBar/index.tsx';
import MenuBar from './components/MenuBar/index.tsx';
// @ts-ignore
import SideMenu from './components/SideMenu/index.tsx';
import Canvas from './components/Canvas/index.tsx';
import PropertyPanel from './components/PropertyPanel/index.tsx';

const { Header, Content, Sider } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [showGrid, setShowGrid] = useState(true);

  // 创建 graphEditorRef，并初始化为 null
  const graphEditorRef = useRef<any | null>(null);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ backgroundColor: "#fff", height: "40px", lineHeight: "40px" }}>
        <Toolbar />
      </Header>
      <div style={{ height: "30px", lineHeight: "30px", borderBottom: "1px solid #eee", padding: "0 50px" }}>
        <MenuBar setShowGrid={setShowGrid} onInsertLink={() => {}} graphEditorRef={graphEditorRef} />
      </div>
      <Layout style={{ display: "flex" }}>
        <SideMenu />
        <Canvas showGrid={showGrid} graphEditorRef={graphEditorRef} />
        <PropertyPanel />
      </Layout>
    </Layout>
  );
};

export default App;