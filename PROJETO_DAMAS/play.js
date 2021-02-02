let vitoryPoints = 12,
    pointsFirst = 0,
    pointsSecond = 0,
    winner = '',
    turn = 1,
    players = [],
    primaryColor,
    secundaryColor,
    winners,
    selectedPiece,
    enemyCell

let map = [
    [null, 2, null, 2, null, 2, null, 2],
    [2, null, 2, null, 2, null, 2, null],
    [null, 2, null, 2, null, 2, null, 2],
    [0, null, 0, null, 0, null, 0, null],
    [null, 0, null, 0, null, 0, null, 0],
    [1, null, 1, null, 1, null, 1, null],
    [null, 1, null, 1, null, 1, null, 1],
    [1, null, 1, null, 1, null, 1, null]
]

// let bluePieces = document.getElementsByName('bluePiece')
// let redPieces = document.getElementsByName('redPiece')
let table = document.getElementById('board')

getTheme();
getWinners();
fillTable();
getPlayers();

//OBTER CONFIGURAÇÕES (FEITO)
function getTheme() {
    if (typeof (Storage) !== undefined) {
        theme = localStorage.getItem('theme')

        if (theme == 1) {
            primaryColor = 'black'
            secondaryColor = 'white'
        } else {
            primaryColor = 'brown'
            secondaryColor = 'beige'
        }
    } else {
        alert(`THIS BROWSER DOESN'T SUPPORT LOCAL STORAGE!`)
    }
}

function getWinners() {
    if (typeof (Storage) !== undefined) {
        winners = JSON.parse(localStorage.getItem('winners'));
        console.log(winners);
    } else {
        alert(`THIS BROWSER DOESN'T SUPPORT LOCAL STORAGE!`)
    }
}

//OBTER NOME DOS JOGADORES (FEITO)
function getPlayers() {
    for (let i = 0; i < 2; i++) {
        let text = document.getElementById(`player${i+1}`)
        text.innerHTML = prompt(`Digite o nome do jogador ${i+1}`)
        players[i] = text.innerHTML;
    }
}

//CRIAR TABULEIRO E POSICIONAR PEÇAS (FEITO)
function fillTable() {
    for (let i = 0; i < map.length; i++) {
        let line = document.createElement('tr')
        line.id = `linha_${i}`
        for (let j = 0; j < map[i].length; j++) {
            let col = document.createElement('td')
            col.id = `cell_${i}_${j}`
            if (map[i][j] == 1) {
                let bluePiece = document.createElement('img')
                bluePiece.src = 'images/bluePiece.png'
                bluePiece.id = `bluePiece_${i+1}_${j+1}`
                bluePiece.name = 'bluePiece'
                col.append(bluePiece)
                col.classList.add(primaryColor)
            } else if (map[i][j] == 2) {
                let redPiece = document.createElement('img')
                redPiece.src = 'images/redPiece.png'
                redPiece.id = `redPiece_${i+1}_${j+1}`
                redPiece.name = 'redPiece'
                col.classList.add(primaryColor)
                col.append(redPiece);
            } else if (map[i][j] == 0) {
                col.classList.add(primaryColor)
            } else if (map[i][j] == null) {
                col.classList.add(secondaryColor)
            }
            line.append(col)
        }
        table.append(line)
    }
}

//VERIFICAR SE O JOGADOR EFETUOU UMA DAMA (CHEGOU AO OUTRO LADO DO TABULEIRO) (FEITO)
function verifyQueen() {
    let cell
    let queen = document.createElement('img')
    if (turn == 1) {
        for (let i = 0; i < map[0].length; i++) {
            if (map[0][i] == 1) {
                cell = document.getElementById(`cell_0_${i}`)
                cell.innerHTML = '';
                queen.src = './images/bluePieceQueen.png';
                queen.name = 'bluePieceQueen'
                cell.append(queen);
            }
        }
    } else {
        for (let i = 0; i < map[7].length; i++) {
            if (map[7][i] == 2) {
                cell = document.getElementById(`cell_7_${i}`)
                cell.innerHTML = '';
                queen.src = './images/redPieceQueen.png';
                queen.name = 'redPieceQueen'
                cell.append(queen);
            }
        }
    }
}

//FAZER A TROCA DE TURNOS (FEITO)
function endTurn() {
    let spanTurn1 = document.getElementById('turn1')
    let spanTurn2 = document.getElementById('turn2')

    if (turn == 1) {
        turn = 2
        spanTurn1.hidden = true;
        spanTurn2.hidden = false;
    } else {
        turn = 1
        spanTurn1.hidden = false;
        spanTurn2.hidden = true;
    }
}

//VERIFICAR SE O JOGADOR GANHOU (FEITO)
function checkWinner() {
    if (pointsFirst == vitoryPoints || pointsSecond == vitoryPoints) {
        if (pointsFirst == vitoryPoints) {
            winner = players[0]
        } else if (pointsSecond == vitoryPoints) {
            winner = players[1]
        }

        if (typeof (Storage) !== undefined) {
            if (localStorage.getItem('winners') === null) {
                let winnerInfo = {
                    name: winner,
                    wins: 1
                }
                winners.push(winnerInfo)
            } else {
                for (let i = 0; i < winners.length; i++) {
                    if (winners[i].name == winner) {
                        winners[i].wins++;
                    }
                }
            }

            localStorage.setItem('winners', winners.stringify());
        } else {
            alert(`THIS BROWSER DOESN'T SUPPORT LOCAL STORAGE!`)
        }

        let restart = confirm(`GAME WON BY ${winner}! RESTART?`)

        if (restart) {
            location.reload()
        } else {
            location.replace('index.html')
        }
    }
}

//VERIFICAR SE É POSSIVEL MOVER A PEÇA
function verifyPositions(piece) {
    let selectedCells = document.getElementsByClassName('cell-selected')
    let redCells = document.getElementsByClassName('cell-moves')
    if (selectedCells !== null || redCells !== null) {
        while (selectedCells.length >= 1) {
            selectedCells[0].classList.remove('cell-selected')
        }
        while (redCells.length >= 1) {
            redCells[0].classList.remove('cell-moves')
        }
    }

    selectedPiece = piece

    let cell = piece.parentElement
    cell.classList.add('cell-selected')

    console.log(cell.id);

    let line = parseInt(cell.id.substring(5, 6))

    let col = parseInt(cell.id.substring(7, 8))

    console.log(line);
    console.log(col);

    console.log(map);

    if (turn == 1) {
        let cellRight = document.getElementById(`cell_${line - 1}_${col + 1}`)
        let cellLeft = document.getElementById(`cell_${line - 1}_${col - 1}`)
        if (map[line - 1][col - 1] == 0 && map[line - 1][col + 1] == 0) {
            cellRight.classList.add('cell-moves')
            cellLeft.classList.add('cell-moves')
        } else if (col == 0 && map[line - 1][col + 1] == 0) {
            cellRight.classList.add('cell-moves')
        } else if (map[line - 1][col - 1] == 1 && map[line - 1][col + 1] == 0) {
            cellRight.classList.add('cell-moves')
        } else if (map[line - 1][col - 1] == 0 && col == 7) {
            cellLeft.classList.add('cell-moves')
        } else if (map[line - 1][col - 1] == 0 && map[line - 1][col + 1] == 1) {
            cellLeft.classList.add('cell-moves')
        } else if (map[line - 1][col - 1] == 2 && map[line - 2][col - 2] == 0) {
            cellLeft = document.getElementById(`cell_${line - 2}_${col - 2}`)
            cellLeft.classList.add('cell-moves')
        } else if (map[line - 1][col + 1] == 2 && map[line - 2][col + 2] == 0) {
            cellRight = document.getElementById(`cell_${line - 2}_${col + 2}`)
            cellRight.classList.add('cell-moves')
        } else if (map[line - 1][col - 1] == 0)
        {
            cellLeft.classList.add('cell-moves');       
        } else if (map[line - 1][col + 1] == 0)
        {
            cellRight.classList.add('cell-moves');       
        }
        
    } else {
        let cellRight = document.getElementById(`cell_${line + 1}_${col - 1}`)
        let cellLeft = document.getElementById(`cell_${line + 1}_${col + 1}`)
        if (map[line + 1][col + 1] == 0 && map[line + 1][col - 1] == 0) {
            cellRight.classList.add('cell-moves')
            cellLeft.classList.add('cell-moves')
        } else if (col == 7 && map[line + 1][col - 1] == 0) {
            cellRight.classList.add('cell-moves')
        } else if (col == 0 && map[line + 1][col + 1] == 0) {
            cellLeft.classList.add('cell-moves')
        } else if (line < 6 && map[line + 1][col + 1] == 1 && map[line + 2][col + 2] == 0) {
            cellRight = document.getElementById(`cell_${line + 2}_${col + 2}`)
            cellRight.classList.add('cell-moves')
        } else if (map[line + 1][col - 1] == 1 && map[line + 2][col - 2] == 0) {
            cellLeft = document.getElementById(`cell_${line + 2}_${col - 2}`)
            cellLeft.classList.add('cell-moves')
        } else if (map[line + 1][col + 1] == 0)
        {
            cellLeft.classList.add('cell-moves');       
        } else if (map[line + 1][col - 1] == 0)
        {
            cellRight.classList.add('cell-moves');          
        }
    }
}

//VERIFICAR SE É POSSIVEL MOVER A PEÇA
function verifyPositionsQueen(piece) {
    let selectedCells = document.getElementsByClassName('cell-selected')
    let redCells = document.getElementsByClassName('cell-moves')
    if (selectedCells !== null || redCells !== null) {
        while (selectedCells.length >= 1) {
            selectedCells[0].classList.remove('cell-selected')
        }
        while (redCells.length >= 1) {
            redCells[0].classList.remove('cell-moves')
        }
    }

    selectedPiece = piece

    let cell = piece.parentElement
    cell.classList.add('cell-selected')

    console.log(cell.id);

    let line = parseInt(cell.id.substring(5, 6))

    let col = parseInt(cell.id.substring(7, 8))

    console.log(line);
    console.log(col);

    if (turn == 1) {
        let cellRight = document.getElementById(`cell_${line}_${col + 2}`)
        let cellLeft = document.getElementById(`cell_${line}_${col - 2}`)
        let cellFront = document.getElementById(`cell_${line + 2}_${col}`)
        let cellBack = document.getElementById(`cell_${line - 2}_${col}`)
        if (map[line][col - 2] == 0 && map[line][col + 2] == 0) {
            cellRight.classList.add('cell-moves')
            cellLeft.classList.add('cell-moves')
        } else if (col == 0 && map[line][col + 2] == 0) {
            cellRight.classList.add('cell-moves')
        } else if (map[line][col - 2] == 0 && col == 7) {
            cellLeft.classList.add('cell-moves')
        } else if (map[line][col - 2] == 2) {
            cellLeft = document.getElementById(`cell_${line}_${col - 4}`)
            cellLeft.classList.add('cell-moves')
        } else if (map[line][col + 2] == 2) {
            cellRight = document.getElementById(`cell_${line}_${col + 4}`)
            cellRight.classList.add('cell-moves')
        } else if (map[line + 2][col] == 0 && map[line - 2][col] == 0) {
            cellFront.classList.add('cellMoves')
            cellBack.classList.add('cellMoves')
        } else if (map[line - 2][col] == 2) {
            cellFront = document.getElementById(`cell_${line + 4}_${col}`)
            cellFront.classList.add('cellMoves')
        } else if (map[line + 2][col] == 2) {
            cellFront = document.getElementById(`cell_${line - 4}_${col}`)
            cellBack.classList.add('cellMoves')
        }
    } else {
        let cellRight = document.getElementById(`cell_${line}_${col + 2}`)
        let cellLeft = document.getElementById(`cell_${line}_${col - 2 }`)
        let cellFront = document.getElementById(`cell_${line + 2}_${col}`)
        let cellBack = document.getElementById(`cell_${line - 2}_${col}`)
        if (map[line][col - 2] == 0 && map[line][col + 2] == 0) {
            cellRight.classList.add('cell-moves')
            cellLeft.classList.add('cell-moves')
        } else if (col == 0 && map[line][col + 2] == 0) {
            cellRight.classList.add('cell-moves')
        } else if (map[line][col - 2] == 0 && col == 7) {
            cellLeft.classList.add('cell-moves')
        } else if (map[line][col - 2] == 2) {
            cellLeft = document.getElementById(`cell_${line}_${col - 4}`)
            cellLeft.classList.add('cell-moves')
        } else if (map[line][col + 2] == 2) {
            cellRight = document.getElementById(`cell_${line}_${col + 4}`)
            cellRight.classList.add('cell-moves')
        } else if (map[line + 2][col] == 0 && map[line - 2][col] == 0) {
            cellFront.classList.add('cellMoves')
            cellBack.classList.add('cellMoves')
        } else if (map[line + 2][col] == 2) {
            cellFront = document.getElementById(`cell_${line + 4}_${col}`)
            cellFront.classList.add('cellMoves')
        } else if (map[line + 2][col] == 2) {
            cellBack = document.getElementById(`cell_${line - 4}_${col}`)
            cellBack.classList.add('cellMoves')
        }
    }
}

//MOVER A PEÇA
function movePiece(line, col) {

    let cell = document.getElementById(`cell_${line}_${col}`)

    if (cell.classList.contains('cell-moves')) {
        let lastCell = document.getElementsByClassName('cell-selected')[0]
        let sound = document.getElementById('movePiece')
        // let piece = document.createElement('img')

        console.log(lastCell);

        lastCell.innerHTML = ''

        lastCell.classList.remove('cell-selected');

        let lastLine = parseInt(lastCell.id.substring(5, 6))

        let lastCol = parseInt(lastCell.id.substring(7, 8))

        if (turn == 1) {

            map[lastLine][lastCol] = 0
            
            map[line][col] = 1
            cell.append(selectedPiece)
            
            if(col < lastCol + 1)
            {
                if(map[line + 1][col + 1] == 2)
                {
                    map[line + 1][col + 1] = 0;
                    enemyCell = document.getElementById(`cell_${lastLine - 1}_${lastCol - 1}`)
                    enemyCell.innerHTML = ''
                    pointsFirst++;
                }
            }
            else if (col > lastCol - 1)
            {
                if(map[line + 1][col - 1] == 2)
                {
                    map[line + 1][col  - 1] = 0;
                    enemyCell = document.getElementById(`cell_${lastLine - 1}_${lastCol + 1}`)
                    enemyCell.innerHTML = ''
                    pointsFirst++;
                }
            }
        } else {
          
            map[lastLine][lastCol] = 0
           
            if(col < lastCol + 1)
            {
                if(map[line - 1][col + 1] == 1)
                {
                    map[line - 1][col + 1] = 0;
                    enemyCell = document.getElementById(`cell_${lastLine + 1}_${lastCol - 1}`)
                    enemyCell.innerHTML = ''
                    pointsSecond++;
                }
            }
            else if (col > lastCol - 1)
            {
                if(map[line - 1][col - 1] == 1)
                {
                    map[line - 1][col  - 1] = 0;
                    enemyCell = document.getElementById(`cell_${lastLine + 1}_${lastCol + 1}`)
                    enemyCell.innerHTML = ''
                    pointsSecond++;
                }
            }
            
           
            map[line][col] = 2
            cell.append(selectedPiece)
        }

        let redCells = document.getElementsByClassName('cell-moves')

        while (redCells.length > 0) {
            redCells[0].classList.remove('cell-moves')
        }

        if (localStorage.getItem('sound')) {
            sound.play();
        }

        selectedPiece = null
    }

    refreshPieces();
}

//VERIFICAR QUAIS SÃO AS POSSIBILIDADES DE JOGADA APÓS O CLIQUE NUMA PEÇA

refreshPieces();

//EFETUAR JOGADA APÓS CLIQUE NUMA CÉLULA DO TABULEIRO (FEITO)
table.addEventListener('click', (ev) => {
    let col = ev.target.cellIndex
    let row = ev.target.parentElement.rowIndex

    console.log(col);
    console.log(row);

    let cell = document.getElementById(`cell_${row}_${col}`)

    console.log(cell);

    if (cell.classList.contains('cell-moves')) {
        movePiece(row, col)

        verifyQueen();

        endTurn();

        checkWinner();
    } 
})

function refreshPieces() {
    redPieces = document.getElementsByName('redPiece')
    redPiecesQueen = document.getElementsByName('redPiecesQueen')
    bluePieces = document.getElementsByName('bluePiece')
    bluePiecesQueen = document.getElementsByName('bluePiecesQueen')

    bluePieces.forEach(bluePiece => {
        bluePiece.addEventListener('click', () => {
            if (turn == 1) {
                verifyPositions(bluePiece);
            } 

            event.stopPropagation()
        })
    });

    bluePiecesQueen.forEach(bluePieceQueen => {
        bluePieceQueen.addEventListener('click', () => {
            if (turn == 1) {
                // verifyPositions(bluePieces[i]);
                verifyPositionsQueen(bluePieceQueen)
            } 

            event.stopPropagation()
        })
    });

    redPieces.forEach(redPiece => {
        redPiece.addEventListener('click', () => {
            if (turn == 2) {
                // verifyPositions(bluePieces[i]);
                verifyPositions(redPiece)
            } 

            event.stopPropagation()
        })
    });

    redPiecesQueen.forEach(redPieceQueen => {
        redPieceQueen.addEventListener('click', () => {
            if (turn == 2) {
                // verifyPositions(bluePieces[i]);
                verifyPositionsQueen(redPieceQueen)
            } 

            event.stopPropagation()
        })
    });
    
   
    
}