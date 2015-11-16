'use strict';
var isGetSetProp = require('is-get-set-prop')
  , isJsType = require('is-js-type')
  , isProtoProp = require('is-proto-prop');

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
      var methodName, proto, type;

      if (node.object.type === 'NewExpression') {
        proto = node.object.callee.name;
      } else if (node.object.type === 'Literal') {
        proto = getType(node.object);
      } else if (node.object.type === 'BinaryExpression') {
        proto = binaryExpressionProduces(node.object);
      } else if (node.object.type === 'Identifier' && node.property.name === 'prototype' && node.parent.property) {
        proto = node.object.name;
        methodName = node.parent.property.name;
      } else {
        proto = node.object.type.replace('Expression', '');
      }

      methodName = methodName || node.property.name || node.property.value;
      type = node.parent.type;

      if (!isJsType(proto)) {
        return;
      }

      if (type === 'ExpressionStatement' && !isGetSetProp(proto, methodName) && !isProtoProp(proto, methodName) ||
        type === 'CallExpression' && (isGetSetProp(proto, methodName) || !isProtoProp(proto, methodName)) ||
        type === 'MemberExpression' && !isProtoProp(proto, methodName)) {
        context.report(node, 'Avoid using extended native objects');
      }
    }
  };
};
