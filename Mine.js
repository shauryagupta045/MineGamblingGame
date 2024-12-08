function start() {
    document.getElementById('home-page').classList.add('hidden');
    document.getElementById('game-page').classList.remove('hidden');
}

let balance = 0;
let bet = 0; 
let mineLocation = Math.floor(Math.random() * 25);
let tiles = [];

//  grid
for (let i = 0; i < 25; i++) {
    const tile = document.createElement('div');
    tile.classList.add('tile');
    tile.dataset.index = i;
    tile.addEventListener('click', checkTile);
    tile.style.pointerEvents = 'none'; // Disable tile 
    document.querySelector('.grid').appendChild(tile);
    tiles.push(tile);
}

document.getElementById('balance').textContent = balance;
document.getElementById('bet-input').addEventListener('input', updateBet);
document.getElementById('start-game').addEventListener('click', startGame);
document.getElementById('cash-out').addEventListener('click', cashOut);


//tile ka function
function checkTile(event) {
    if (bet <= 0) {
        alert('Please enter the bet amount first!');
        return;
    }
    const tileIndex = parseInt(event.target.dataset.index);
    if (tileIndex === mineLocation) {
        // Game over
        const totalAmountElement = document.getElementById('saving');
        const currentTotalAmount = parseFloat(totalAmountElement.textContent);
        const newTotalAmount = currentTotalAmount - bet;
        totalAmountElement.textContent = newTotalAmount.toFixed(2); // Update total amount display
        alert(`Game Over! You hit the mine! You lost $${bet} from your total amount.`);
        balance = 0;
        document.getElementById('balance').textContent = balance;
        tiles.forEach(tile => {
            if (parseInt(tile.dataset.index) === mineLocation) {
                tile.style.backgroundColor = 'red';
            }
        });

        setTimeout(resetGame, 3000);
    } else {
        // Win per 
        balance += bet + 0.02;
        document.getElementById('balance').textContent = balance;
        event.target.style.backgroundColor = 'green';
    }
    event.target.removeEventListener('click', checkTile);
    event.target.style.pointerEvents = 'none';  // Disable tile
}

// Update bet amount
function updateBet(event) {
    bet = parseFloat(event.target.value);
    if (isNaN(bet)) {
        bet = 0;
    }
  

    document.getElementById('bet').textContent = bet;
    if (bet > 0) {
        tiles.forEach(tile => {
            tile.style.pointerEvents = 'auto'; // Enable tiles
        });
    } else {
        tiles.forEach(tile => {
            tile.style.pointerEvents = 'none'; // Disable tiles
        });
    }
}

// Start game
function startGame() {
    const totalAmountElement = document.getElementById('saving');
    const currentTotalAmount = parseFloat(totalAmountElement.textContent);
    if (bet > 0 && bet <= currentTotalAmount) {
        document.getElementById('start-game').disabled = true;
        document.getElementById('bet-input').disabled = true;
        tiles.forEach(tile => {
            tile.style.pointerEvents = 'auto'; // Enable tiles
        });
        alert('Now you can play the game!');
        start(); 
    } else  if( bet<=0){
        alert('Please enter a valid bet amount!');
    }
    else if( bet => currentTotalAmount ){
        alert("Please Add more money to Bet the Amount!!")
    }
}
// Cash out
function cashOut() {
    const totalAmountElement = document.getElementById('saving');
    const currentTotalAmount = parseFloat(totalAmountElement.textContent);
    const newTotalAmount = currentTotalAmount + balance;
    totalAmountElement.textContent = newTotalAmount.toFixed(2); // Update total amount display
    alert(`You cashed out with a balance of $${balance}! Your new total amount is $${newTotalAmount}`);
    balance = 0;
    document.getElementById('balance').textContent = balance; // Update balance display
    resetGame();
}

// Reset game 
function resetGame() {
    mineLocation = Math.floor(Math.random() * 25);
    tiles.forEach(tile => {
        tile.style.backgroundColor = '';
        tile.style.pointerEvents = 'none'; 
        tile.addEventListener('click', checkTile);
    });
    document.getElementById('start-game').disabled = false;
    document.getElementById('bet-input').disabled = false;
}