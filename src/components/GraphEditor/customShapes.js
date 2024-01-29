"use strict";
import mx from 'mxgraph';

console.log('customShapes.js is loaded');

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

// 导出自定义形状
export { 
  CustomActorShape,
  CustomRectangleShape,
  CustomCircleShape,
  CustomSquareShape,
  CustomDiamondShape,
  CustomTrapzoidShape,
  CustomDirectArrowShape,
  CustomBidirectArrowShape,
  CustomLineShape
};