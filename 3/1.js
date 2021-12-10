const input = require('./input')

let gamma = ''
let epsilon = ''

const results = input.reduce((totals, row) => {
  const digits = row.split('')

  digits.forEach((d, i) => {
    totals[i][d]++
  })

  return totals
}, [
  { 0: 0, 1: 0 },
  { 0: 0, 1: 0 },
  { 0: 0, 1: 0 },
  { 0: 0, 1: 0 },
  { 0: 0, 1: 0 },
  { 0: 0, 1: 0 },
  { 0: 0, 1: 0 },
  { 0: 0, 1: 0 },
  { 0: 0, 1: 0 },
  { 0: 0, 1: 0 },
  { 0: 0, 1: 0 },
  { 0: 0, 1: 0 }
])

results.forEach((column) => {
  if (column[0] > column[1]) {
    gamma = gamma.concat('0')
    epsilon = epsilon.concat('1')
  } else {
    gamma = gamma.concat('1')
    epsilon = epsilon.concat('0')
  }
})

gamma = parseInt(gamma, 2)
epsilon = parseInt(epsilon, 2)

console.log(gamma * epsilon)
