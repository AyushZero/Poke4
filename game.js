const ROWS = 6;
const COLS = 7;
let board = [];
let currentPlayer = 'red';
let gameActive = true;
let currentPieceType = null;

const boardElement = document.getElementById('board');
const messageElement = document.getElementById('message');
const resetBtn = document.getElementById('resetBtn');
const redSidebar = document.getElementById('redSidebar');
const blueSidebar = document.getElementById('blueSidebar');
const redTypeDisplay = document.getElementById('redTypeDisplay');
const blueTypeDisplay = document.getElementById('blueTypeDisplay');
const redAssistBtn = document.getElementById('redAssistBtn');
const blueAssistBtn = document.getElementById('blueAssistBtn');
const redAssistInfo = document.getElementById('redAssistInfo');
const blueAssistInfo = document.getElementById('blueAssistInfo');

let redAssistActive = false;
let blueAssistActive = false;
let gameLogs = [];

const TYPES = [
    "normal", "fire", "water", "electric", "grass", "ice", 
    "fighting", "poison", "ground", "flying", "psychic", "bug", 
    "rock", "ghost", "dragon", "dark", "steel", "fairy"
];

const TYPE_ICONS = {
    "normal": "types/normal.svg",
    "fire": "types/fire.svg",
    "water": "types/water.svg",
    "electric": "types/electric.svg",
    "grass": "types/grass.svg",
    "ice": "types/ice.svg",
    "fighting": "types/fighting.svg",
    "poison": "types/poison.svg",
    "ground": "types/ground.svg",
    "flying": "types/flying.svg",
    "psychic": "types/psychic.svg",
    "bug": "types/bug.svg",
    "rock": "types/rock.svg",
    "ghost": "types/ghost.svg",
    "dragon": "types/dragon.svg",
    "dark": "types/dark.svg",
    "steel": "types/steel.svg",
    "fairy": "types/fairy.svg"
};

const TYPE_CHART = {
    "normal": { "rock": 0.5, "ghost": 0, "steel": 0.5 },
    "fire": { "fire": 0.5, "water": 0.5, "grass": 2, "ice": 2, "bug": 2, "rock": 0.5, "dragon": 0.5, "steel": 2 },
    "water": { "fire": 2, "water": 0.5, "grass": 0.5, "ground": 2, "rock": 2, "dragon": 0.5 },
    "electric": { "water": 2, "electric": 0.5, "grass": 0.5, "ground": 0, "flying": 2, "dragon": 0.5 },
    "grass": { "fire": 0.5, "water": 2, "grass": 0.5, "poison": 0.5, "ground": 2, "flying": 0.5, "bug": 0.5, "rock": 2, "dragon": 0.5, "steel": 0.5 },
    "ice": { "fire": 0.5, "water": 0.5, "grass": 2, "ice": 0.5, "ground": 2, "flying": 2, "dragon": 2, "steel": 0.5 },
    "fighting": { "normal": 2, "ice": 2, "poison": 0.5, "flying": 0.5, "psychic": 0.5, "bug": 0.5, "rock": 2, "ghost": 0, "dark": 2, "steel": 2, "fairy": 0.5 },
    "poison": { "grass": 2, "poison": 0.5, "ground": 0.5, "rock": 0.5, "ghost": 0.5, "steel": 0, "fairy": 2 },
    "ground": { "fire": 2, "electric": 2, "grass": 0.5, "poison": 2, "flying": 0, "bug": 0.5, "rock": 2, "steel": 2 },
    "flying": { "electric": 0.5, "grass": 2, "fighting": 2, "bug": 2, "rock": 0.5, "steel": 0.5 },
    "psychic": { "fighting": 2, "poison": 2, "psychic": 0.5, "dark": 0, "steel": 0.5 },
    "bug": { "fire": 0.5, "grass": 2, "fighting": 0.5, "poison": 0.5, "flying": 0.5, "psychic": 2, "ghost": 0.5, "dark": 2, "steel": 0.5, "fairy": 0.5 },
    "rock": { "fire": 2, "ice": 2, "fighting": 0.5, "ground": 0.5, "flying": 2, "bug": 2, "steel": 0.5 },
    "ghost": { "normal": 0, "psychic": 2, "ghost": 2, "dark": 0.5 },
    "dragon": { "dragon": 2, "steel": 0.5, "fairy": 0 },
    "dark": { "fighting": 0.5, "psychic": 2, "ghost": 2, "dark": 0.5, "fairy": 0.5 },
    "steel": { "fire": 0.5, "water": 0.5, "electric": 0.5, "ice": 2, "rock": 2, "steel": 0.5, "fairy": 2 },
    "fairy": { "fire": 0.5, "fighting": 2, "poison": 0.5, "dragon": 2, "dark": 2, "steel": 0.5 }
};

// Get random type
function getRandomType() {
    return TYPES[Math.floor(Math.random() * TYPES.length)];
}

// Get effectiveness multiplier
function getEffectiveness(attackType, defenseType) {
    if (!TYPE_CHART[attackType]) return 1;
    const effectiveness = TYPE_CHART[attackType][defenseType];
    return effectiveness !== undefined ? effectiveness : 1;
}

// Initialize the game
function initGame() {
    board = Array(ROWS).fill(null).map(() => Array(COLS).fill(null));
    currentPlayer = 'red';
    gameActive = true;
    messageElement.textContent = '';
    messageElement.className = '';
    currentPieceType = getRandomType();
    gameLogs = [];
    gameLogs.push(`Game started! Red goes first with ${currentPieceType}.`);
    updateCurrentPlayer();
    createBoard();
}

// Create the board UI
function createBoard() {
    boardElement.innerHTML = '';
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener('click', () => handleCellClick(col));
            cell.addEventListener('mouseenter', () => highlightColumn(col));
            cell.addEventListener('mouseleave', () => clearColumnHighlight());
            boardElement.appendChild(cell);
        }
    }
}

// Highlight entire column on hover
function highlightColumn(col) {
    for (let row = 0; row < ROWS; row++) {
        const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        if (cell && !cell.classList.contains('red') && !cell.classList.contains('blue')) {
            cell.classList.add('column-highlight');
        }
    }
}

// Clear column highlight
function clearColumnHighlight() {
    document.querySelectorAll('.column-highlight').forEach(cell => {
        cell.classList.remove('column-highlight');
    });
}

// Handle cell click
function handleCellClick(col) {
    if (!gameActive) return;

    // Find the lowest empty row in this column
    let row = -1;
    for (let r = ROWS - 1; r >= 0; r--) {
        if (board[r][col] === null) {
            row = r;
            break;
        }
    }

    // Column is full
    if (row === -1) return;

    // Check if landing on an opponent's piece
    let pieceDestroyed = false;
    if (row < ROWS - 1 && board[row + 1][col] !== null) {
        const belowPiece = board[row + 1][col];
        
        // Only interact with opponent's pieces
        if (belowPiece.player !== currentPlayer) {
            const attackingType = currentPieceType;
            const defendingType = belowPiece.type;
            
            const effectiveness = getEffectiveness(attackingType, defendingType);
            const reverseEffectiveness = getEffectiveness(defendingType, attackingType);
            
            // Super effective: destroy the piece below
            if (effectiveness >= 2) {
                gameLogs.push(`${currentPlayer.toUpperCase()}'s ${attackingType} destroyed opponent's ${defendingType} (Super Effective!)`);
                board[row + 1][col] = null;
                updateCell(row + 1, col, null, null, true);
                pieceDestroyed = true;
                // Wait for animation before placing new piece
                setTimeout(() => {
                    row = row + 1;
                    board[row][col] = { player: currentPlayer, type: currentPieceType };
                    updateCell(row, col, currentPlayer, currentPieceType, true);
                    checkAndContinueGame(row, col);
                }, 500);
                return;
            }
            // Weak to the piece below: don't place the new piece
            else if (reverseEffectiveness >= 2) {
                gameLogs.push(`${currentPlayer.toUpperCase()}'s ${attackingType} was destroyed by opponent's ${defendingType} (Not Very Effective)`);
                // New piece gets destroyed, don't place it - switch to other player
                currentPlayer = currentPlayer === 'red' ? 'blue' : 'red';
                currentPieceType = getRandomType();
                gameLogs.push(`${currentPlayer.toUpperCase()}'s turn with ${currentPieceType}`);
                updateCurrentPlayer();
                return;
            }
            // Immunity (0 damage)
            else if (effectiveness === 0) {
                gameLogs.push(`${currentPlayer.toUpperCase()}'s ${attackingType} destroyed opponent's ${defendingType} (No Effect/Immunity)`);
                board[row + 1][col] = null;
                updateCell(row + 1, col, null, null, true);
                pieceDestroyed = true;
                // Wait for animation before placing new piece
                setTimeout(() => {
                    row = row + 1;
                    board[row][col] = { player: currentPlayer, type: currentPieceType };
                    updateCell(row, col, currentPlayer, currentPieceType, true);
                    checkAndContinueGame(row, col);
                }, 500);
                return;
            }
            else if (reverseEffectiveness === 0) {
                gameLogs.push(`${currentPlayer.toUpperCase()}'s ${attackingType} was destroyed by opponent's ${defendingType} (Immunity)`);
                // New piece immune, gets destroyed - switch to other player
                currentPlayer = currentPlayer === 'red' ? 'blue' : 'red';
                currentPieceType = getRandomType();
                gameLogs.push(`${currentPlayer.toUpperCase()}'s turn with ${currentPieceType}`);
                updateCurrentPlayer();
                return;
            }
        }
    }

    // Place the piece
    board[row][col] = { player: currentPlayer, type: currentPieceType };
    updateCell(row, col, currentPlayer, currentPieceType, true);
    
    checkAndContinueGame(row, col);
}

// Check win/draw and continue game
function checkAndContinueGame(row, col) {
    // Check for win
    if (checkWin(row, col)) {
        gameActive = false;
        messageElement.textContent = `${currentPlayer.toUpperCase()} WINS!`;
        messageElement.className = `win ${currentPlayer}-win`;
        return;
    }

    // Check for draw
    if (checkDraw()) {
        gameActive = false;
        messageElement.textContent = "DRAW!";
        messageElement.className = 'win draw';
        return;
    }

    // Switch player and get new random type
    currentPlayer = currentPlayer === 'red' ? 'blue' : 'red';
    currentPieceType = getRandomType();
    gameLogs.push(`${currentPlayer.toUpperCase()}'s turn with ${currentPieceType}`);
    updateCurrentPlayer();
}

// Update cell appearance
function updateCell(row, col, player, type = null, animate = false) {
    const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
    
    if (!player) {
        // Removing a piece - fade out animation
        if (animate) {
            cell.classList.add('fade-out');
            setTimeout(() => {
                cell.className = 'cell';
                cell.innerHTML = '';
            }, 500);
        } else {
            cell.className = 'cell';
            cell.innerHTML = '';
        }
    } else {
        // Adding a piece
        cell.className = 'cell';
        cell.innerHTML = '';
        cell.classList.add(player);
        if (type) {
            cell.title = type.charAt(0).toUpperCase() + type.slice(1);
            const img = document.createElement('img');
            img.src = TYPE_ICONS[type] || '';
            img.alt = type;
            img.className = 'type-icon';
            cell.appendChild(img);
            if (animate) {
                cell.classList.add('fade-in');
            }
        }
    }
}

// Generate assist info for a type
function generateAssistInfo(type) {
    const superEffective = [];
    const notVeryEffective = [];
    const immune = [];
    const weakTo = [];
    const resistsTo = [];
    const immuneTo = [];
    
    // What this type is good/bad against (attacking)
    const matchups = TYPE_CHART[type];
    if (matchups) {
        for (const [defType, mult] of Object.entries(matchups)) {
            if (mult === 2) superEffective.push(defType);
            else if (mult === 0.5) notVeryEffective.push(defType);
            else if (mult === 0) immune.push(defType);
        }
    }
    
    // What this type is weak/resistant to (defending)
    TYPES.forEach(attackType => {
        const eff = getEffectiveness(attackType, type);
        if (eff === 2) weakTo.push(attackType);
        else if (eff === 0.5) resistsTo.push(attackType);
        else if (eff === 0) immuneTo.push(attackType);
    });
    
    let html = `<h4>Attack</h4><div class="assist-icons">`;
    if (superEffective.length > 0) {
        html += `<div class="assist-category super-eff">`;
        superEffective.forEach(t => {
            html += `<img src="${TYPE_ICONS[t]}" alt="${t}" title="Strong vs ${t}">`;
        });
        html += `</div>`;
    }
    if (notVeryEffective.length > 0) {
        html += `<div class="assist-category weak-eff">`;
        notVeryEffective.forEach(t => {
            html += `<img src="${TYPE_ICONS[t]}" alt="${t}" title="Weak vs ${t}">`;
        });
        html += `</div>`;
    }
    if (immune.length > 0) {
        html += `<div class="assist-category immune-eff">`;
        immune.forEach(t => {
            html += `<img src="${TYPE_ICONS[t]}" alt="${t}" title="No effect on ${t}">`;
        });
        html += `</div>`;
    }
    html += `</div><h4>Defend</h4><div class="assist-icons">`;
    if (weakTo.length > 0) {
        html += `<div class="assist-category weak-eff">`;
        weakTo.forEach(t => {
            html += `<img src="${TYPE_ICONS[t]}" alt="${t}" title="Weak to ${t}">`;
        });
        html += `</div>`;
    }
    if (resistsTo.length > 0) {
        html += `<div class="assist-category super-eff">`;
        resistsTo.forEach(t => {
            html += `<img src="${TYPE_ICONS[t]}" alt="${t}" title="Resists ${t}">`;
        });
        html += `</div>`;
    }
    if (immuneTo.length > 0) {
        html += `<div class="assist-category immune-eff">`;
        immuneTo.forEach(t => {
            html += `<img src="${TYPE_ICONS[t]}" alt="${t}" title="Immune to ${t}">`;
        });
        html += `</div>`;
    }
    html += `</div>`;
    
    return html;
}

// Update current player display
function updateCurrentPlayer() {
    const playerColor = currentPlayer === 'red' ? 'red' : 'blue';
    const typeName = currentPieceType.charAt(0).toUpperCase() + currentPieceType.slice(1);
    const typeIconSrc = TYPE_ICONS[currentPieceType] || '';
    
    // Update sidebar displays
    document.body.className = currentPlayer + '-turn';
    
    if (currentPlayer === 'red') {
        redSidebar.classList.add('active');
        blueSidebar.classList.remove('active');
        redTypeDisplay.innerHTML = `
            <img src="${typeIconSrc}" alt="${typeName}">
            <div class="type-name">${typeName}</div>
        `;
        blueTypeDisplay.innerHTML = '';
        
        // Update assist info if active
        if (redAssistActive) {
            redAssistInfo.innerHTML = generateAssistInfo(currentPieceType);
        }
        // Clear blue assist info when not their turn
        if (blueAssistActive) {
            blueAssistInfo.innerHTML = '';
        }
    } else {
        blueSidebar.classList.add('active');
        redSidebar.classList.remove('active');
        blueTypeDisplay.innerHTML = `
            <img src="${typeIconSrc}" alt="${typeName}">
            <div class="type-name">${typeName}</div>
        `;
        redTypeDisplay.innerHTML = '';
        
        // Update assist info if active
        if (blueAssistActive) {
            blueAssistInfo.innerHTML = generateAssistInfo(currentPieceType);
        }
        // Clear red assist info when not their turn
        if (redAssistActive) {
            redAssistInfo.innerHTML = '';
        }
    }
}

// Check for win
function checkWin(row, col) {
    const piece = board[row][col];
    if (!piece) return false;
    const player = piece.player;
    
    // Check horizontal
    if (checkDirection(row, col, 0, 1, player) + checkDirection(row, col, 0, -1, player) >= 3) return true;
    
    // Check vertical
    if (checkDirection(row, col, 1, 0, player) + checkDirection(row, col, -1, 0, player) >= 3) return true;
    
    // Check diagonal /
    if (checkDirection(row, col, 1, 1, player) + checkDirection(row, col, -1, -1, player) >= 3) return true;
    
    // Check diagonal \
    if (checkDirection(row, col, 1, -1, player) + checkDirection(row, col, -1, 1, player) >= 3) return true;
    
    return false;
}

// Check direction for consecutive pieces
function checkDirection(row, col, rowDir, colDir, player) {
    let count = 0;
    let r = row + rowDir;
    let c = col + colDir;
    
    while (r >= 0 && r < ROWS && c >= 0 && c < COLS && board[r][c] !== null && board[r][c].player === player) {
        count++;
        r += rowDir;
        c += colDir;
    }
    
    return count;
}

// Check for draw
function checkDraw() {
    for (let col = 0; col < COLS; col++) {
        if (board[0][col] === null) return false;
    }
    return true;
}

// Type Chart Modal
const typeChartBtn = document.getElementById('typeChartBtn');
const typeChartModal = document.getElementById('typeChartModal');
const closeTypeChart = document.getElementById('closeTypeChart');
const typeChartDisplay = document.getElementById('typeChartDisplay');

function generateTypeChart() {
    const matrix = document.createElement('div');
    matrix.className = 'type-matrix';
    
    // Corner cell
    const corner = document.createElement('div');
    corner.className = 'matrix-cell matrix-header corner';
    corner.textContent = 'ATK →\nDEF ↓';
    corner.style.fontSize = '9px';
    corner.style.lineHeight = '1.2';
    matrix.appendChild(corner);
    
    // Header row (defending types)
    TYPES.forEach(type => {
        const headerCell = document.createElement('div');
        headerCell.className = 'matrix-cell matrix-header';
        headerCell.innerHTML = `<img src="${TYPE_ICONS[type]}" alt="${type}" title="${type}">`;
        matrix.appendChild(headerCell);
    });
    
    // Data rows
    TYPES.forEach(attackType => {
        // Row header (attacking type)
        const rowHeader = document.createElement('div');
        rowHeader.className = 'matrix-cell matrix-header matrix-row-header';
        rowHeader.innerHTML = `<img src="${TYPE_ICONS[attackType]}" alt="${attackType}"> ${attackType.substring(0, 3).toUpperCase()}`;
        matrix.appendChild(rowHeader);
        
        // Effectiveness cells
        TYPES.forEach(defenseType => {
            const cell = document.createElement('div');
            cell.className = 'matrix-cell';
            
            const effectiveness = getEffectiveness(attackType, defenseType);
            
            if (effectiveness === 2) {
                cell.innerHTML = '<span class="effectiveness-cell super">+</span>';
                cell.title = `${attackType} is super effective against ${defenseType}`;
            } else if (effectiveness === 0.5) {
                cell.innerHTML = '<span class="effectiveness-cell weak">−</span>';
                cell.title = `${attackType} is not very effective against ${defenseType}`;
            } else if (effectiveness === 0) {
                cell.innerHTML = '<span class="effectiveness-cell immune">×</span>';
                cell.title = `${attackType} has no effect on ${defenseType}`;
            } else {
                cell.innerHTML = '';
                cell.title = `${attackType} has normal effectiveness against ${defenseType}`;
            }
            
            matrix.appendChild(cell);
        });
    });
    
    typeChartDisplay.innerHTML = '';
    typeChartDisplay.appendChild(matrix);
}

typeChartBtn.addEventListener('click', () => {
    generateTypeChart();
    typeChartModal.style.display = 'block';
});

closeTypeChart.addEventListener('click', () => {
    typeChartModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === typeChartModal) {
        typeChartModal.style.display = 'none';
    }
    if (event.target === helpModal) {
        helpModal.style.display = 'none';
    }
    if (event.target === logsModal) {
        logsModal.style.display = 'none';
    }
});

// Assist mode toggles
redAssistBtn.addEventListener('click', () => {
    redAssistActive = !redAssistActive;
    if (redAssistActive) {
        redAssistBtn.classList.add('active');
        redAssistInfo.style.display = 'block';
        if (currentPlayer === 'red') {
            redAssistInfo.innerHTML = generateAssistInfo(currentPieceType);
        }
    } else {
        redAssistBtn.classList.remove('active');
        redAssistInfo.style.display = 'none';
    }
});

blueAssistBtn.addEventListener('click', () => {
    blueAssistActive = !blueAssistActive;
    if (blueAssistActive) {
        blueAssistBtn.classList.add('active');
        blueAssistInfo.style.display = 'block';
        if (currentPlayer === 'blue') {
            blueAssistInfo.innerHTML = generateAssistInfo(currentPieceType);
        }
    } else {
        blueAssistBtn.classList.remove('active');
        blueAssistInfo.style.display = 'none';
    }
});

// Help modal
const helpBtn = document.getElementById('helpBtn');
const helpModal = document.getElementById('helpModal');
const closeHelp = document.getElementById('closeHelp');

helpBtn.addEventListener('click', () => {
    helpModal.style.display = 'block';
});

closeHelp.addEventListener('click', () => {
    helpModal.style.display = 'none';
});

// Logs modal
const logsBtn = document.getElementById('logsBtn');
const logsModal = document.getElementById('logsModal');
const closeLogs = document.getElementById('closeLogs');
const logsList = document.getElementById('logsList');

logsBtn.addEventListener('click', () => {
    updateLogDisplay();
    logsModal.style.display = 'block';
});

closeLogs.addEventListener('click', () => {
    logsModal.style.display = 'none';
});

function updateLogDisplay() {
    logsList.innerHTML = gameLogs.map((log, index) => {
        let logClass = 'normal';
        if (log.includes('Super Effective')) logClass = 'super';
        else if (log.includes('Not Very Effective')) logClass = 'weak';
        else if (log.includes('Immunity') || log.includes('No Effect')) logClass = 'immune';
        
        return `<div class="log-entry ${logClass}">${index + 1}. ${log}</div>`;
    }).join('');
}

window.addEventListener('click', (event) => {
    if (event.target === helpModal) {
        helpModal.style.display = 'none';
    }
    if (event.target === logsModal) {
        logsModal.style.display = 'none';
    }
});

// Reset game
resetBtn.addEventListener('click', initGame);

// Start the game
initGame();
