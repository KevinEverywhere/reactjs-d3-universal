'use strict';Object.defineProperty(exports,'__esModule',{value:!0});exports.generateArcs=exports.generateArcPath=exports.generateLabelArc=void 0;var _d=require('d3'),d3=_interopRequireWildcard(_d);function _interopRequireWildcard(obj){if(obj&&obj.__esModule)return obj;var newObj={};if(null!=obj)for(var key in obj)Object.prototype.hasOwnProperty.call(obj,key)&&(newObj[key]=obj[key]);return newObj.default=obj,newObj}var generateLabelArc=exports.generateLabelArc=function(_ref){var _ref$chartHeight=_ref.chartHeight,c=void 0===_ref$chartHeight?200:_ref$chartHeight,_ref$chartWidth=_ref.chartWidth,e=void 0===_ref$chartWidth?200:_ref$chartWidth,a=_ref.endAngle,b=_ref.startAngle;return(isNaN(a)||isNaN(b))&&appFuncs.logError({data:[a,b],loc:__filename,msg:'endAngle and startAngle must be valid variables in arcs.generateLabelArc(), attempting to return labelArc anyway'}),d3.arc().endAngle(a).innerRadius(Math.min(c,e))// eslintignore bigger number = smaller donut
.outerRadius(Math.min(c,e))// eslintignore bigger number = smaller pie
.startAngle(b)};// path generator
var generateArcPath=exports.generateArcPath=function(_ref2){var _ref2$chartHeight=_ref2.chartHeight,c=void 0===_ref2$chartHeight?200:_ref2$chartHeight,_ref2$chartWidth=_ref2.chartWidth,e=void 0===_ref2$chartWidth?200:_ref2$chartWidth,_ref2$cornerRadius=_ref2.cornerRadius,f=void 0===_ref2$cornerRadius?1:_ref2$cornerRadius,a=_ref2.endAngle,_ref2$padAngle=_ref2.padAngle,g=void 0===_ref2$padAngle?0.03:_ref2$padAngle,b=_ref2.startAngle;return(isNaN(b)||isNaN(a))&&appFuncs.logError({data:[a,b],loc:__filename,msg:'endAngle and startAngle must be valid variables in arcs.generateArcPath(), attempting to return arcPath anyway'}),d3.arc().cornerRadius(f).endAngle(a).innerRadius(Math.min(e,c)/8)// eslintignore bigger number = smaller donut
.outerRadius(Math.min(e,c)/1.9)// eslintignore bigger number = smaller pie
.padAngle(g).startAngle(b)};/**
 * Returns an array of objects with data for each slice
 * @method generateArcs
 * @param  {[type]}     [sort=null] [description]
 * @return {[type]}     [description]
 */var generateArcs=exports.generateArcs=function(_ref3){var a=_ref3.data,_ref3$sort=_ref3.sort,b=void 0===_ref3$sort?null:_ref3$sort,_ref3$yValue=_ref3.yValue,c=void 0===_ref3$yValue?'':_ref3$yValue;return(appFuncs._.isEmpty(a)||!c)&&appFuncs.logError({data:[a,c],loc:__filename,msg:'data and yValue must be valid variables in arcs.generateArcs(), attempting to return arcs anyway'}),d3.pie().sort(b).value(function(e){return e[c]})(a)};