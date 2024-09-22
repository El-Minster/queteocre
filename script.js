const tiles = document.querySelectorAll('.iso-tile');
const colorButtons = document.querySelectorAll('.color-button');
const resetButton = document.getElementById('resetButton');
const undoButton = document.getElementById('undoButton'); // Asegúrate de que tienes este botón en el HTML
let selectedColor = null;
let selectedSize = null;
let history = []; // Para almacenar el estado de las celdas

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

    // Quitar líneas de conflicto al restaurar
    removeConflictLines(state.tile);
}

// Añadir líneas sobre las celdas
function addConflictLines(tile) {
    tile.classList.add('conflict');
}

// Quitar líneas de conflicto
function removeConflictLines(tile) {
    tile.classList.remove('conflict');
}

// Comprueba y maneja los duplicados
function checkDuplicateTiles() {
    const tileMap = {};
    
    tiles.forEach(tile => {
        const bgColor = tile.style.backgroundColor;
        const sizeSpan = tile.querySelector('span');
        const sizeText = sizeSpan ? sizeSpan.textContent : null;

        if (bgColor && sizeText) {
            const tileKey = `${bgColor}-${sizeText}`;

            if (tileMap[tileKey]) {
                // Añadir líneas de conflicto
                addConflictLines(tileMap[tileKey]);
                addConflictLines(tile);
            } else {
                tileMap[tileKey] = tile;
            }
        }
    });

    // Eliminar línea de conflicto de celdas que ya no están en conflicto
    tiles.forEach(tile => {
        const bgColor = tile.style.backgroundColor;
        const sizeSpan = tile.querySelector('span');
        const sizeText = sizeSpan ? sizeSpan.textContent : null;

        if (bgColor && sizeText) {
            const tileKey = `${bgColor}-${sizeText}`;
            if (!tileMap[tileKey]) {
                removeConflictLines(tile); // Eliminar línea de conflicto
            }
        }
    });
}

// Evento para seleccionar las celdas
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('iso-tile')) {
        const selectedTile = e.target;

        // Guardar el estado actual antes de cambiar
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

        checkDuplicateTiles(); // Verificar duplicados al seleccionar una celda
    }
});

// Selección de colores
colorButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        selectedColor = e.target.dataset.color;
        selectedSize = e.target.dataset.size;

        colorButtons.forEach(btn => btn.style.border = 'none');
        e.target.style.border = '2px solid black';
    });
});

// Botón Undo
undoButton.addEventListener('click', () => {
    if (history.length > 0) {
        const lastState = history.pop();
        restoreTileState(lastState);

        // Revisar si hay duplicados y actualizar el estado
        checkDuplicateTiles();
    }
});

// Botón Reset
resetButton.addEventListener('click', () => {
    tiles.forEach(tile => {
        tile.style.backgroundColor = '#a19b5e';
        removeConflictLines(tile); // Eliminar la clase de conflicto

        const textSpan = tile.querySelector('span');
        if (textSpan) tile.removeChild(textSpan);
    });
    history = []; // Limpiar el historial
    selectedColor = null;
    selectedSize = null;
});
