const input = require('./input')

const results = countBits(input)

const oxygen = results.reduce((prev, row, i) => {
  return checkColumn(prev, i, 'oxygen')
}, input)[0]

const co2 = results.reduce((prev, row, i) => {
  return checkColumn(prev, i, 'co2')
}, input)[0]

console.log(parseInt(oxygen, 2) * parseInt(co2, 2))

function countBits (inp) {
  return inp.reduce((totals, row) => {
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
}

function checkColumn (inp, i, checkType) {
  if (inp.length === 1) {
    return inp
  }

  return inp.reduce((prev, row) => {
    const bit = row.charAt(i)
    const latestResults = countBits(inp)
    const moreOnes = latestResults[i][1] >= latestResults[i][0]

    if (checkType === 'oxygen') {
      if (moreOnes && bit === '1') {
        prev.push(row)
      } else if (!moreOnes && bit === '0') {
        prev.push(row)
      }
    } else {
      if (moreOnes && bit === '0') {
        prev.push(row)
      } else if (!moreOnes && bit === '1') {
        prev.push(row)
      }
    }

    return prev
  }, [])
}
