'use strict';
var protoProps = require('proto-props');

module.exports = function (context) {
  return {
    MemberExpression: function (node) {
      var methodName, proto;

      if (node.object.type === 'NewExpression') {
        proto = node.object.callee.name;
      } else if (node.object.type === 'Literal' && node.object.regex) {
        proto = 'RegExp';
      } else if (node.object.type === 'Literal' && !node.object.regex) {
        proto = 'String';
      } else {
        proto = node.object.type.replace('Expression', '');
      }

      methodName = node.property.name;

      if (protoProps[proto] && protoProps[proto].indexOf(methodName) < 0) {
        context.report(node, 'Avoid using extended native objects');
      }
    }
  };
};
