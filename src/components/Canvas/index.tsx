// components/Canvas.tsx
import React from 'react';
import GraphEditor, { GraphEditorRef } from '../GraphEditor';

interface CanvasProps {
  showGrid: boolean;
  graphEditorRef: React.RefObject<GraphEditorRef>;
}

const Canvas: React.FC<CanvasProps> = ({ showGrid, graphEditorRef }) => {
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const iconType = e.dataTransfer.getData('iconType');
    const offsetX = e.clientX;
    const offsetY = e.clientY;

    if (graphEditorRef.current) {
      graphEditorRef.current.addNode(iconType, offsetX, offsetY);
    }
  };

  const handleInsertLink = () => {
    // 在这里调用 createLink
    // if (graphEditorRef.current) {
    //   graphEditorRef.current.createLink('sourceNodeId', 'targetNodeId');
    // }
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      {/* 传递 graphEditorRef 到 GraphEditor 组件 */}
      <GraphEditor ref={graphEditorRef} showGrid={showGrid} onInsertLink={handleInsertLink} />
    </div>
  );
};

export default Canvas;
