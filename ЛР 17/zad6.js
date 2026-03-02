const element = document.getElementById('touch-area');

element.addEventListener('touchstart', (e) => {
    console.log('Касание начато', e.touches.length);
    e.preventDefault(); // Предотвратить масштабирование
});

element.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    console.log('Движение:', touch.clientX, touch.clientY);
});

element.addEventListener('touchend', () => console.log('Касание завершено'));