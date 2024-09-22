const tiles = document.querySelectorAll('.iso-tile');
const colorButtons = document.querySelectorAll('.color-button');
const resetButton = document.getElementById('resetButton');
const undoButton = document.getElementById('undoButton');
let selectedColor = null;
let selectedSize = null;
let history = [];

function saveTileState(tile) {
    const bgColor = tile.style.backgroundColor;
    const sizeSpan = tile.querySelector('span');
    const sizeText = sizeSpan ? sizeSpan.textContent : null;

    history.push({ tile, bgColor, sizeText });
}

function restoreTileState(state) {
    state.tile.style.backgroundColor = state.bgColor;
    const textSpan = state.tile.querySelector('span');
    if (textSpan) {
        state.tile.removeChild(textSpan);
    }

    removeConflictLines(state.tile);
}

function addConflictLines(tile) {
    tile.classList.add('conflict');
}

function removeConflictLines(tile) {
    tile.classList.remove('conflict');
}

function checkDuplicateTiles() {
    const tileMap = {};
    
    tiles.forEach(tile => {
        const bgColor = tile.style.backgroundColor;
        const sizeSpan = tile.querySelector('span');
        const sizeText = sizeSpan ? sizeSpan.textContent : null;

        if (bgColor && sizeText) {
            const tileKey = `${bgColor}-${sizeText}`;

            if (tileMap[tileKey]) {
                addConflictLines(tileMap[tileKey]);
                addConflictLines(tile);
            } else {
                tileMap[tileKey] = tile;
            }
        }
    });

    tiles.forEach(tile => {
        const bgColor = tile.style.backgroundColor;
        const sizeSpan = tile.querySelector('span');
        const sizeText = sizeSpan ? sizeSpan.textContent : null;

        if (bgColor && sizeText) {
            const tileKey = `${bgColor}-${sizeText}`;
            if (!tileMap[tileKey]) {
                removeConflictLines(tile);
            }
        }
    });
}

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('iso-tile')) {
        const selectedTile = e.target;

        saveTileState(selectedTile);

        if (selectedColor) {
            selectedTile.style.backgroundColor = selectedColor;
        }

        if (selectedSize) {
            const existingSpan = selectedTile.querySelector('span');
            if (existingSpan) {
                selectedTile.removeChild(existingSpan);
            }
            const newSpan = document.createElement('span');
            newSpan.textContent = selectedSize;
            newSpan.style.fontSize = '36px';
            selectedTile.appendChild(newSpan);
        }

        checkDuplicateTiles();
    }
});

colorButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        selectedColor = e.target.dataset.color;
        selectedSize = e.target.dataset.size;

        colorButtons.forEach(btn => btn.style.border = 'none');
        e.target.style.border = '2px solid black';
    });
});

undoButton.addEventListener('click', () => {
    if (history.length > 0) {
        const lastState = history.pop();
        restoreTileState(lastState);

        checkDuplicateTiles();
    }
});

resetButton.addEventListener('click', () => {
    tiles.forEach(tile => {
        tile.style.backgroundColor = '#a19b5e';
        removeConflictLines(tile);

        const textSpan = tile.querySelector('span');
        if (textSpan) tile.removeChild(textSpan);
    });
    history = [];
    selectedColor = null;
    selectedSize = null;
});
