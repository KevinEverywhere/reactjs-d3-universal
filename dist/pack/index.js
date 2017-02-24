'use strict';Object.defineProperty(exports,'__esModule',{value:!0});exports.default=Pack;var _pack=require('./pack.js'),_hierarchy=require('./hierarchy.js'),_nodesarray=require('./nodesarray.js'),_labelsarray=require('./labelsarray'),_react=require('react'),_react2=_interopRequireDefault(_react);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function Pack(_ref){var a=_ref.chartWidth,b=_ref.colorScale,c=_ref.data,d=_ref.labels;console.dir(c);var e=(0,_hierarchy.hierarchy)({data:c}),//focus = root,
f=(0,_pack.pack)({chartWidth:a})(e).descendants(),g=(0,_nodesarray.nodesArray)({nodes:f,colorScale:b}),h=(0,_labelsarray.labelsArray)({nodes:f,labels:d,root:e});return _react2.default.createElement('g',null,g,h)}