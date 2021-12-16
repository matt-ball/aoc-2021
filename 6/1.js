let input = require('./input')
let days = 256
let buckets = new Array(9).fill(0)

input.forEach((fish) => {
  buckets[fish]++
})

for (let i = 0; i < days; i++) {
  const numBirthed = buckets.shift()

  buckets.push(numBirthed)
  buckets[6] += numBirthed
}

const total = buckets.reduce((p, c) => {
  return p + c
}, 0)

console.log(total)
