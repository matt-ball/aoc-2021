const input = require('./input')

const lowest = Math.min(...input)
const highest = Math.max(...input)
const fuelRecord = []

for (let i = lowest; i <= highest; i++) {
  let fuelSpent = 0

  input.forEach((crab) => {
    fuelSpent = fuelSpent + diff(crab, i)
  })

  fuelRecord.push(fuelSpent)  
}

console.log((Math.min(...fuelRecord)))

function diff(num1, num2) {
  let addition = 1
  let diff = 0

  if (num1 > num2) {
    while (num1 !== num2) {
      diff = diff + addition
      num1--
      addition++
    }
    return diff
  } else {
    while (num1 !== num2) {
      diff = diff + addition
      num2--
      addition++
    }

    return diff
  }
}
