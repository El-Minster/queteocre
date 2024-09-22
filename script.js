const tiles = document.querySelectorAll('.iso-tile');
const colorButtons = document.querySelectorAll('.color-button');
const resetButton = document.getElementById('resetButton');
let selectedTile = null;
let selectedColor = null;
let selectedSize = null;

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('iso-tile')) {
        selectedTile = e.target;

        let existingSpan = selectedTile.querySelector('span');
        if (existingSpan) {
            selectedTile.removeChild(existingSpan);
        }

        if (selectedColor) {
            selectedTile.style.backgroundColor = selectedColor;
        }

        if (selectedSize) {
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

resetButton.addEventListener('click', () => {
    tiles.forEach(tile => {
        tile.style.backgroundColor = '#a19b5e';
        const textSpan = tile.querySelector('span');
        if (textSpan) {
            tile.removeChild(textSpan);
        }
    });
    selectedColor = null;
    selectedSize = null;
});

function checkDuplicateTiles() {
    const tileMap = {};

    tiles.forEach(tile => {
        const bgColor = tile.style.backgroundColor;
        const sizeSpan = tile.querySelector('span');
        const sizeText = sizeSpan ? sizeSpan.textContent : null;

        if (bgColor && sizeText) {
            const tileKey = `${bgColor}-${sizeText}`;

            if (tileMap[tileKey]) {
                tileMap[tileKey].style.backgroundColor = '#000000';
                tile.style.backgroundColor = '#000000';

                const spanToRemove = tileMap[tileKey].querySelector('span');
                if (spanToRemove) tileMap[tileKey].removeChild(spanToRemove);
                
                const spanToRemoveCurrent = tile.querySelector('span');
                if (spanToRemoveCurrent) tile.removeChild(spanToRemoveCurrent);
            } else {
                tileMap[tileKey] = tile;
            }
        }
    });
}
