'use strict'
import isGetSetProp from 'is-get-set-prop'
import isJsType from 'is-js-type'
import isObjProp from 'is-obj-prop'
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
  const rightType = o.right.type === 'BinaryExpression' ? binaryExpressionProduces(o.right) : getType(o.right)

  const isRegExp = leftType === rightType && leftType === 'RegExp'
  if (leftType === 'String' || rightType === 'String' || isRegExp) {
    return 'String'
  }

  if (leftType === rightType) {
    return leftType
  }

  return 'Unknown'
}

/**
 * Returns the JS type and property name
 * @param {Object} node - node to examine
 * @return {Object} - jsType and propertyName
 */
const getJsTypeAndPropertyName = node => {
  let propertyName, jsType

  if (node.object.type === 'NewExpression') {
    jsType = node.object.callee.name
  } else if (node.object.type === 'Literal') {
    jsType = getType(node.object)
  } else if (node.object.type === 'BinaryExpression') {
    jsType = binaryExpressionProduces(node.object)
  } else if (node.object.type === 'Identifier' && node.property.name === 'prototype' && node.parent.property) {
    jsType = node.object.name
    propertyName = node.parent.property.name
  } else if (node.property.type === 'Identifier' && node.object.type === 'Identifier') {
    jsType = node.object.name
  } else {
    jsType = node.object.type.replace('Expression', '')
  }

  propertyName = propertyName || node.property.name || node.property.value

  return {propertyName, jsType}
}

/**
 * Determine if a jsType's usage of propertyName is valid
 * @param {String} jsType - the JS type to validate
 * @param {String} propertyName - the property name to validate usage of on jsType
 * @param {String} usageType - how propertyName is being used
 * @return {Boolean} - is the usage invalid?
 */
const isInvalid = (jsType, propertyName, usageType) => {
  if (typeof propertyName !== 'string' || typeof jsType !== 'string' || !isJsType(jsType)) {
    return false
  }

  const isExpression = usageType === 'ExpressionStatement' || usageType === 'MemberExpression'
  const unknownGetterSetterOrjsTypeExpressed = isExpression &&
    !isGetSetProp(jsType, propertyName) && !isProtoProp(jsType, propertyName) && !isObjProp(jsType, propertyName)

  const isFunctionCall = usageType === 'CallExpression'
  const getterSetterCalledAsFunction = isFunctionCall && isGetSetProp(jsType, propertyName)
  const unknownjsTypeCalledAsFunction = isFunctionCall && !isProtoProp(jsType, propertyName) &&
    !isObjProp(jsType, propertyName)

  return unknownGetterSetterOrjsTypeExpressed || getterSetterCalledAsFunction || unknownjsTypeCalledAsFunction
}

module.exports = context => ({
  MemberExpression(node) {
    /* eslint complexity: [2, 9] */
    const isArgToParent = node.parent.arguments && node.parent.arguments.indexOf(node) > -1
    const usageType = isArgToParent ? node.type : node.parent.type

    const {propertyName, jsType} = getJsTypeAndPropertyName(node)

    if (isInvalid(jsType, propertyName, usageType) && isInvalid('Function', propertyName, usageType)) {
      context.report(node, 'Avoid using extended native objects')
    }
  }
})
