// components/ToolBar.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Divider, Tooltip, Switch } from 'antd';
import { SaveOutlined, UndoOutlined, RedoOutlined, PlusOutlined, FileAddOutlined, FileImageOutlined, LinkOutlined } from '@ant-design/icons';
import { GraphEditorRef } from '../GraphEditor/mxgraph';
import { ColorPicker } from 'antd';
// @ts-ignore
import styles from "./index.module.scss";
import classnames from "classnames/bind";
import { setLinkColor } from '../../redux/models/graphEditorSlice';
import { setGridLayout } from '../../redux/models/gridEditorSlice';
const classNames = classnames.bind(styles);

interface ToolBarProps {
  setShowGrid: React.Dispatch<React.SetStateAction<boolean>>;
  onInsertLink: () => void;
  graphEditorRef: React.RefObject<GraphEditorRef | null>;
}

const ToolBar: React.FC<ToolBarProps> = ({ onSave, onLoad, onInsertLink }:any) => {
  const dispatch = useDispatch()
  const [gridEnabled, setGridEnabled] = useState(true);
  const buttonStyle = { marginRight: '0' };
  const handleNewCanvas = () => {
    console.log('新建画布');
  };

  const handleSave = () => {
    console.log('保存');
  };

  const handleUndo = () => {
    console.log('撤销');
  };

  const handleLinkColor = (value:any) => {
    const hexColor = value.toHexString(); 
    dispatch(setLinkColor(hexColor))// 这里获取16进制表示的颜色值
    console.log("value", hexColor)
  }

  const handleGridSwitch = (checked: boolean) => {
    setGridEnabled(checked)
    dispatch(setGridLayout(checked))
  };

  return (
    <div className={classNames("container")}>
      <Tooltip title="新建">
        <Button icon={<PlusOutlined />} type="text" onClick={onInsertLink} />
      </Tooltip>
      <Divider type="vertical" />
      <Tooltip title="保存">
        <Button icon={<SaveOutlined />} type="text" onClick={onSave} />
      </Tooltip>
      <Divider type="vertical" />
      <Tooltip title="撤销">
        <Button icon={<UndoOutlined />} type='text' onClick={handleUndo} style={buttonStyle} className="icon-button" />
      </Tooltip>
      <Divider type="vertical" />
      <Tooltip title="颜色选择器">
        <div className={classNames("color-picker")}>
          <ColorPicker defaultValue="#1677ff" size={"small"} onChange={handleLinkColor}/>
        </div>
      </Tooltip>
      <Divider type="vertical" />
      <div style={{ display: "flex", alignItems: "center" }}>
        <span style={{ marginRight: 8 }}>显示网格</span>
        <Switch checked={gridEnabled} onChange={handleGridSwitch} />
      </div>
    </div>
  );
};

export default ToolBar;

