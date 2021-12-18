const input = require('./input')

let count = 0

input.forEach((sequence) => {
  const output = sequence[1]

  output.forEach((digit) => {
    const segments = digit.length
    const uniqueNumber = segments === 2 || segments === 4 || segments === 3 || segments === 7

    if (uniqueNumber) {
      count++
    }
  })
})

console.log(count)
