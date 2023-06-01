'use strict'

const MINE = '💥'
const MARK = '🚩'
const EMPTY = ' '


// Modle:
var gBoard
var mineNumber = 0
var gIsFirstClick = true
var gMines = 2

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}
var gLevel = {
    size: 4,
    mines: 2
}


function onInit() {
    gBoard = buildBoard()
    renderBoard(gBoard)
    gGame.isOn = true
    console.log(gBoard)
    setMinesCount(gBoard)
    getRandomMine(gBoard)
}

function buildBoard() {
    var board = []

    for (var i = 0; i < gLevel.size; i++) {
        board[i] = []
        for (var j = 0; j < gLevel.size; j++) {
            var cell = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: true,
            }
            board[i][j] = cell

        }
    }


    // board[2][1].isMine = true
    // board[1][3].isMine = true
    console.table(board)
    return board
}

function renderBoard(board) {
    var strHTML = ''
    var className = 'num'
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[i].length; j++) {
            var cell
            if (board[i][j].isMine) cell = MINE
            else cell = board[i][j].minesAroundCount
            strHTML += `<td data-i="${i}" data-j="${j}" class="cell ${className}"
            onclick="onCellClicked(this, ${i},${j})" ></td>`

        }


    }
    strHTML += '</tr>'
    document.querySelector('.sweeper-board').innerHTML = strHTML


}

function onCellClicked(elCell, cellI, cellJ) {

    console.log(elCell, cellI, cellJ);
    const currCell = gBoard[cellI][cellJ]
    if (currCell.isMarked && currCell.isShown)
        if (gIsFirstClick) {
            getRandomMine(cellI, cellJ)
            setMinesCount(gBoard)
            gIsFirstClick = false
        }

    if (currCell.isMine) {
        currCell.isShown = true
        elCell.innerText = MINE
        return checkGameOver()
    }

    // Update the Model:
    currCell.isShown = true
    // Update the Dom:
    elCell.innerText = currCell.minesAroundCount


}

// function isMine(elCell) {
//     for (var i = 0; i < gBoard.length; i++) {
//         for (var j = 0; j < gBoard[i].length; j++) {
//             gBoard[j][j].isShown = true
//         }
//     }
//     var cells = document.getElementsByClassName('hidden')
//     for (var s = 0; s < cells.length; i++) {
//         cells[s].classList.replace('hidden', 'empty')
//     }
//     elCell.classList.replace('empty', 'mine')
//     checkGameOver()
//     return
// }

function setMinesCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            board[i][j].minesAroundCount = countMinesAround(board, i, j)
            if (board[i][j].minesAroundCount === 0) board[i][j].minesAroundCount

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

function getRandomMine(mineNumber) {
    var size = gLevel.size
    var minesCount = 0

    while (minesCount < mineNumber) {
        var rowIdx = getRandomInt(0, size - 1)
        var colIdx = getRandomInt(0, size - 1)

        if (!gBoard[rowIdx][colIdx].isMine) {
            gBoard[rowIdx][colIdx].isMine = true
            minesCount++
        }
    }

}
function checkGameOver() {
    console.log('Game over')
    gGame.isOn = false
    document.querySelector('.popup').hidden = false

}

// function checkVictory() {

// }
// function btnClose() {
//     document.querySelector('.popup').hidden = true
// }


function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive
}

// function onCellMarked(elcell) { }


// function expandShown(board, elcell, i, j) { }






