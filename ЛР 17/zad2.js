const element = document.getElementById('keyboard-input');

document.addEventListener('keydown', (e) => {
    console.log('Клавиша нажата:', e.key, 'Код:', e.code);
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        console.log('Ctrl+S - сохранение');
    }
});

document.addEventListener('keyup', (e) => console.log('Клавиша отпущена:', e.key));