const { draw, boards } = require('./input')

runDraw(0)

function runDraw(i) {
  const n = draw[i]

  loopBoards(n)
  runDraw(i + 1)
}

function loopBoards(n) {
  boards.forEach((board) => {
    board.forEach((row) => {
      markBoard(board, row, n)
    })
  })
}

function markBoard(board, row, n) {
  let completeRow = true

  row.forEach((num, i) => {
    if (num === n) {
      row[i] = 'x'
    }

    if (row[i] !== 'x') {
      completeRow = false
    }
  })

  const completeColumn = checkColumns(board)

  if (completeRow || completeColumn) {
    console.log(countBoard(board, n))
    throw new Error('Winning board found!')
  }
}

function checkColumns(board) {
  for (let i = 0; i < board.length; i++) {
    const col = [board[0][i], board[1][i], board[2][i], board[3][i], board[4][i]].join('')

    if (col === 'xxxxx') {
      return true
    }
  }
}

function countBoard(board, n) {
  const boardTotal = board.reduce((prev, row, i) => {
    const rowTotal = row.reduce((o, n) => {
      if (n !== 'x') {
        return o +  n
      }

      return o
    }, 0)

    return prev + rowTotal
  }, 0)

  return boardTotal * n
}
