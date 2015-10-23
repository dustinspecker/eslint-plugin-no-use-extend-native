'use strict';
var protoProps = require('proto-props');

// add missing methods to Error.prototype
// https://nodejs.org/api/errors.html#errors_class_error
protoProps.Error.push('captureStackTrace', 'stack', 'stackTraceLimit');

/**
 * Return type of value of left or right
 * @param {Object} o - left or right of node.object
 * @return {String} - type of o
 */
function getType(o) {
  var type = typeof o.value;

  if (o.regex) {
    return 'RegExp';
  }

  return type.charAt(0).toUpperCase() + type.slice(1);
}

/**
  * Returns type of binary expression result
  * @param {Object} o - node's object with a BinaryExpression type
  * @return {String} - type of value produced
  */
function binaryExpressionProduces(o) {
  var leftType = o.left.type === 'BinaryExpression' ? binaryExpressionProduces(o.left) : getType(o.left)
    , rightType = o.right.type === 'BinaryExpression' ? binaryExpressionProduces(o.right) : getType(o.right);

  if (leftType === 'String' || rightType === 'String' || leftType === rightType && leftType === 'RegExp') {
    return 'String';
  }

  if (leftType === rightType) {
    return leftType;
  }

  return 'Unknown';
}

module.exports = function (context) {
  return {
    MemberExpression: function (node) {
      var methodName, proto;

      if (node.object.type === 'NewExpression') {
        proto = node.object.callee.name;
      } else if (node.object.type === 'Literal') {
        proto = getType(node.object);
      } else if (node.object.type === 'BinaryExpression') {
        proto = binaryExpressionProduces(node.object);
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
