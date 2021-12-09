const input = require('./input')

const operators = {
  up: '-',
  down: '+'
}

const result = input.reduce((position, nextMove) => {
  let { horizontal, depth } = position
  const instruction = Object.keys(nextMove)[0]
  const change = nextMove[instruction]

  if (instruction !== 'forward') {
    depth = eval([depth, [operators[instruction]], change].join(''))
  } else {
    horizontal = horizontal + change
  }

  return { horizontal, depth }

}, {
  horizontal: 0,
  depth: 0
})

console.log(result.horizontal * result.depth)
