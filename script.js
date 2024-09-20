const tiles = document.querySelectorAll('.iso-tile');
const colorButtons = document.querySelectorAll('.color-button');
const sizeButtons = document.querySelectorAll('.size-button');
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
    }
});


colorButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        selectedColor = e.target.dataset.color;
        selectedSize = null;

        
        colorButtons.forEach(btn => btn.style.border = 'none');
        e.target.style.border = '2px solid black';

        
        sizeButtons.forEach(btn => btn.style.border = 'none');
    });
});


sizeButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        selectedSize = e.target.dataset.size;

        
        sizeButtons.forEach(btn => btn.style.border = 'none'); 
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

ndiente
document.getElementById('clearSelectionButton').addEventListener('click', () => {
    selectedColor = null;
    selectedSize = null;

    
    colorButtons.forEach(btn => btn.style.border = 'none');
    sizeButtons.forEach(btn => btn.style.border = 'none');
});
