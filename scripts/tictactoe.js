const screenController = (function () {

    const gameController = (function () {
        
        const gameboard = (function () {
            const rows = 3;
            const columns = 3    
            
            const board = [];

            for(let i = 0; i<rows; i++){
                const row = [];
                for(let j = 0; j<columns; j++){
                    row.push(Cell());
                }
                board.push(row);
            }

            const getBoard = () => board;

            function Cell () {
                let value = " ";
                
                const setValue = (playerToken) => {
                    if(value == " "){
                        value = playerToken;
                        return true;
                    }else{
                        return false;
                    }
                }
                const getValue = () => value;
                return { setValue, getValue };
            }
            

            const markCell = (player, cell) => {
                const cellCoordinates = {row: Math.floor(cell/rows), col: cell%rows};

                valid = board[cellCoordinates.row][cellCoordinates.col].setValue(player);
                
                return valid ? [
                        cellCoordinates.row, 
                        cellCoordinates.col, 
                        cellCoordinates.row==cellCoordinates.col, 
                        cellCoordinates.row+cellCoordinates.col==2
                    ] : -1
            }

            const print = () => {
                let gameboardLog = "";
                board.forEach(row => {
                        let rowLog = "";
                        row.forEach(cell => rowLog += cell.getValue() + " ")
                        rowLog += "\n";
                        gameboardLog += rowLog
                    }
                );
                console.log(gameboardLog);
            }
            
            return {getBoard, markCell , print};
        })();

        function player(name, token){
            const score = {
                row0: 0,
                row1: 0,
                row2: 0,
                col0: 0,
                col1: 0,
                col2: 0,
                dia0: 0,
                dia1: 0
            }

            const updatePlayerScore = (unavailableOptions, punish) => {

                score["row" + unavailableOptions[0]] = punish ? -1 : (score["row" + unavailableOptions[0]]==-1 ? -1 : score["row" + unavailableOptions[0]]+1);
                score["col" + unavailableOptions[1]] = punish ? -1 : (score["col" + unavailableOptions[1]]==-1 ? -1 : score["col" + unavailableOptions[1]]+1);

                
                if(unavailableOptions[2]) {
                    score.dia0 = punish ? -1 : (score.dia0 == -1 ? -1 : score.dia0 +1);
                }

                if(unavailableOptions[3]) {
                    score.dia1 = punish ? -1 : (score.dia1 == -1 ? -1 : score.dia1 +1);
                }
            }

            const hasWon = () => Object.values(score).indexOf(3) != -1;

            return{name, token, updatePlayerScore, hasWon};
        }

        const players = [player("Player 1", "X"), player("Player 2", "O")];
        let activePlayer = players[0];

        const switchPlayerTurn = () => {
            activePlayer = activePlayer === players[0] ? players[1] : players[0];
            console.log(`${getActivePlayer().name}'s turn.`);
        }

        const getActivePlayer = () => activePlayer;

        const getUnactivePlayer = () => activePlayer === players[0] ? players[1] : players[0];

        const checkForWinner = () => getActivePlayer().hasWon();

        let gameOver = false;

        const isGameOver = () => gameOver;

        const printNewRound = () => {
            gameboard.print();
        }

        const playRound = (target) => {
            const roundData = gameboard.markCell(getActivePlayer().token, target);
            if(roundData != -1){
                getActivePlayer().updatePlayerScore(roundData, false);
                getUnactivePlayer().updatePlayerScore(roundData, true);
                printNewRound();
                if(checkForWinner()){
                    gameOver=true;
                    console.log(`${getActivePlayer().name} won!`)    
                }else{
                    switchPlayerTurn();
                }
            }
        }

        console.log(`${getActivePlayer().name}'s turn.`);
        printNewRound();

        return {playRound, getActivePlayer, getBoard:gameboard.getBoard, isGameOver};

    })();

    const turnDiv = document.getElementById("turn");
    const boardDiv = document.getElementById("board");

    const board = gameController.getBoard();
    
    const updateScreen = () => {
        const activePlayer = gameController.getActivePlayer();
        boardDiv.innerHTML = " "
        turnDiv.textContent = `${activePlayer.name}'s turn`;

        board.forEach((row, index) =>{
            row.forEach((cell,index2) =>{
                const cellDiv = document.createElement("div");
                cellDiv.classList = "cell";
                cellDiv.dataset.index = index*3 + index2;
                cellDiv.textContent = cell.getValue();
                cellDiv.classList += ` ${cell.getValue()}`
                boardDiv.appendChild(cellDiv);
            })
        })

        
    }

    function clickHandler(e) {
        if(!gameController.isGameOver()){
            const index = e.target.dataset.index;
            if(!index) return;
            gameController.playRound(index);
            updateScreen();
        }
    }

    boardDiv.addEventListener("click", clickHandler);

    updateScreen();

})();






