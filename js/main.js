'use strict'

const MINE = '💥'
const MARK = '🚩'
const EMPTY = ' '


// Modle:
var gBoard


const cell = {
    minesAroundCount: 0,
    isShown: false,
    isMine: false,
    isMarked: true,
}

const gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}
const gLevel = {
    size: 4,
    mines: 2
}


function onInit() {
    gBoard = buildBoard()
    renderBoard(gBoard)
    gGame.isOn = true
}

function buildBoard() {
    const board = []

    for (var i = 0; i < gLevel.size; i++) {
        board[i] = []
        for (var j = 0; j < gLevel.size; j++) {
            board[i][j] = ''

        }
    }
    board[1][3] = MINE
    board[2][1] = MARK
    board[1][1] = EMPTY

    // console.log(board)
    return board
}

function renderBoard(gBoard) {
    var strHTML = ''

    for (var i = 0; i < gBoard.length; i++) {

        strHTML += '<tr>'
        for (var j = 0; j < gBoard.length; j++) {
            const cell = gBoard[i][j]
            const className = `num -${i}-${j}`
            strHTML += `<td class="${className}">${cell}</td>`

        }
        strHTML += '</tr>'

    }
    const elBoard = document.querySelector('.sweeper-board')
    elBoard.innerHTML = strHTML

}

function onCellClicked(board, i, j) {
}
function addMinesCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            board[i][j].minesAroundCount = countMinesAround(board, i, j)
            if (board[i][j].minesAroundCount === 0) board[i][j].minesAroundCount = ''

        }
    }
}


function countMinesAround(board, rowIdx, colIdx) {
    var count = 0;
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (i === rowIdx && j === colIdx) continue
            if (j < 0 || j >= board[i].length) continue
            var currCell = board[i][j]
            if (currCell.isMine) count++

        }
    }

    // console.log(count)
    return count
}



// function onCellMarked(elcell) { }

// function checkGameOver() { }

// function expandShown(board, elcell, i, j) { }






