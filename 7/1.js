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
  if (num1 > num2) {
    return num1 - num2
  } else {
    return num2 - num1
  }
}
