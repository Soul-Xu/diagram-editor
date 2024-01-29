import React, { forwardRef, useEffect, useRef, useState } from 'react';
import mx from 'mxgraph';
import { useSelector } from 'react-redux';
import { Button } from 'antd';
import ToolBar from '../ToolBar';
import SaveCanvasModal from './saveModal';
import './customShapes.js'

const mxgraph = mx({
  mxBasePath: 'mxgraph',
  mxLoadResources: false,
  mxLoadStylesheets: false,
});

const COLORS = {
  grid: '#a1bbce',
};

const { mxEvent, mxUtils, mxPoint } = mxgraph;

// 自定义 "actor" 形状
function CustomActorShape(bounds, fill, stroke, strokewidth) {
  mxgraph.mxActor.call(this, bounds, fill, stroke, strokewidth);
}

mxUtils.extend(CustomActorShape, mxgraph.mxActor);

CustomActorShape.prototype.redrawPath = function(c, x, y, w, h) {
  var width = w / 3;
  c.moveTo(0, h);
  c.curveTo(0, (3 * h) / 5, 0, (2 * h) / 5, w / 2, (2 * h) / 5);
  c.curveTo(w / 2 - width, (2 * h) / 5, w / 2 - width, 0, w / 2, 0);
  c.curveTo(w / 2 + width, 0, w / 2 + width, (2 * h) / 5, w / 2, (2 * h) / 5);
  c.curveTo(w, (2 * h) / 5, w, (3 * h) / 5, w, h);
  c.close();
};

// 自定义 "rectangle" 形状
function CustomRectangleShape(bounds, fill, stroke, strokewidth) {
  mxgraph.mxRectangleShape.call(this, bounds, fill, stroke, strokewidth);
}

mxUtils.extend(CustomRectangleShape, mxgraph.mxRectangleShape);

// 重写绘制矩形的方法
CustomRectangleShape.prototype.paintVertexShape = function(c, x, y, w, h) {
  // 调整宽度和高度的比例
  var width = w;
  var height = h;

  c.begin();
  c.moveTo(x, y);
  c.lineTo(x + width, y);
  c.lineTo(x + width, y + height);
  c.lineTo(x, y + height);
  c.close();
  c.fillAndStroke();
};

// 重写 isRoundable 方法
CustomRectangleShape.prototype.isRoundable = function() {
  return true;
};

// 自定义 "circle" 形状
function CustomCircleShape(bounds, fill, stroke, strokewidth) {
  mxgraph.mxEllipse.call(this, bounds, fill, stroke, strokewidth);
}

mxUtils.extend(CustomCircleShape, mxgraph.mxEllipse);

CustomCircleShape.prototype.paintVertexShape = function (c, x, y, w, h) {
  // 绘制圆形的具体逻辑
  c.ellipse(x, y, w, h);
  c.fillAndStroke();
};

CustomCircleShape.prototype.getPerimeterBounds = function (outer, border) {
  if (outer) {
    return new mxgraph.mxRectangle(this.bounds.x - this.strokewidth / 2, this.bounds.y - this.strokewidth / 2,
      this.bounds.width + this.strokewidth, this.bounds.height + this.strokewidth);
  }
  return new mxgraph.mxRectangle(this.bounds.x + this.strokewidth / 2, this.bounds.y + this.strokewidth / 2,
    this.bounds.width - this.strokewidth, this.bounds.height - this.strokewidth);
};

// 自定义 "square" 形状
function CustomSquareShape(bounds, fill, stroke, strokewidth) {
  mxgraph.mxRectangleShape.call(this, bounds, fill, stroke, strokewidth);
}

mxUtils.extend(CustomSquareShape, mxgraph.mxRectangleShape);

CustomSquareShape.prototype.paintVertexShape = function (c, x, y, w, h) {
  // 绘制正方形的具体逻辑
  c.rect(x, y, w, h);
  c.fillAndStroke();
};

CustomSquareShape.prototype.getPerimeterBounds = function (outer, border) {
  if (outer) {
    return new mxgraph.mxRectangle(this.bounds.x - this.strokewidth / 2, this.bounds.y - this.strokewidth / 2,
      this.bounds.width + this.strokewidth, this.bounds.height + this.strokewidth);
  }
  return new mxgraph.mxRectangle(this.bounds.x + this.strokewidth / 2, this.bounds.y + this.strokewidth / 2,
    this.bounds.width - this.strokewidth, this.bounds.height - this.strokewidth);
};

// 自定义 "diamond" 形状
function CustomDiamondShape(bounds, fill, stroke, strokewidth) {
  mxgraph.mxRhombus.call(this, bounds, fill, stroke, strokewidth);
}

mxUtils.extend(CustomDiamondShape, mxgraph.mxRhombus);

CustomDiamondShape.prototype.paintVertexShape = function(c, x, y, w, h) {
  // 绘制 diamond 的具体逻辑
  c.begin();
  var halfWidth = w / 2;
  var halfHeight = h / 2;

  c.moveTo(x + halfWidth, y);
  c.lineTo(x + w, y + halfHeight);
  c.lineTo(x + halfWidth, y + h);
  c.lineTo(x, y + halfHeight);
  c.close();
  c.fillAndStroke();
};

CustomDiamondShape.prototype.getPerimeterBounds = function (outer, border) {
  if (outer) {
    return new mxgraph.mxRectangle(this.bounds.x - this.strokewidth / 2, this.bounds.y - this.strokewidth / 2,
      this.bounds.width + this.strokewidth, this.bounds.height + this.strokewidth);
  }
  return new mxgraph.mxRectangle(this.bounds.x + this.strokewidth / 2, this.bounds.y + this.strokewidth / 2,
    this.bounds.width - this.strokewidth, this.bounds.height - this.strokewidth);
};

// 自定义 "trapzoid" 形状
function CustomTrapzoidShape(bounds, fill, stroke, strokewidth) {
  mxgraph.mxShape.call(this, bounds, fill, stroke, strokewidth);
}

mxUtils.extend(CustomTrapzoidShape, mxgraph.mxShape);

// 重写绘制梯形的方法
CustomTrapzoidShape.prototype.paintVertexShape = function(c, x, y, w, h) {
  var width = w * 0.6; // 调整梯形宽度
  var topOffset = 0.2; // 调整梯形上底到顶部的偏移比例

  c.begin();
  c.moveTo(x + (w - width) / 2, y);
  c.lineTo(x + (w + width) / 2, y);
  c.lineTo(x + w, y + h);
  c.lineTo(x, y + h);
  c.close();
  c.fillAndStroke();
};

// 自定义 "direct-arrow" 形状
function CustomDirectArrowShape(bounds, fill, stroke, strokewidth) {
  mxgraph.mxShape.call(this, bounds, fill, stroke, strokewidth);
}

mxUtils.extend(CustomDirectArrowShape, mxgraph.mxShape);

// 重写绘制箭头直线的方法
CustomDirectArrowShape.prototype.paintVertexShape = function(c, x, y, w, h) {
  // 计算箭头直线的长度
  var arrowLineLength = w;

  // 计算箭头直线的起始点和结束点
  var arrowLineStartX = x;
  var arrowLineEndX = x + arrowLineLength;

  // 计算箭头位置（正方形右上角）
  var arrowEndX = x + w;
  var arrowEndY = y;

  // 绘制箭头直线
  c.begin();
  c.moveTo(arrowLineStartX, arrowEndY);
  c.lineTo(arrowLineEndX, arrowEndY);
  c.stroke();

  // 绘制实心箭头
  var arrowSize = 10;
  c.begin();
  c.moveTo(arrowLineEndX - arrowSize, arrowEndY - arrowSize);
  c.lineTo(arrowLineEndX, arrowEndY);
  c.lineTo(arrowLineEndX - arrowSize, arrowEndY + arrowSize);
  c.close();
  c.fillAndStroke();
};

// 自定义 "bidirect-arrow-line" 形状
function CustomBidirectArrowShape(bounds, fill, stroke, strokewidth) {
  mxgraph.mxShape.call(this, bounds, fill, stroke, strokewidth);
}

mxUtils.extend(CustomBidirectArrowShape, mxgraph.mxShape);

// 重写绘制双向箭头直线的方法
CustomBidirectArrowShape.prototype.paintVertexShape = function(c, x, y, w, h) {
  // 计算箭头直线的长度
  var arrowLineLength = w;

  // 计算箭头直线的起始点和结束点
  var arrowLineStartX = x;
  var arrowLineEndX = x + arrowLineLength;

  // 计算箭头位置（正方形右上角）
  var arrowEndX = x + w;
  var arrowEndY = y;

  // 绘制箭头直线
  c.begin();
  c.moveTo(arrowLineStartX, arrowEndY);
  c.lineTo(arrowLineEndX, arrowEndY);
  c.stroke();

  // 绘制实心箭头
  var arrowSize = 10;
  c.begin();
  c.moveTo(arrowLineEndX - arrowSize, arrowEndY - arrowSize);
  c.lineTo(arrowLineEndX, arrowEndY);
  c.lineTo(arrowLineEndX - arrowSize, arrowEndY + arrowSize);
  c.close();
  c.fillAndStroke();

  // 绘制反方向的箭头
  c.begin();
  c.moveTo(arrowLineStartX + arrowSize, arrowEndY - arrowSize);
  c.lineTo(arrowLineStartX, arrowEndY);
  c.lineTo(arrowLineStartX + arrowSize, arrowEndY + arrowSize);
  c.close();
  c.fillAndStroke();

  // 调整边界
  this.bounds = new mxgraph.mxRectangle(x, y, arrowLineLength, 0); // 使用固定高度值
};

// 自定义直线形状
function CustomLineShape(bounds, fill, stroke, strokewidth) {
  mxgraph.mxConnector.call(this, bounds, fill, stroke, strokewidth);
}

mxUtils.extend(CustomLineShape, mxgraph.mxConnector);

// 重写绘制直线的方法
CustomLineShape.prototype.paintEdgeShape = function(c, pts) {
  c.begin();
  c.moveTo(pts[0].x, pts[0].y);
  c.lineTo(pts[1].x, pts[1].y);
  c.stroke();
};

// 注册自定义形状
mxgraph.mxCellRenderer.registerShape('actor', CustomActorShape);
mxgraph.mxCellRenderer.registerShape('rectangle', CustomRectangleShape);
mxgraph.mxCellRenderer.registerShape('circle', CustomCircleShape);
mxgraph.mxCellRenderer.registerShape('square', CustomSquareShape);
mxgraph.mxCellRenderer.registerShape('diamond', CustomDiamondShape);
mxgraph.mxCellRenderer.registerShape('trapzoid', CustomTrapzoidShape);
mxgraph.mxCellRenderer.registerShape('direct-arrow', CustomDirectArrowShape);
mxgraph.mxCellRenderer.registerShape('bidrect-arrow', CustomBidirectArrowShape);
mxgraph.mxCellRenderer.registerShape('line', CustomLineShape);

// Define a variable to store the source cell when creating connections
let sourceCell = null;

const GraphEditor = forwardRef(({ showGrid }:any, ref:any) => {
  const graphContainerRef = useRef<any>(null);
  const graphRef = useRef<any>(null);
  const [nodes, setNodes] = useState([]);
  const linkColor = useSelector((state:any) => state.graphEditor.linkColor);
  const [showSaveModal, setShowSaveModal] = useState(false)

  useEffect(() => {
    if (graphContainerRef.current) {
      const graph = new mxgraph.mxGraph(graphContainerRef.current);
      graph.gridSize = 10;
      graph.gridEnabled = true;
      graph.view.gridColor = COLORS.grid;
  
      graphRef.current = graph;
  
      graph.getCellStyle = function (cell) {
        const style = mxgraph.mxGraph.prototype.getCellStyle?.apply(
          this,
          arguments
        );
        return style;
      };
      
      graph.setConnectable = true
    }
  }, []);

  useEffect(() => {
    if (ref) {
      ref.current = {
        addNode: (iconId, iconType, x, y) => {
          let style = '';

          console.log("addNode", iconType.toLowerCase())
          // 渲染出对应的图形
          switch (iconType.toLowerCase()) {
            case 'rectangle':
              style = 'shape=rectangle;perimeter=rectanglePerimeter;';
              break;
            case 'text':
              style = 'shape=text;';
              break;
            case 'ellipse':
              style = 'shape=ellipse;';
              break;
            case 'square':
              style = 'shape=square;resizable=1;';
              break;
            case 'triangle':
              style = 'shape=triangle;';
              break;
            case 'circle':
              style = 'shape=circle;resizable=1;';
              break;
            case 'diamond':
              style = 'shape=diamond;';
              break;
            case 'trapzoid':
              style = 'shape=trapzoid;';
              break;
            case 'cylinder':
              style = 'shape=cylinder;';
              break;
            case 'hexagon':
              style = 'shape=hexagon;';
              break;
            case 'cloud':
              style = 'shape=cloud;';
              break;
            case 'data-storage':
              style = 'shape=data-storage;';
              break;
            case 'direct-arrow':
                style = 'shape=direct-arrow;perimeter=directArrowPerimeter;';
                break;
            case 'bidrect-arrow':
              style = 'shape=bidrect-arrow;';
              break;
            case 'line':
              style = 'shape=line;';
              break;
            // case 'curve':
            //   console.log("shape", iconType)
            //   style = 'shape=custom-curve;';
            //   break;
            case 'actor':
              style = 'shape=actor;';
              break;
            default:
              style = 'shape=rectangle;'; // 默认为矩形
              break;
          } 

          graphRef.current.model.beginUpdate();
          try {
            const arrowWidth = 0.5; // 箭头的宽度，你可以根据需要调整
            const vertex = !(iconType === "direct-arrow" || iconType === "bidirect-arrow") ? graphRef.current?.insertVertex(
              graphRef.current?.getDefaultParent(),
              iconId,
              '',
              x,
              y,
              80,
              80,
              style
            ) : graphRef.current?.insertVertex(
              graphRef.current?.getDefaultParent(),
              iconId,
              '',
              x,
              y,
              100,
              arrowWidth,
              // arrowHeight,
              style
            );

            // 更新节点列表
            setNodes((prevNodes) => [...prevNodes, vertex]);
          } finally {
            graphRef.current?.model?.endUpdate();
          }

          // 设置画布高度为固定值
          const fixedCanvasHeightDefault = 800; // 默认的固定高度
          graphContainerRef.current.style.height = `${fixedCanvasHeightDefault}px`;
        },
      }
    }
  }, [ref]);

  const onShowSaveModal = () => {
    setShowSaveModal(true)
  }

  const handleSave = () => {
    const encoder = new mxgraph.mxCodec();
    const node = encoder.encode(graphRef.current.getModel());
    const xml = mxgraph.mxUtils.getXml(node);

    // 保存到本地存储，你也可以将 xml 发送到服务器进行存储
    localStorage.setItem('savedGraphData', xml);
    console.log('保存成功', xml);
    const jsonXml = convertXmlToJson(xml)
    console.log("JsonXml", jsonXml)
  };

  const handleLoad = () => {
    const savedGraphData = localStorage.getItem('savedGraphData');
    if (savedGraphData && graphRef.current) {
      graphRef.current.getModel().beginUpdate();
      try {
        // 清空当前图形
        graphRef.current.removeCells(
          graphRef.current.getChildVertices(
            graphRef.current.getDefaultParent()
          ),
          true
        );

        // 解析并加载保存的图形数据
        const doc = mx.mxUtils.parseXml(savedGraphData);
        const codec = new mx.mxCodec(doc);
        codec.decode(doc.documentElement, graphRef.current.getModel());
      } finally {
        graphRef.current.getModel().endUpdate();
      }

      console.log('Graph Data loaded from localStorage');
    } else {
      console.log('No saved graph data found in localStorage');
    }
  };

  const handleInsertLink = () => {
    // 处理插入链接的逻辑
  };

  function convertXmlToJson(xmlString) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
    return xmlToJson(xmlDoc);
  }
  
  const xmlToJson = (xml) => {
    const obj = {};
  
    if (xml.nodeType === 1) {
      if (xml.attributes.length > 0) {
        obj['@attributes'] = {};
        for (let j = 0; j < xml.attributes.length; j++) {
          const attribute = xml.attributes.item(j);
          obj['@attributes'][attribute.nodeName] = attribute.nodeValue;
        }
      }
    } else if (xml.nodeType === 3) {
      obj = xml.nodeValue.trim();
    }
  
    if (xml.hasChildNodes()) {
      for (let i = 0; i < xml.childNodes.length; i++) {
        const item = xml.childNodes.item(i);
        const nodeName = item.nodeName;
  
        if (typeof obj[nodeName] === 'undefined') {
          obj[nodeName] = xmlToJson(item);
        } else {
          if (typeof obj[nodeName].push === 'undefined') {
            const old = obj[nodeName];
            obj[nodeName] = [];
            obj[nodeName].push(old);
          }
          obj[nodeName].push(xmlToJson(item));
        }
      }
    }
  
    return obj;
  }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <ToolBar
          onSave={handleSave}
          onLoad={handleLoad}
          onInsertLink={handleInsertLink}
        />
        <Button type='text' onClick={onShowSaveModal}>保存</Button>
      </div>
      <div
        ref={graphContainerRef}
        style={{ height: '100%', position: 'relative' }}
      />
      <SaveCanvasModal visible={showSaveModal} onCancel={() => setShowSaveModal(false)} onSave={handleSave} />
    </div>
  );
});

export default GraphEditor;