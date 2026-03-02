const element = document.getElementById('pointer-area');

element.addEventListener('pointerdown', (e) => {
    console.log('Указатель активирован', e.pointerType);
});

element.addEventListener('pointermove', (e) => {
    console.log('Координаты:', e.clientX, e.clientY);
});

element.addEventListener('pointerup', () => console.log('Указатель деактивирован'));