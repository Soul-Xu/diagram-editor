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

const { mxCell, mxGeometry, mxUtils, mxCodec } = mxgraph;

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
        // addNode: (iconId, iconType, x, y, width, height, angle, svg) => {
        //   // // 构建样式字符串，包括形状、宽高和角度
        //   // const style = `shape=${iconType.toLowerCase()};width=${width };height=${height};rotation=${angle};`;
        
        //   // // 插入形状
        //   // const vertex = graphRef.current?.insertVertex(
        //   //   graphRef.current?.getDefaultParent(),
        //   //   iconId,
        //   //   '',
        //   //   x,
        //   //   y,
        //   //   width,
        //   //   height,
        //   //   style
        //   // );

        //    // 构建样式字符串，包括形状、宽高和角度
        //    const style = `shape=${iconType.toLowerCase()};width=${width};height=${height};rotation=${angle};`;

        //    // 解析 SVG 内容为 mxCell
        //    const cell = new mxCell(null, new mxGeometry(x, y, width, height), style);
        //    const xmlDocument = mxUtils.parseXml(svg);
        //    const codec = new mxCodec(xmlDocument);
        //    codec.decode(xmlDocument.documentElement, cell);
 
        //    // 插入形状
        //    const vertex = graphRef.current?.insertVertex(
        //      graphRef.current?.getDefaultParent(),
        //      iconId,
        //      '',
        //      x,
        //      y,
        //      width,
        //      height,
        //      style
        //    );
        
        //   // 更新节点列表
        //   setNodes((prevNodes) => [...prevNodes, vertex!]);
        // }
        addNode: (iconId, iconType, x, y, width, height, angle, svg) => {
          // 构建样式字符串，包括形状、宽高和角度
          const style = `shape=${iconType.toLowerCase()};width=${width};height=${height};rotation=${angle};`;

          // 解析 SVG 内容为 mxCell
          const cell = new mxCell(null, new mxGeometry(x, y, width, height), style);
          const xmlDocument = mxUtils.parseXml(svg);
          const codec = new mxCodec(xmlDocument);
          codec.decode(xmlDocument.documentElement, cell);

          // 插入形状
          const vertex = graphRef.current?.insertVertex(
            graphRef.current?.getDefaultParent(),
            iconId,
            '',
            x,
            y,
            width,
            height,
            style
          );

          // 更新节点列表
          setNodes((prevNodes) => [...prevNodes, vertex!]);
        },
      };
    }
  }, [ref]);

  return <div ref={graphContainerRef} style={{ height: '100%', position: 'relative' }} />;
});