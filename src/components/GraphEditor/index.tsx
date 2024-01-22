import React, { useEffect, forwardRef, useState } from 'react';
import * as joint from 'jointjs';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';

// Add more colors if needed
const COLORS = {
  grid: "#a1bbce",
  link: "#FF620C",
  selection: "#f68e96",
};

interface GraphEditorProps {
  showGrid: boolean;
  onInsertLink: (linkId: string, sourceId: string, targetId: string) => void;
}

const GraphEditor: React.ForwardRefRenderFunction<GraphEditorRef, GraphEditorProps> = ({ showGrid, onInsertLink }, ref) => {
  const graphContainerRef = React.useRef<HTMLDivElement>(null);
  const graphRef = React.useRef<joint.dia.Graph | null>(null);
  const paperRef = React.useRef<joint.dia.Paper | null>(null);
  const [nodes, setNodes] = useState<joint.shapes.standard.Rectangle[]>([]);
  const linkColor = useSelector((state: any) => state.graphEditor.linkColor)

  useEffect(() => {
    console.log("linkColor", linkColor)
  }, [linkColor])

  useEffect(() => {
    if (graphContainerRef.current) {
      const graph = new joint.dia.Graph();
      const paper = new joint.dia.Paper({
        el: graphContainerRef.current,
        model: graph,
        width: '100%',
        height: '100%',
        gridSize: showGrid ? 10 : 1,
        drawGrid: showGrid ? { name: "mesh", color: COLORS.grid } : false,
      });

      graphRef.current = graph;
      paperRef.current = paper;

      paper.on('cell:pointerup', (cellView: joint.dia.CellView | any) => {
        if (cellView.model.isElement()) {
          const newNode: any = cellView.model as joint.shapes.standard.Rectangle;
          // Check for proximity to other nodes and create links
          nodes.forEach((node: any) => {
            if (node !== newNode && newNode.position().distance(node.position()) < 60) {
              createLink(newNode.id, node.id);
            }
          });
        }
      });
    }
  }, [showGrid]);

  useEffect(() => {
    if (ref) {
      (ref as any).current = {
        addNode: (iconType: string, x: number, y: number) => {
          const rect: any = new joint.shapes.standard.Rectangle();
          const nodeId = uuidv4();
          rect.set('id', nodeId);
          rect.position(x, y);
          const rectWidth = iconType.length * 10 + 20; // Adjusted width based on iconType
          rect.resize(rectWidth, 60);
          rect.attr({
            body: { fill: 'lightblue' },
            label: { text: iconType, fill: 'black' },
          });

          graphRef.current?.addCell(rect);
          setNodes((prevNodes) => [...prevNodes, rect]);
        },
      };
    }
  }, [ref]);

  useEffect(() => {
    let firstSelectedRectId: string | null | any = null;
  
    const paper: any = paperRef.current;
  
    if (paper) {
      paper.on('cell:pointerclick', (cellView: joint.dia.CellView | any) => {
        if (cellView.model.isElement()) {
          const selectedRect = cellView.model as joint.shapes.standard.Rectangle;
  
          if (firstSelectedRectId === null) {
            // 第一次点击，记录第一个节点的 ID
            firstSelectedRectId = selectedRect.id;
            console.log('Selected Cell (first):', selectedRect);
          } else {
            // 第二次点击，记录第二个节点的 ID，然后创建连接
            const secondSelectedRectId: any = selectedRect.id;
            console.log('Selected Cell (second):', selectedRect);
  
             // 创建连接
            createLink(firstSelectedRectId, secondSelectedRectId);
  
            // 清除记录的两个 ID
            firstSelectedRectId = null;
          }
        }
      });
  
      // 移除 createLink 作为依赖
      return () => {
        paper.off('cell:pointerclick');
      };
    }
  }, []);  // 移除 createLink 作为依赖
  
  const createLink = (sourceId: string, targetId: string) => {
    const link: any = new joint.shapes.standard.Link();
    const linkId = uuidv4();

    link.set('id', linkId);
    link.attr({
      line: {
        stroke: linkColor,
        strokeWidth: 1.5,
      },
      targetMarker: {
        type: 'path',
        'stroke-width': 1,
        fill: linkColor,
        d: 'M 8 -4 0 0 8 4 Z',
      },
    });

    const sourceNode = graphRef.current?.getCell(sourceId);
    const targetNode = graphRef.current?.getCell(targetId);

    if (sourceNode && targetNode) {
      link.source(sourceNode, { anchor: { name: 'center' } });
      link.target(targetNode, { anchor: { name: 'center' } });

      graphRef.current?.addCell(link);

      onInsertLink(linkId, sourceId, targetId);
    }
  };

  return <div ref={graphContainerRef} style={{ height: '100%', position: 'relative' }} />;
};

export default forwardRef(GraphEditor);

export interface GraphEditorRef {
  addNode: (iconType: string, x: number, y: number) => void;
}

