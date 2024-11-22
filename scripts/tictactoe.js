const gameboard = (function () {
    const rows = 3;
    const columns = 3    
    
    const board = [];

    function Cell () {
        let value = " ";
    
        const setValue = (playerToken) => {
            if(value == " "){
                value = playerToken;
            }else{
                console.log("Nope");
            }
        }
        const getValue = () => value;
        return { setValue, getValue };
    }
    

    for(let i = 0; i<rows; i++){
        const row = [];
        for(let j = 0; j<columns; j++){
            row.push(Cell());
        }
        board.push(row);
    }

    const markCell = (player, cell) => {
        board[cell.row][cell.col].setValue(player);
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
    
    console.log(Cell())

    return {print , markCell};
})();


gameboard.markCell("X", {row: 1, col: 1}); 
gameboard.print();

gameboard.markCell("O", {row: 0, col: 0}); 
gameboard.print();

gameboard.markCell("X", {row: 0, col: 1}); 
gameboard.print();

gameboard.markCell("O", {row: 2, col: 1}); 
gameboard.print();

gameboard.markCell("X", {row: 2, col: 0}); 
gameboard.print();

gameboard.markCell("O", {row: 0, col: 2}); 
gameboard.print();

gameboard.markCell("X", {row: 1, col: 0}); 
gameboard.print();

gameboard.markCell("O", {row: 1, col: 2}); 
gameboard.print();

gameboard.markCell("X", {row: 2, col: 2}); 
gameboard.print();

gameboard.markCell("O", {row: 2, col: 2});


gameboard.print();



