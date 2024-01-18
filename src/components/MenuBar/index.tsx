// components/MenuBar.tsx
import React, { useState } from 'react';
import { Button, Divider, Tooltip, Switch } from 'antd';
import { SaveOutlined, UndoOutlined, RedoOutlined, PlusOutlined, FileAddOutlined, FileImageOutlined, LinkOutlined } from '@ant-design/icons';
import { GraphEditorRef } from '../GraphEditor';

interface MenuBarProps {
  setShowGrid: React.Dispatch<React.SetStateAction<boolean>>;
  onInsertLink: () => void;
  graphEditorRef: React.RefObject<GraphEditorRef | null>;
}

const MenuBar: React.FC<MenuBarProps> = ({ setShowGrid, onInsertLink, graphEditorRef }) => {
  const [gridEnabled, setGridEnabled] = useState(true);

  const buttonStyle = { marginRight: '0' };

  const handleSave = () => {
    console.log('保存');
  };

  const handleUndo = () => {
    console.log('撤销');
  };

  const handleRedo = () => {
    console.log('重做');
  };

  const handleNewElement = () => {
    console.log('新建图形元素');
  };

  const handleInsertText = () => {
    console.log('插入文字');
  };

  const handleInsertImage = () => {
    console.log('插入图片');
  };

  const handleInsertLink = () => {
    console.log("menu-handleInsertLink", graphEditorRef.current)
    // 处理插入连线逻辑
    if (graphEditorRef.current) {
      graphEditorRef.current.createLink('sourceNodeId', 'targetNodeId');
    }
  };

  const handleGridSwitch = (checked: boolean) => {
    setGridEnabled(checked);
    setShowGrid(checked);
  };

  return (
    <div>
      <Tooltip title="新建图形元素">
        <Button icon={<PlusOutlined />} type='text' onClick={handleNewElement} style={buttonStyle} className="icon-button" />
      </Tooltip>
      <Divider type="vertical" />
      <Tooltip title="保存">
        <Button icon={<SaveOutlined />} type='text' onClick={handleSave} style={buttonStyle} className="icon-button" />
      </Tooltip>
      <Divider type="vertical" />
      <Tooltip title="撤销">
        <Button icon={<UndoOutlined />} type='text' onClick={handleUndo} style={buttonStyle} className="icon-button" />
      </Tooltip>
      <Divider type="vertical" />
      <Tooltip title="重做">
        <Button icon={<RedoOutlined />} type='text' onClick={handleRedo} style={buttonStyle} className="icon-button" />
      </Tooltip>
      <Divider type="vertical" />
      <Tooltip title="插入文字">
        <Button icon={<FileAddOutlined />} type='text' onClick={handleInsertText} style={buttonStyle} className="icon-button" />
      </Tooltip>
      <Divider type="vertical" />
      <Tooltip title="插入图片">
        <Button icon={<FileImageOutlined />} type='text' onClick={handleInsertImage} style={buttonStyle} className="icon-button" />
      </Tooltip>
      <Divider type="vertical" />
      <Tooltip title="插入连线">
        <Button icon={<LinkOutlined />} type='text' onClick={handleInsertLink} style={buttonStyle} className="icon-button" />
      </Tooltip>
      <Divider type="vertical" />
      <span style={{ marginRight: 8 }}>显示网格</span>
      <Switch checked={gridEnabled} onChange={handleGridSwitch} />
    </div>
  );
};

export default MenuBar;