import React, { forwardRef, useEffect, useRef, useState } from 'react';
import mx from 'mxgraph';
import { useSelector } from 'react-redux';

const mxgraph = mx({
  mxBasePath: 'mxgraph',
  mxLoadResources: false,
  mxLoadStylesheets: false,
});

const COLORS = {
  grid: '#a1bbce',
};

const { mxUtils } = mxgraph;

// 自定义 "curve" 形状
mxgraph.mxShape.prototype.paintVertexShape = function(c, x, y, w, h) {
  c.begin();
  c.moveTo(x, y);
  c.lineTo(x + w, y);
  c.lineTo(x + w, y + h);
  c.lineTo(x, y + h);
  c.close();
  c.stroke();
};

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
  mxgraph.mxArrow.call(this, bounds, fill, stroke, strokewidth, null, null, null, null);
}

mxUtils.extend(CustomDirectArrowShape, mxgraph.mxArrow);

// 注册自定义形状
mxgraph.mxCellRenderer.registerShape('trapzoid', CustomTrapzoidShape);


// 注册自定义形状
mxgraph.mxCellRenderer.registerShape('diamond', CustomDiamondShape);


// 注册自定义形状
mxgraph.mxCellRenderer.registerShape('circle', CustomCircleShape);
mxgraph.mxCellRenderer.registerShape('square', CustomSquareShape);

// 注册自定义形状
mxgraph.mxCellRenderer.registerShape('actor', CustomActorShape);
mxgraph.mxCellRenderer.registerShape('rectangle', CustomRectangleShape);

const GraphEditor = forwardRef(({ showGrid }, ref) => {
  const graphContainerRef = useRef<any>(null);
  const graphRef = useRef(null);
  const [nodes, setNodes] = useState([]);
  const linkColor = useSelector((state) => state.graphEditor.linkColor);

  useEffect(() => {
    if (graphContainerRef.current) {
      const graph = new mxgraph.mxGraph(graphContainerRef.current);
      graph.gridSize = 10;
      graph.gridEnabled = true;
      graph.view.gridColor = COLORS.grid;
      graphRef.current = graph;

      // 重写 resizeVertex 方法
      mxgraph.mxGraph.prototype.resizeVertex = function (vertex, bounds, recurse) {
        console.log("222222")
        var geo = this.model.getGeometry(vertex);
        var isCircle = geo.style && geo.style.includes('shape=circle;');
        var isSquare = geo.style && geo.style.includes('shape=square;');
        
        if (isCircle || isSquare) {
          var maxSide = Math.max(bounds.width, bounds.height);
          bounds.width = maxSide;
          bounds.height = maxSide;
          geo.width = bounds.width;
          geo.height = bounds.height;
        }
        
        mxgraph.mxGraph.prototype.resizeVertex.apply(this, arguments);
      };

      graph.getCellStyle = function (cell) {
        const style = mxgraph.mxGraph.prototype.getCellStyle.apply(this, arguments);
        return style;
      };
    }
  }, [showGrid, graphRef.current]);

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
            case 'sequare':
              style = 'shape=sequare;resizable=1;';
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
              style = 'shape=direct-arrow;';
              break;
            case 'bidrect-arrow':
              style = 'shape=bidrect-arrow;';
              break;
            case 'bidirect-arrow-line':
              style = 'shape=bidirect-arrow-line;';
              break;
            case 'dashed-line':
              style = 'shape=dashed-line;';
              break;
            case 'dotted-line':
              style = 'shape=dotted-line;';
              break;
            case 'line':
              style = 'shape=line;';
              break;
            case 'curve':
              style = 'shape=curve;';
              break;
            case 'actor':
              style = 'shape=actor;';
              break;
            default:
              style = 'shape=rectangle;'; // 默认为矩形
              break;
          } 
        
          // 插入形状
          // @ts-ignore
          graphRef.current.model.beginUpdate();
          try {
            const vertex = graphRef.current?.insertVertex(
              graphRef.current?.getDefaultParent(),
              iconId,
              '',
              x,
              y,
              80,
              80,
              style
            );
        
            // 更新节点列表
            // @ts-ignore
            setNodes((prevNodes:any) => [...prevNodes, vertex]);
          } finally {
            // @ts-ignore
            graphRef.current?.model?.endUpdate();
          }
        },
      };
    }
  }, [ref]);

  return (
    <div
      ref={graphContainerRef}
      style={{ height: '100%', position: 'relative' }}
    />
  );
});

export default GraphEditor;
