const input = require('./input')
const map = Array.from(Array(999), () => new Array(999))

input.forEach((instruction) => {
  const orig = instruction[0].split(',')
  const dest = instruction[1].split(',')

  const coords = {
    start: {
      x: Number(orig[0]),
      y: Number(orig[1])
    },
    end: {
      x: Number(dest[0]),
      y: Number(dest[1])
    }
  }

  traceRoute(coords)
})

const total = map.reduce((prev, current) => {
  const subtotal = current.reduce((p, c) => {
    if (c > 1) {
      return p + 1
    }

    return p
  }, 0)

  return prev + subtotal
}, 0)

console.log(total)

function traceRoute(coords) {
  let anchorAxis
  let startX = coords.start.x
  let endX = coords.end.x
  let startY = coords.start.y
  let endY = coords.end.y

  const diaganols = {
    dscPositive: startX < endX && startY < endY,
    ascPositive: startX > endX && startY > endY,
    dscNegative: startX > endX && startY < endY,
    ascNegative: startX < endX && startY > endY
  }

  if (diaganols.ascPositive) {
    startX = coords.end.x
    endX = coords.start.x
    startY = coords.end.y
    endY = coords.start.y
  }

  if (startX === endX) anchorAxis = 'x'
  if (startY === endY) anchorAxis = 'y'

  if (anchorAxis === 'y') {
    if (startX > endX) {
      startX = coords.end.x
      endX = coords.start.x
    }

    for (let i = startX; i <= endX; i++) {
      map[i][startY] = map[i][startY] || 0
      map[i][startY] = map[i][startY] + 1
    }
  } else if (anchorAxis === 'x') {
    if (startY > endY) {
      startY = coords.end.y
      endY = coords.start.y
    }

    for (let i = startY; i <= endY; i++) {
      map[startX][i] = map[startX][i] || 0
      map[startX][i] = map[startX][i] + 1
    }
  } else {
    let whilst = 'i <= endX'
    let iop = 'i++'
    let jop = 'j++'

    if (diaganols.dscNegative) {
      iop = 'i--'
      whilst = 'j <= endY'
    }
    
    if (diaganols.ascNegative) {
      jop = 'j--'
    }

    for (let i = startX, j = startY; eval(whilst); eval(iop), eval(jop)) {
      map[i][j] = map[i][j] || 0
      map[i][j] = map[i][j] + 1
    }
  }
}
