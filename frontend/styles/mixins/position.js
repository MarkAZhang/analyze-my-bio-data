const {includes} = require('lodash/fp')

const POSITIONS = ['absolute']
const DIRECTIONS = ['top', 'bottom', 'left', 'right']

const position = (rule, positionType, ...directions) => {
  if (!includes(positionType, POSITIONS)) throw rule.error(`Invalid position: ${positionType}.`)
  const style = {
    position: positionType,
  }
  DIRECTIONS.forEach(direction => {
    if (includes(direction, directions)) {
      style[direction] = 0
    }
  })
  return style
}

module.exports = position
