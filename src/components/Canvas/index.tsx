// components/Canvas.tsx
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
// import GraphEditor, { GraphEditorRef } from '../GraphEditor';
import GraphEditor from '../GraphEditor/mxgraph.tsx';
import styles from "./index.module.scss";
import classnames from "classnames/bind";
const classNames = classnames.bind(styles);

interface CanvasProps {
  showGrid: boolean;
  graphEditorRef: React.RefObject<GraphEditorRef>;
}

const Canvas: React.FC<CanvasProps> = ({ showGrid, graphEditorRef }) => {
  const gridLayout = useSelector((state: any) => state.gridLayout.gridLayout)

  const handleDrop = (e: React.DragEvent<HTMLDivElement> | any) => {
    e.preventDefault();
    const iconId = e.dataTransfer.getData('iconId');
    const iconType = e.dataTransfer.getData('iconType');
    const offsetX = e.clientX;
    const offsetY = e.clientY;
  
    if (graphEditorRef.current) {
      // 设置默认宽度为2（如果是直线的话）
      const defaultWidth = iconType.toLowerCase() === 'line' ? 100 : 80;
      const defaultHeigt = iconType.toLowerCase() === 'line' ? 2 : 30;
      const defaultAngle = iconType.toLowerCase() === 'line' ? 30 : 0;

      graphEditorRef.current.addNode(uuidv4(), iconType, offsetX, offsetY);
    }
  };

  return (
    <div
      className={classNames({ container: gridLayout, 'container-without': !gridLayout })}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      style={{ width: '100%', height: '800px', display: 'flex', flexDirection: 'column' }}
    >
      {/* 传递 graphEditorRef 到 GraphEditor 组件 */}
      <GraphEditor ref={graphEditorRef}  />
    </div>
  );
};

export default Canvas;

