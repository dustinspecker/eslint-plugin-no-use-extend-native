'use strict'
import isGetSetProp from 'is-get-set-prop'
import isJsType from 'is-js-type'
import isProtoProp from 'is-proto-prop'

/**
 * Return type of value of left or right
 * @param {Object} o - left or right of node.object
 * @return {String} - type of o
 */
const getType = o => {
  const type = typeof o.value

  if (o.regex) {
    return 'RegExp'
  }

  return type.charAt(0).toUpperCase() + type.slice(1)
}

/**
  * Returns type of binary expression result
  * @param {Object} o - node's object with a BinaryExpression type
  * @return {String} - type of value produced
  */
const binaryExpressionProduces = o => {
  const leftType = o.left.type === 'BinaryExpression' ? binaryExpressionProduces(o.left) : getType(o.left)
    , rightType = o.right.type === 'BinaryExpression' ? binaryExpressionProduces(o.right) : getType(o.right)

  if (leftType === 'String' || rightType === 'String' || leftType === rightType && leftType === 'RegExp') {
    return 'String'
  }

  if (leftType === rightType) {
    return leftType
  }

  return 'Unknown'
}

module.exports = context => ({
  MemberExpression(node) {
    /* eslint complexity: [2, 14] */
    let methodName, proto

    if (node.object.type === 'NewExpression') {
      proto = node.object.callee.name
    } else if (node.object.type === 'Literal') {
      proto = getType(node.object)
    } else if (node.object.type === 'BinaryExpression') {
      proto = binaryExpressionProduces(node.object)
    } else if (node.object.type === 'Identifier' && node.property.name === 'prototype' && node.parent.property) {
      proto = node.object.name
      methodName = node.parent.property.name
    } else {
      proto = node.object.type.replace('Expression', '')
    }

    methodName = methodName || node.property.name || node.property.value
    const type = node.parent.type

    if (typeof methodName !== 'string' || typeof proto !== 'string' || !isJsType(proto)) {
      return
    }

    const isExpression = type === 'ExpressionStatement' || type === 'MemberExpression'
    const unknownGetterSetterOrProtoExpressed = isExpression &&
      !isGetSetProp(proto, methodName) && !isProtoProp(proto, methodName)

    const isFunctionCall = type === 'CallExpression'
    const getterSetterCalledAsFunction = isFunctionCall && isGetSetProp(proto, methodName)
    const unknownProtoCalledAsFunction = isFunctionCall && !isProtoProp(proto, methodName)

    if (unknownGetterSetterOrProtoExpressed || getterSetterCalledAsFunction || unknownProtoCalledAsFunction) {
      context.report(node, 'Avoid using extended native objects')
    }
  }
})
