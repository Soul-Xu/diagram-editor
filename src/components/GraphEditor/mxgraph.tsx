import React, { forwardRef, useEffect, useRef, useState } from 'react';
import mx from 'mxgraph';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';

const mxgraph = mx({
  mxBasePath: 'mxgraph',
  mxLoadResources: false,
  mxLoadStylesheets: false,
});

const COLORS = {
  grid: '#a1bbce',
};

const GraphEditor = forwardRef(({ showGrid }, ref) => {
  const graphContainerRef = useRef(null);
  const graphRef = useRef(null);
  const [nodes, setNodes] = useState([]);
  const linkColor = useSelector((state) => state.graphEditor.linkColor);

  useEffect(() => {
    if (graphContainerRef.current) {
      const graph = new mxgraph.mxGraph(graphContainerRef.current);
      graph.setGridEnabled(showGrid);
      graph.gridSize = 10;
      graph.view.gridColor = COLORS.grid;
      graphRef.current = graph;

      // 在框选时显示实际的图标形状
      graph.setVertexStyle = function (style, cell) {
        mxgraph.mxGraph.prototype.setVertexStyle.apply(this, arguments);
        if (cell != null) {
          const state = this.view.getState(cell);
          if (state != null) {
            const shape = state.shape;
            if (shape != null) {
              shape.apply(state);
            }
          }
        }
      };
    }
  }, [showGrid]);

  useEffect(() => {
    if (ref) {
      ref.current = {
        addNode: (iconId, iconType, x, y, width, height, angle, svg) => {
          // 构建样式字符串，包括形状、宽高和角度
          const style = `shape=${iconType.toLowerCase()};width=${width};height=${height};rotation=${angle};`;

          // 创建 mxCellRenderer
          const cellRenderer = new mxgraph.mxCellRenderer();
          
          // 解析 SVG 内容为 mxCell
          const cell = new mxgraph.mxCell(null, new mxgraph.mxGeometry(x, y, width, height), style);
          const state = new mxgraph.mxCellState(graphRef.current.view, cell, style);
          
          // 渲染 mxCell
          cellRenderer.createShape(state);

          // 插入形状
          const vertex = graphRef.current?.getCellRenderer().initializeShape(state);

          // 设置位置
          vertex.geometry.x = x;
          vertex.geometry.y = y;

          // 更新节点列表
          setNodes((prevNodes) => [...prevNodes, vertex!]);
        },
      };
    }
  }, [ref]);

  return <div ref={graphContainerRef} style={{ height: '100%', position: 'relative' }} />;
});

export default GraphEditor;
