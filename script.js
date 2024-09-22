const tiles = document.querySelectorAll('.iso-tile');
const colorButtons = document.querySelectorAll('.color-button');
const resetButton = document.getElementById('resetButton');
const undoButton = document.getElementById('undoButton');
let selectedTile = null;
let selectedColor = null;
let selectedSize = null;
let history = [];

function saveTileState(tile, color, size) {
    const state = {
        tile: tile,
        color: color || '#a19b5e',
        size: size || null
    };
    history.push(state);
}

function restoreTileState(state) {
    const { tile, color, size } = state;
    tile.style.backgroundColor = color;
    const existingSpan = tile.querySelector('span');
    if (existingSpan) {
        tile.removeChild(existingSpan);
    }
    if (size) {
        const newSpan = document.createElement('span');
        newSpan.textContent = size;
        newSpan.style.fontSize = '36px';
        tile.appendChild(newSpan);
    }
}

tiles.forEach(tile => {
    tile.addEventListener('click', (e) => {
        if (selectedColor && selectedSize) {
            saveTileState(tile, tile.style.backgroundColor, tile.querySelector('span')?.textContent);

            tile.style.backgroundColor = selectedColor;
            const existingSpan = tile.querySelector('span');
            if (existingSpan) tile.removeChild(existingSpan);
            
            const newSpan = document.createElement('span');
            newSpan.textContent = selectedSize;
            newSpan.style.fontSize = '36px';
            tile.appendChild(newSpan);

            checkDuplicateTiles();
        }
    });
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
    }
});

function checkDuplicateTiles() {
    const tileMap = {};
    let duplicates = [];

    tiles.forEach(tile => {
        const bgColor = tile.style.backgroundColor;
        const sizeSpan = tile.querySelector('span');
        const sizeText = sizeSpan ? sizeSpan.textContent : null;

        if (bgColor && sizeText) {
            const tileKey = `${bgColor}-${sizeText}`;

            if (tileMap[tileKey]) {
                saveTileState(tileMap[tileKey], tileMap[tileKey].style.backgroundColor, tileMap[tileKey].querySelector('span')?.textContent);
                saveTileState(tile, tile.style.backgroundColor, tile.querySelector('span')?.textContent);

                tileMap[tileKey].style.backgroundColor = '#000000';
                tile.style.backgroundColor = '#000000';

                if (tileMap[tileKey].querySelector('span')) tileMap[tileKey].removeChild(tileMap[tileKey].querySelector('span'));
                if (tile.querySelector('span')) tile.removeChild(tile.querySelector('span'));
                
                duplicates.push(tileMap[tileKey], tile);
            } else {
                tileMap[tileKey] = tile;
            }
        }
    });
}

resetButton.addEventListener('click', () => {
    tiles.forEach(tile => {
        tile.style.backgroundColor = '#a19b5e';
        const textSpan = tile.querySelector('span');
        if (textSpan) tile.removeChild(textSpan);
    });
    history = [];
    selectedColor = null;
    selectedSize = null;
});
