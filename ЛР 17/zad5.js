const element = document.getElementById('scroll-area');

// Для элемента
element.addEventListener('scroll', () => {
    console.log('Прокрутка:', element.scrollTop);
});

// Для окна
window.addEventListener('scroll', () => {
    console.log('Позиция:', window.pageYOffset);
});

// События колеса мыши
element.addEventListener('wheel', (e) => {
    console.log('Прокрутка колесом:', e.deltaY);
    e.preventDefault(); // Отключить стандартную прокрутку
});