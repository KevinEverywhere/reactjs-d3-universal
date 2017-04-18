'use strict';Object.defineProperty(exports,'__esModule',{value:!0});exports.getYAxisLabel=exports.getXAxisLabel=exports.getXAxis=exports.getYAxis=void 0;var _slicedToArray=function(){function sliceIterator(arr,i){var _arr=[],_n=!0,_d=!1,_e=void 0;try{for(var _s,_i=arr[Symbol.iterator]();!(_n=(_s=_i.next()).done)&&(_arr.push(_s.value),!(i&&_arr.length===i));_n=!0);}catch(err){_d=!0,_e=err}finally{try{!_n&&_i['return']&&_i['return']()}finally{if(_d)throw _e}}return _arr}return function(arr,i){if(Array.isArray(arr))return arr;if(Symbol.iterator in Object(arr))return sliceIterator(arr,i);throw new TypeError('Invalid attempt to destructure non-iterable instance')}}(),_typeof='function'==typeof Symbol&&'symbol'==typeof Symbol.iterator?function(obj){return typeof obj}:function(obj){return obj&&'function'==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?'symbol':typeof obj};// import * as label from './labels.js';
var _text=require('../svg/text.js'),_text2=_interopRequireDefault(_text),_d2=require('d3'),d3=_interopRequireWildcard(_d2),_react=require('react'),_react2=_interopRequireDefault(_react),_time=require('./time.js'),time=_interopRequireWildcard(_time);function _interopRequireWildcard(obj){if(obj&&obj.__esModule)return obj;var newObj={};if(null!=obj)for(var key in obj)Object.prototype.hasOwnProperty.call(obj,key)&&(newObj[key]=obj[key]);return newObj.default=obj,newObj}function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++)arr2[i]=arr[i];return arr2}return Array.from(arr)}/*
 * Create/Update Y Axis in the DOM
 */var getYAxis=exports.getYAxis=function(_ref){var _ref$id=_ref.id,a=void 0===_ref$id?'':_ref$id,_ref$thisYScale=_ref.thisYScale,b=void 0===_ref$thisYScale?null:_ref$thisYScale;return a&&b?'undefined'==typeof document?null:d3// eslintignore let d3 handle the axis instead of building ourselves
.select(document.getElementById(''+a)).select('.y.axis').call(d3.axisLeft(b)).selectAll('text').classed('axies text',!0):(appFuncs.logError({data:[a,b,'undefined'==typeof document?'undefined':_typeof(document)],loc:__filename,msg:'id and thisYScale must be valid variables in axes.getYAxis(), returning null'}),null);// dont create axis when rendering on server
};/*
 * Create/Update X Axis and insert it in DOM
 */var getXAxis=exports.getXAxis=function(_ref2){var _ref2$dx=_ref2.dx,a=void 0===_ref2$dx?'-.8em':_ref2$dx,_ref2$dy=_ref2.dy,b=void 0===_ref2$dy?'.15em':_ref2$dy,_ref2$id=_ref2.id,c=void 0===_ref2$id?'':_ref2$id,_ref2$textAnchor=_ref2.textAnchor,d=void 0===_ref2$textAnchor?'end':_ref2$textAnchor,_ref2$thisXScale=_ref2.thisXScale,e=void 0===_ref2$thisXScale?null:_ref2$thisXScale,_ref2$transform=_ref2.transform,f=void 0===_ref2$transform?'rotate(-65)':_ref2$transform,_ref2$xScaleTime=_ref2.xScaleTime;if(!c||!e)return appFuncs.logError({data:[c,e,'undefined'==typeof document?'undefined':_typeof(document)],loc:__filename,msg:'id and thisXScale must be valid variables in axes.getXAxis(), returning null'}),null;// dont create axis when rendering on server
if('undefined'==typeof document)return null;var _e$domain=e.domain(),_e$domain2=_slicedToArray(_e$domain,2),h=_e$domain2[0],i=_e$domain2[1],j=h.getTime(),k=i.getTime(),l=Math.abs(k-j),m=l/86400000,n=3600<m// 1985
?'%Y':360<m// Dec 1985
?'%b %Y':27<m// 12/12/85
?'%m/%d/%y':6<m// Friday, Dec 12
?'%a, %b %d'// 12:30AM Saturday
:'%I:%M%p %a',o=[].concat(_toConsumableArray(d3.range(j,k,l/8).map(function(q){return new Date(q)})),[i]),p=void 0!==_ref2$xScaleTime&&_ref2$xScaleTime?d3.axisBottom(e).tickValues(o).tickFormat(time.format({format:n})):d3.axisBottom(e);// create axis generate for xScale
return d3// eslintignore let d3 handle the axis instead of building ourselves
.select(document.getElementById(''+c)).select('.x.axis').call(p).selectAll('g.tick text').classed('axes text',!0).attr('dx',a).attr('dy',b).attr('transform',f).style('text-anchor',d)};/**
 * Positions label on x Axis
 * @method getXAxisLabel
 * @param  {String}      [xAxisLabel=''}] [description]
 * @return {Boolean}     [description]
 */var getXAxisLabel=exports.getXAxisLabel=function(_ref3){var _ref3$transform=_ref3.transform,a=void 0===_ref3$transform?'rotate(0)':_ref3$transform,_ref3$x=_ref3.x,b=void 0===_ref3$x?5:_ref3$x,_ref3$xAxisLabel=_ref3.xAxisLabel,c=void 0===_ref3$xAxisLabel?'':_ref3$xAxisLabel,_ref3$y=_ref3.y,d=void 0===_ref3$y?-5:_ref3$y;return c?_react2.default.createElement(_text2.default,{chartType:'axes',text:c,transform:a,x:b,y:d}):(appFuncs.logError({data:c,loc:__filename,msg:'id and thisYScale must be valid variables in axes.getYAxis(), returning null'}),null)};getXAxisLabel.propTypes={transform:_react2.default.PropTypes.string,x:_react2.default.PropTypes.number,xAxisLabel:_react2.default.PropTypes.string,y:_react2.default.PropTypes.number};/**
 * Positions label on y Axis
 * @method getXAxisLabel
 * @param  {String}      [xAxisLabel=''}] [description]
 * @return {Boolean}     [description]
 */var getYAxisLabel=exports.getYAxisLabel=function(_ref4){var _ref4$transform=_ref4.transform,a=void 0===_ref4$transform?'rotate(-90)':_ref4$transform,_ref4$x=_ref4.x,b=void 0===_ref4$x?5:_ref4$x,_ref4$y=_ref4.y,c=void 0===_ref4$y?-5:_ref4$y,_ref4$yAxisLabel=_ref4.yAxisLabel,d=void 0===_ref4$yAxisLabel?'':_ref4$yAxisLabel;return d?_react2.default.createElement(_text2.default,{chartType:'axes',text:d,transform:a,x:b,y:c}):(appFuncs.logError({data:[a,b,c,d],loc:__filename,msg:'yAxisLabel must be a valid variable in axes.getYAxisLabel(), returning empty string'}),'')};getYAxisLabel.propTypes={transform:_react2.default.PropTypes.string,x:_react2.default.PropTypes.oneOfType([_react2.default.PropTypes.number,_react2.default.PropTypes.string]),y:_react2.default.PropTypes.oneOfType([_react2.default.PropTypes.number,_react2.default.PropTypes.string]),yAxisLabel:_react2.default.PropTypes.string};