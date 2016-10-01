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

/**
 * Returns the property name and prototype to validate
 * @param {Object} node - node to examine
 * @return {Object} - methodName and proto
 */
const getMethodNameAndPrototype = node => {
  let methodName, prototype

  if (node.object.type === 'NewExpression') {
    prototype = node.object.callee.name
  } else if (node.object.type === 'Literal') {
    prototype = getType(node.object)
  } else if (node.object.type === 'BinaryExpression') {
    prototype = binaryExpressionProduces(node.object)
  } else if (node.object.type === 'Identifier' && node.property.name === 'prototype' && node.parent.property) {
    prototype = node.object.name
    methodName = node.parent.property.name
  } else {
    prototype = node.object.type.replace('Expression', '')
  }

  methodName = methodName || node.property.name || node.property.value

  return {methodName, prototype}
}

module.exports = context => ({
  MemberExpression(node) {
    /* eslint complexity: [2, 9] */
    const isArgToParent = node.parent.arguments && node.parent.arguments.indexOf(node) > -1
    const type = isArgToParent ? node.type : node.parent.type

    const {methodName, prototype} = getMethodNameAndPrototype(node)

    if (typeof methodName !== 'string' || typeof prototype !== 'string' || !isJsType(prototype)) {
      return
    }

    const isExpression = type === 'ExpressionStatement' || type === 'MemberExpression'
    const unknownGetterSetterOrPrototypeExpressed = isExpression &&
      !isGetSetProp(prototype, methodName) && !isProtoProp(prototype, methodName)

    const isFunctionCall = type === 'CallExpression'
    const getterSetterCalledAsFunction = isFunctionCall && isGetSetProp(prototype, methodName)
    const unknownPrototypeCalledAsFunction = isFunctionCall && !isProtoProp(prototype, methodName)

    if (unknownGetterSetterOrPrototypeExpressed || getterSetterCalledAsFunction || unknownPrototypeCalledAsFunction) {
      context.report(node, 'Avoid using extended native objects')
    }
  }
})
