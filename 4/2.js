const { draw, boards } = require('./input')

const winningBoards = []

runDraw(0)

function runDraw(i) {
  const n = draw[i]

  loopBoards(n)

  if (i + 1 < draw.length) {
    runDraw(i + 1)
  }
}

function loopBoards(n) {
  boards.forEach((board, i) => {
    board.forEach((row) => {
      markBoard(board, row, n, i)
    })
  })
}

function markBoard(board, row, n, boardNo) {
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
  const boardComplete = completeRow || completeColumn
  const boardAlreadyWon = winningBoards.indexOf(boardNo) > -1

  if (boardComplete && !boardAlreadyWon) {
    winningBoards.push(boardNo)
    console.log(countBoard(board, n))
    console.log('---')
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
