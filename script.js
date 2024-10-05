let selectedImage = null;
const gridItems = document.querySelectorAll('.grid-item');
const leftItems = document.querySelectorAll('.left-item');
let actionHistory = [];

leftItems.forEach(item => {
    item.addEventListener('click', () => {
        leftItems.forEach(i => i.classList.remove('selected'));

        item.classList.add('selected');
        
        selectedImage = item.getAttribute('data-image');
    });
});

gridItems.forEach(item => {
    item.addEventListener('click', () => {
        if (selectedImage) {
            const existingImg = item.querySelector('img');

            if (existingImg) {
                existingImg.src = `img/${selectedImage}.png`;
                item.setAttribute('data-image', selectedImage);
                
                actionHistory.push({ type: 'replace', item: item, previousImage: existingImg.src, newImage: selectedImage });
            } else {
                const img = document.createElement('img');
                img.src = `img/${selectedImage}.png`;
                img.style.width = '100%';
                img.style.height = '100%';
                img.style.transform = 'rotate(-45deg)';
                item.appendChild(img);
                item.setAttribute('data-image', selectedImage);

                actionHistory.push({ type: 'place', item: item, image: selectedImage });
            }

            checkForMatch();
        }
    });
});

function checkForMatch() {
    const filledItems = [...gridItems].filter(item => item.querySelector('img'));

    const imageCount = {};

    filledItems.forEach(item => {
        const image = item.getAttribute('data-image');
        if (imageCount[image]) {
            imageCount[image].push(item);
        } else {
            imageCount[image] = [item];
        }
    });

    Object.keys(imageCount).forEach(image => {
        if (imageCount[image].length === 8) {
            imageCount[image].forEach(item => {
                item.style.backgroundColor = 'black';

                const xImg = document.createElement('img');
                xImg.src = 'img/x.png';
                xImg.classList.add('overlay');
                xImg.style.opacity = '0.5';
                xImg.style.position = 'absolute';
                xImg.style.width = '30px';
                xImg.style.height = '30px';
                xImg.style.top = '5px';
                xImg.style.right = '5px';
                item.appendChild(xImg);
                actionHistory.push({ type: 'overlay', item: item, image: 'x' });
            });
        }
    });
}

document.getElementById('reset').addEventListener('click', () => {
    gridItems.forEach(item => {
        item.innerHTML = '';
        item.removeAttribute('data-image');
        item.style.backgroundColor = '';
    });

    leftItems.forEach(i => i.classList.remove('selected'));
    selectedImage = null;
    actionHistory = [];
});

document.getElementById('undo').addEventListener('click', () => {
    if (actionHistory.length > 0) {
        const lastAction = actionHistory.pop();

        if (lastAction.type === 'place') {
            lastAction.item.innerHTML = '';
            lastAction.item.removeAttribute('data-image');
            lastAction.item.style.backgroundColor = '';
        } else if (lastAction.type === 'replace') {
            const img = lastAction.item.querySelector('img');
            img.src = lastAction.previousImage;
            lastAction.item.setAttribute('data-image', lastAction.previousImage.split('/').pop().split('.')[0]);
        } else if (lastAction.type === 'overlay') {
            const overlayImg = lastAction.item.querySelector('.overlay');
            if (overlayImg) {
                overlayImg.remove();
            }
            lastAction.item.style.backgroundColor = '';
        }
    }
});
