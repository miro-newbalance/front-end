
// Получаем элементы
const timerDisplay = document.getElementById('timer-display');
const startBtn = document.getElementById('start-timer');
const stopBtn = document.getElementById('stop-timer');
const resetBtn = document.getElementById('reset-timer');

// Переменные для управления таймерами
let timeoutId = null;
let intervalId = null;
let animationId = null;
let seconds = 0;
let isRunning = false;

// Функция обновления отображения
function updateTimerDisplay() {
    timerDisplay.textContent = seconds;
    
    // Обновляем статус
    const statusElement = document.getElementById('timer-status');
    if (statusElement) {
        statusElement.textContent = isRunning ? 'Таймер запущен' : 'Таймер остановлен';
        statusElement.style.color = isRunning ? '#27ae60' : '#e74c3c';
    }
    
    // Меняем цвет цифр
    timerDisplay.style.color = isRunning ? '#27ae60' : '#e74c3c';
}

// 1. setTimeout - однократное выполнение (по кнопке)
function startTimeout() {
    logEvent('Таймер', 'Запуск setTimeout (2 сек)');
    timeoutId = setTimeout(() => {
        logEvent('Таймер', '✅ Выполнено через 2 секунды');
        timeoutId = null;
    }, 2000);
}

// 2. setInterval - повторяющееся выполнение (основной таймер)
function startInterval() {
    if (!isRunning) {
        isRunning = true;
        intervalId = setInterval(() => {
            seconds++;
            updateTimerDisplay();
            
            // Логируем каждые 5 секунд
            if (seconds % 5 === 0) {
                logEvent('Таймер', `Прошло ${seconds} секунд`);
            }
        }, 1000);
        logEvent('Таймер', 'Интервал запущен (1 сек)');
    }
}

// 3. Остановка таймеров
function stopInterval() {
    if (isRunning) {
        isRunning = false;
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
        logEvent('Таймер', `Интервал остановлен на ${seconds} секунде`);
        updateTimerDisplay();
    }
}

// 4. Сброс таймера
function resetTimer() {
    stopInterval();
    seconds = 0;
    updateTimerDisplay();
    
    // Останавливаем setTimeout если он активен
    if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
    }
    
    // Останавливаем анимацию если она активна
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
    
    logEvent('Таймер', 'Таймер сброшен');
}

// 5. requestAnimationFrame - для анимаций
function startAnimation() {
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
    
    let startTime = Date.now();
    const originalColor = timerDisplay.style.color;
    
    function animate() {
        const elapsed = Date.now() - startTime;
        const value = Math.sin(elapsed / 1000) * 0.5 + 0.5; // от 0 до 1
        
        // Плавное изменение цвета
        const hue = value * 360;
        timerDisplay.style.color = `hsl(${hue}, 100%, 50%)`;
        
        // Продолжаем анимацию 5 секунд
        if (elapsed < 5000) {
            animationId = requestAnimationFrame(animate);
        } else {
            timerDisplay.style.color = originalColor;
            animationId = null;
            logEvent('Таймер', 'Анимация завершена');
        }
    }
    
    animate();
    logEvent('Таймер', 'Анимация запущена (5 сек)');
}

// Назначаем обработчики кнопкам
if (startBtn) {
    startBtn.addEventListener('click', () => {
        startInterval();
        startTimeout(); // Запускаем однократный таймер
        startAnimation(); // Запускаем анимацию
    });
}

if (stopBtn) {
    stopBtn.addEventListener('click', stopInterval);
}

if (resetBtn) {
    resetBtn.addEventListener('click', resetTimer);
}

// Инициализация
updateTimerDisplay();
logEvent('Таймер', 'Модуль таймера загружен');

// Делаем функции доступными глобально (если нужно вызывать из HTML)
window.startTimer = startInterval;
window.stopTimer = stopInterval;
window.resetTimerFunc = resetTimer;
window.startAnimationTimer = startAnimation;

// Вспомогательная функция (если logEvent не определена)
if (typeof logEvent !== 'function') {
    function logEvent(type, message) {
        console.log(`[${type}] ${message}`);
    }
}