const dragItem = document.getElementById('drag-item');
const dropZone = document.getElementById('drop-zone');

// Элемент для перетаскивания
draggableElement.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', e.target.id);
    console.log('Начало перетаскивания');
});

// Зона для сброса
dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('drag-over');
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    const element = document.getElementById(id);
    dropZone.appendChild(element);
    console.log('Элемент сброшен');
});