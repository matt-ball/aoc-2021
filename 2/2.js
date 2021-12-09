const input = require('./input')

const operators = {
  up: '-',
  down: '+'
}

const result = input.reduce((position, nextMove) => {
  let { horizontal, depth, aim } = position
  const instruction = Object.keys(nextMove)[0]
  const change = nextMove[instruction]

  if (instruction !== 'forward') {
    aim = eval([aim, [operators[instruction]], change].join(''))
  } else {
    horizontal = horizontal + change
    depth = depth + (aim * change)
  }

  return { horizontal, depth, aim }

}, {
  horizontal: 0,
  depth: 0,
  aim: 0
})

console.log(result.horizontal * result.depth)
