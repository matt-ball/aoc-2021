const input = require('./input')

const result = input.reduce((previous, currentDepth, i) => {
  previous.depths.push(currentDepth)
  
  let n = i + 1
  let increases = previous.increases
  let depths = previous.depths
  let average = depths.reduce((p, c) => p + c) / 3

  if (n < 3) {
    return { increases, depths, average: 999 }
  }

  if (depths.length === 3) {
    if (average > previous.average) {
      increases++
    }

    depths.shift()

    return { increases, depths, average }
  }  
}, {
  increases: 0,
  depths: [],
  average: 999
})

console.log(result.increases)
