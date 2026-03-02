const element = document.getElementById('mouse-area');

element.addEventListener('click', (e) => console.log('Клик', e));
element.addEventListener('dblclick', (e) => console.log('Двойной клик', e));
element.addEventListener('mousedown', (e) => console.log('Кнопка нажата', e.button));
element.addEventListener('mouseup', (e) => console.log('Кнопка отпущена'));
element.addEventListener('mousemove', (e) => console.log('Движение', e.clientX, e.clientY));
element.addEventListener('mouseenter', () => console.log('Курсор вошел'));
element.addEventListener('mouseleave', () => console.log('Курсор вышел'));