// components/Canvas.tsx
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
// import GraphEditor, { GraphEditorRef } from '../GraphEditor';
import GraphEditor, { GraphEditorRef } from '../GraphEditor/mxgraph.tsx';

interface CanvasProps {
  showGrid: boolean;
  graphEditorRef: React.RefObject<GraphEditorRef>;
}

const Canvas: React.FC<CanvasProps> = ({ showGrid, graphEditorRef }) => {
  const handleDrop = (e: React.DragEvent<HTMLDivElement> | any) => {
    e.preventDefault();
    const iconId = e.dataTransfer.getData('iconId');
    const iconType = e.dataTransfer.getData('iconType');
    const iconSvg = e.dataTransfer.getData('iconSvg');
    const offsetX = e.clientX;
    const offsetY = e.clientY;

    // console.log("iconId", iconId)
    // console.log("iconSvg", iconSvg)
    // console.log("iconType", iconType)
  
    if (graphEditorRef.current) {
      // 设置默认宽度为2（如果是直线的话）
      const defaultWidth = iconType.toLowerCase() === 'line' ? 100 : 80;
      const defaultHeigt = iconType.toLowerCase() === 'line' ? 2 : 30;
      const defaultAngle = iconType.toLowerCase() === 'line' ? 30 : 0;

      graphEditorRef.current.addNode(iconType, uuidv4(), offsetX, offsetY, defaultWidth, defaultHeigt, defaultAngle, iconSvg);
    }
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      {/* 传递 graphEditorRef 到 GraphEditor 组件 */}
      <GraphEditor ref={graphEditorRef} showGrid={showGrid}  />
    </div>
  );
};

export default Canvas;
