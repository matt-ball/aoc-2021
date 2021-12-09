const input = require('./input')

const result = input.reduce((previous, depth) => {
  let increases = previous.increases
  
  if (depth > previous.depth) {
    increases++
  }
  
  return { increases, depth }
}, {
  increases: 0,
  depth: 999
})

console.log(result.increases)
