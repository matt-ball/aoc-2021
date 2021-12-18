const input = require('./input')

let total = 0
const display = {}
const uniqueNumberMap = {
  2: 1,
  4: 4,
  3: 7,
  7: 8
}

input.forEach((sequence) => {
  const patterns = sequence[0]
  const output = sequence[1]
  const digits = new Array(10)
  const zeroSixNine = []
  const twoThreeFive = []

  patterns.forEach((pattern) => {
    let number
    const length = pattern.length
    const isUniqueNo = /2|4|3|7/.test(length)
    const isZeroSixNine = length === 6
    const isTwoThreeFive = length === 5

    if (isUniqueNo) {
      number = uniqueNumberMap[length]
      digits[number] = pattern.split('')
    }

    if (isZeroSixNine) {
      zeroSixNine.push(pattern)
    }

    if (isTwoThreeFive) {
      twoThreeFive.push(pattern)
    }
  })

  // 0, 6, 9 have 6

  // determine A
  const one = digits[1]
  const seven = digits[7]
  display['a'] = seven.filter((x) => !one.includes(x))[0]

  // determine C + F
  const cf = seven.filter((x) => one.includes(x))
  const eight = digits[8]
  const x = eight.filter((x) => !zeroSixNine[0].split('').includes(x))[0]
  const y = eight.filter((x) => !zeroSixNine[1].split('').includes(x))[0]
  const z = eight.filter((x) => !zeroSixNine[2].split('').includes(x))[0]
  const indexX = cf.indexOf(x)
  const indexY = cf.indexOf(y)
  const indexZ = cf.indexOf(z)

  if (indexX > -1) {
    digits[6] = zeroSixNine[0].split('')
    zeroSixNine.splice(0, 1)
    display['c'] = x
    display['f'] = cf[Number(!indexX)]
  }
  if (indexY > -1) {
    digits[6] = zeroSixNine[1].split('')
    zeroSixNine.splice(1, 1)
    display['c'] = y
    display['f'] = cf[Number(!indexY)]
  }
  if (indexZ > -1) {
    digits[6] = zeroSixNine[2].split('')
    zeroSixNine.splice(2, 1)
    display['c'] = z
    display['f'] = cf[Number(!indexZ)]
  }

  // determine D - zero or nine at this point
  const four = digits[4]
  const fourReduced = four.filter((x) => !cf.includes(x))
  const u = eight.filter((x) => !zeroSixNine[0].split('').includes(x))[0]
  const v = eight.filter((x) => !zeroSixNine[1].split('').includes(x))[0]
  const indexU = fourReduced.indexOf(u)
  const indexV = fourReduced.indexOf(v)
  
  if (indexU > -1) {
    digits[0] = zeroSixNine[0].split('')
    digits[9] = zeroSixNine[1].split('')
    display['d'] = u
    display['b'] = cf[Number(!indexU)]
  }
  if (indexV > -1) {
    digits[0] = zeroSixNine[1].split('')
    digits[9] = zeroSixNine[0].split('')
    display['d'] = u
    display['b'] = cf[Number(!indexV)]
  }

  // 2, 3, 5 to go
  const l = twoThreeFive[0].split('').filter((x) => cf.includes(x))
  const m = twoThreeFive[1].split('').filter((x) => cf.includes(x))
  const n = twoThreeFive[2].split('').filter((x) => cf.includes(x))

  if (l.length === 2) {
    digits[3] = twoThreeFive[0].split('')
    twoThreeFive.splice(0, 1)
  }
  if (m.length === 2) {
    digits[3] = twoThreeFive[1].split('')
    twoThreeFive.splice(1, 1)
  }
  if (n.length === 2) {
    digits[3] = twoThreeFive[2].split('')
    twoThreeFive.splice(2, 1)
  }

  // 2, 5 to go
  const o = twoThreeFive[0].indexOf(display.c) > -1

  if (o) {
    digits[2] = twoThreeFive[0].split('')
    digits[5] = twoThreeFive[1].split('')
  } else {
    digits[5] = twoThreeFive[0].split('')
    digits[2] = twoThreeFive[1].split('')
  }

  const thisNumber = output.map((num, i) => {
    let decoded
    const numSplit = num.split('')

    digits.forEach((digit, i) => {
      const bigArr = digit.length >= numSplit.length ? digit : numSplit
      const smallArr = digit.length < numSplit.length ? digit : numSplit

      const isMatch = bigArr.every((d) => {
        return smallArr.indexOf(d) > -1
      })

      if (isMatch) {
        decoded = i
      }
    })
    
    return decoded
  })
  
  console.log(thisNumber.join(''))
  total = total + Number(thisNumber.join(''))
})

console.log(total)
