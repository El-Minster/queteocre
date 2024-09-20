const tiles = document.querySelectorAll('.iso-tile');
const colorButtons = document.querySelectorAll('.color-button');
const sizeButtons = document.querySelectorAll('.size-button');
const resetButton = document.getElementById('resetButton');
let selectedTile = null;
let selectedColor = null;
let selectedSize = null;

// Listener único para manejar los clics en las casillas
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('iso-tile')) {
        selectedTile = e.target; // Seleccionar la casilla al hacer clic

        // Eliminar cualquier span existente dentro de la casilla
        let existingSpan = selectedTile.querySelector('span');
        if (existingSpan) {
            selectedTile.removeChild(existingSpan); // Eliminar el emoticono existente
        }

        // Aplicar color seleccionado
        if (selectedColor) {
            selectedTile.style.backgroundColor = selectedColor;
        }

        // Reemplazar o agregar emoticono
        if (selectedSize) {
            const newSpan = document.createElement('span');
            newSpan.textContent = selectedSize; // Agregar emoticono
            newSpan.style.fontSize = '36px'; // Tamaño consistente
            selectedTile.appendChild(newSpan); // Añadir nuevo emoticono
        }
    }
});

// Cambiar el color seleccionado al hacer clic en los botones de color
colorButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        selectedColor = e.target.dataset.color;
        selectedSize = null; // Quitar selección de tamaño

        // Resaltar el botón seleccionado
        colorButtons.forEach(btn => btn.style.border = 'none'); // Resetear borde
        e.target.style.border = '2px solid black'; // Resaltar

        // Resetear borde de los botones de tamaño
        sizeButtons.forEach(btn => btn.style.border = 'none');
    });
});

// Cambiar el tamaño seleccionado al hacer clic en los botones de tamaño
sizeButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        selectedSize = e.target.dataset.size;

        // Resaltar el botón seleccionado
        sizeButtons.forEach(btn => btn.style.border = 'none'); // Resetear borde
        e.target.style.border = '2px solid black'; // Resaltar
    });
});

// Resetear todas las casillas al color original y eliminar texto
resetButton.addEventListener('click', () => {
    tiles.forEach(tile => {
        tile.style.backgroundColor = '#a19b5e'; // Color original
        const textSpan = tile.querySelector('span');
        if (textSpan) {
            tile.removeChild(textSpan);
        }
    });
    selectedColor = null; // Resetear color seleccionado
    selectedSize = null; // Resetear tamaño seleccionado
});

// Quitar selecciones al hacer clic en el botón correspondiente
document.getElementById('clearSelectionButton').addEventListener('click', () => {
    selectedColor = null; // Resetear color seleccionado
    selectedSize = null; // Resetear tamaño seleccionado

    // También puedes quitar el borde resaltado de los botones
    colorButtons.forEach(btn => btn.style.border = 'none');
    sizeButtons.forEach(btn => btn.style.border = 'none');
});
