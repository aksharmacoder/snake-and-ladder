document.addEventListener('DOMContentLoaded', (event) => {
    const board = document.getElementById('board');
    const rollDiceButton = document.getElementById('roll-dice');
    const diceResult = document.getElementById('dice-result');
    const playerTurn = document.getElementById('player-turn');

    const boardSize = 10;
    let players = [
        { name: 'Player 1', position: 0, color: 'red' },
        { name: 'Player 2', position: 0, color: 'blue' }
    ];
    let currentPlayerIndex = 0;
    const snakes = { 16: 6, 47: 26, 49: 11, 56: 53, 62: 19, 64: 60, 87: 24, 93: 73, 95: 75, 98: 78 };
    const ladders = { 1: 38, 4: 14, 9: 31, 21: 42, 28: 84, 36: 44, 51: 67, 71: 91, 80: 100 };

    // Initialize the board
    for (let i = 0; i < boardSize * boardSize; i++) {
        const cell = document.createElement('div');
        cell.innerText = boardSize * boardSize - i;
        board.appendChild(cell);
    }

    // Roll dice and move player
    rollDiceButton.addEventListener('click', () => {
        const roll = Math.floor(Math.random() * 6) + 1;
        diceResult.innerText = `Dice Result: ${roll}`;
        movePlayer(roll);
    });

    function movePlayer(roll) {
        let player = players[currentPlayerIndex];
        player.position += roll;

        // Check for snakes or ladders
        if (snakes[player.position]) {
            player.position = snakes[player.position];
        } else if (ladders[player.position]) {
            player.position = ladders[player.position];
        }

        // Check for win condition
        if (player.position >= 100) {
            player.position = 100;
            alert(`${player.name} wins!`);
            resetGame();
            return;
        }

        updateBoard();
        currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
        playerTurn.innerText = `${players[currentPlayerIndex].name}'s turn`;
    }

    function updateBoard() {
        const cells = board.children;
        for (let cell of cells) {
            cell.style.backgroundColor = '';
        }
        for (let player of players) {
            if (player.position > 0) {
                const cellIndex = boardSize * boardSize - player.position;
                cells[cellIndex].style.backgroundColor = player.color;
            }
        }
    }

    function resetGame() {
        for (let player of players) {
            player.position = 0;
        }
        updateBoard();
        currentPlayerIndex = 0;
        playerTurn.innerText = `${players[currentPlayerIndex].name}'s turn`;
    }

    resetGame();
});