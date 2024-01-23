import React, { useEffect, forwardRef, useState } from 'react';
import * as joint from 'jointjs';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';

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
    if (graphContainerRef.current) {
      const graph:any = new joint.dia.Graph();
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
          const rectWidth = iconType.length * 10 + 20;
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
            firstSelectedRectId = selectedRect.id;
            console.log('Selected Cell (first):', selectedRect);
          } else {
            const secondSelectedRectId: any = selectedRect.id;
            console.log('Selected Cell (second):', selectedRect);
  
            createLink(firstSelectedRectId, secondSelectedRectId);
            firstSelectedRectId = null;
          }
        }
      });

      return () => {
        paper.off('cell:pointerclick');
      };
    }
  }, []);  // 移除 createLink 作为依赖

  const createLink = (sourceId: string, targetId: string) => {
    const link: any = new joint.shapes.standard.Link();
    const linkId = uuidv4();

    link.set('id', linkId);
    link.set('smooth', true)
    // link.connector('straight');
    link.attr({
      line: {
        stroke: linkColor,
        strokeWidth: 1.5,
        cursor: 'grab', // 设置连接线的光标样式为手势
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

      const linkView: any = paperRef.current?.findViewByModel(link);
      if (linkView) {
        const lineElement = linkView.el.querySelector('line');
        console.log("lineElement", lineElement)
        if (lineElement) {
          // console.log("lineElement", lineElement)
          lineElement.style.cursor = 'grab';
        }
      }

      onInsertLink(linkId, sourceId, targetId);
    }
  };

  return <div ref={graphContainerRef} style={{ height: '100%', position: 'relative' }} />;
};

export default forwardRef(GraphEditor);

export interface GraphEditorRef {
  addNode: (iconType: string, x: number, y: number) => void;
}


