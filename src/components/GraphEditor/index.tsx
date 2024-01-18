import React, { useEffect, forwardRef, useState, useCallback } from 'react';
import * as joint from 'jointjs';
import { v4 as uuidv4 } from 'uuid';

interface GraphEditorProps {
  showGrid: boolean;
  onInsertLink: (linkId: string, sourceId: string, targetId: string) => void;
}

const GraphEditor: React.ForwardRefRenderFunction<GraphEditorRef, GraphEditorProps> = ({ showGrid, onInsertLink }, ref) => {
  const graphContainerRef = React.useRef<HTMLDivElement>(null);
  const graphRef = React.useRef<joint.dia.Graph | null>(null);
  const [curRef, setCurRef] = useState<any>(ref);

  const addNode = useCallback((iconType: string, x: number, y: number) => {
    const rect = new joint.shapes.standard.Rectangle();
    const nodeId = uuidv4();
    rect.set('id', nodeId);
    rect.position(x, y);
    const rectWidth = iconType.length * 10 + 10;
    rect.resize(rectWidth, 60);
    rect.attr({
      body: { fill: 'lightblue' },
      label: { text: iconType, fill: 'black' },
    });

    graphRef.current?.addCell(rect);
  }, []);

  useEffect(() => {
    console.log("graphContainerRef.current", curRef)
    if (graphContainerRef.current) {
      const graph = new joint.dia.Graph();
      const paper = new joint.dia.Paper({
        el: graphContainerRef.current,
        model: graph,
        width: '100%',
        height: '100%',
        gridSize: showGrid ? 10 : 1,
      });

      graphRef.current = graph;

      if (curRef) {
        curRef.current = {
          addNode,
        };
      }
    }
  }, [showGrid, curRef, onInsertLink, addNode]);

  return <div ref={graphContainerRef} style={{ height: '100%', border: '1px solid #e8e8e8', position: 'relative' }} />;
};

export default forwardRef(GraphEditor);

export interface GraphEditorRef {
  addNode: (iconType: string, x: number, y: number) => void;
  createLink: (sourceId: string, targetId: string) => void;
}