const input = require('./input')
const map = Array.from(Array(999), () => new Array(999))

input.forEach((instruction) => {
  const orig = instruction[0].split(',')
  const dest = instruction[1].split(',')

  const coords = {
    start: {
      x: orig[0],
      y: orig[1]
    },
    end: {
      x: dest[0],
      y: dest[1]
    }
  }

  const xMatch = coords.start.x === coords.end.x
  const yMatch = coords.start.y === coords.end.y

  if (xMatch) {
    traceRoute(coords, 'x', 'y')
  }

  if (yMatch) {
    traceRoute(coords, 'y', 'x')
  }
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

function traceRoute(coords, anchorAxis, movingAxis) {
  const anchor = coords.start[anchorAxis]
  const s = Number(coords.start[movingAxis])
  const e = Number(coords.end[movingAxis])
  const start = Math.min(s, e)
  const end = Math.max(s, e)

  if (anchorAxis === 'y') {
    for (let i = start; i <= end; i++) {
      map[i][anchor] = map[i][anchor] || 0
      map[i][anchor] = map[i][anchor] + 1
    }
  } else {
    for (let i = start; i <= end; i++) {
      map[anchor][i] = map[anchor][i] || 0
      map[anchor][i] = map[anchor][i] + 1
    }
  }
}
