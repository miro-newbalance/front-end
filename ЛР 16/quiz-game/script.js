// ============================
// КЛАСС ИГРЫ (ООП)
// ============================

class GuessNumberGame {
    constructor() {
        // Приватные свойства (инкапсуляция)
        this._secretNumber = null;
        this._attempts = 0;
        this._maxAttempts = 20;
        this._minRange = 1;
        this._maxRange = 100;
        this._gameOver = false;
        this._history = [];
        
        // Инициализация
        this._startNewGame();
        this._bindEvents();
        this._updateDisplay();
    }
    
    // Приватный метод - новая игра
    _startNewGame() {
        this._secretNumber = Math.floor(Math.random() * (this._maxRange - this._minRange + 1)) + this._minRange;
        this._attempts = 0;
        this._gameOver = false;
        this._history = [];
        console.log(`Загадано число: ${this._secretNumber}`); // Для отладки
    }
    
    // Приватный метод - проверка числа
    _checkGuess(userGuess) {
        if (this._gameOver) return;
        
        // Преобразуем в число
        const guess = parseInt(userGuess);
        
        // Проверка валидности
        if (isNaN(guess) || guess < this._minRange || guess > this._maxRange) {
            this._showMessage('Пожалуйста, введи число от 1 до 100!');
            return;
        }
        
        // Увеличиваем счетчик попыток
        this._attempts++;
        
        // Сравниваем с загаданным числом
        if (guess === this._secretNumber) {
            this._gameOver = true;
            this._addToHistory(guess, 'Правильно!');
            this._showMessage(`🎉 Поздравляю! Ты угадал число ${this._secretNumber} за ${this._attempts} попыток!`);
        } else if (guess < this._secretNumber) {
            this._addToHistory(guess, 'Слишком мало!');
            this._showMessage(`📉 Слишком мало! Попробуй больше.`);
        } else {
            this._addToHistory(guess, 'Слишком много!');
            this._showMessage(`📈 Слишком много! Попробуй меньше.`);
        }
        
        // Проверка на превышение попыток
        if (!this._gameOver && this._attempts >= this._maxAttempts) {
            this._gameOver = true;
            this._showMessage(`❌ Игра окончена! Число было: ${this._secretNumber}`);
        }
        
        this._updateDisplay();
    }
    
    // Приватный метод - подсказка
    _giveHint() {
        if (this._gameOver) return;
        
        const hints = [
            `Число ${this._secretNumber % 2 === 0 ? 'чётное' : 'нечётное'}`,
            `Число ${this._secretNumber > 50 ? 'больше' : 'меньше или равно'} 50`,
            `Сумма цифр: ${String(this._secretNumber).split('').reduce((a, b) => parseInt(a) + parseInt(b), 0)}`,
            `Последняя цифра: ${this._secretNumber % 10}`
        ];
        
        const randomHint = hints[Math.floor(Math.random() * hints.length)];
        this._showMessage(`💡 Подсказка: ${randomHint}`);
    }
    
    // Приватный метод - добавить в историю
    _addToHistory(guess, result) {
        this._history.unshift({
            guess,
            result,
            attempt: this._attempts
        });
        
        // Ограничиваем историю последними 10 попытками
        if (this._history.length > 10) {
            this._history = this._history.slice(0, 10);
        }
    }
    
    // Приватный метод - показать сообщение
    _showMessage(text) {
        const messageEl = document.getElementById('message');
        messageEl.textContent = text;
        messageEl.style.color = this._getMessageColor(text);
    }
    
    // Приватный метод - цвет сообщения
    _getMessageColor(text) {
        if (text.includes('🎉')) return '#2ecc71';
        if (text.includes('❌')) return '#e74c3c';
        if (text.includes('📉')) return '#3498db';
        if (text.includes('📈')) return '#e67e22';
        return '#333';
    }
    
    // Приватный метод - обновить отображение
    _updateDisplay() {
        document.getElementById('attempts-count').textContent = this._attempts;
        document.getElementById('range').textContent = `${this._minRange}-${this._maxRange}`;
        
        // Обновить историю
        const historyEl = document.getElementById('history');
        historyEl.innerHTML = this._history.map(item => `
            <div class="history-item ${item.result === 'Правильно!' ? 'correct' : ''}">
                <span>Попытка ${item.attempt}: <strong>${item.guess}</strong></span>
                <span class="${item.result === 'Слишком мало!' ? 'low' : 'high'}">
                    ${item.result}
                </span>
            </div>
        `).join('');
        
        // Очистить поле ввода
        document.getElementById('guess-input').value = '';
        document.getElementById('guess-input').focus();
    }
    
    // Приватный метод - обработка событий
    _bindEvents() {
        document.getElementById('guess-btn').addEventListener('click', () => {
            const input = document.getElementById('guess-input');
            this._checkGuess(input.value);
        });
        
        document.getElementById('guess-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this._checkGuess(e.target.value);
            }
        });
        
        document.getElementById('hint-btn').addEventListener('click', () => {
            this._giveHint();
        });
        
        document.getElementById('new-game-btn').addEventListener('click', () => {
            this._startNewGame();
            this._showMessage('Новая игра! Угадай число от 1 до 100');
            this._updateDisplay();
        });
        
        document.getElementById('easy-btn').addEventListener('click', () => {
            this._maxAttempts = 10;
            this._startNewGame();
            this._showMessage('Легкий режим! У тебя 10 попыток');
            this._updateDisplay();
        });
    }
}

// ============================
// ЗАПУСК ИГРЫ
// ============================

// Запускаем игру когда страница загрузится
document.addEventListener('DOMContentLoaded', () => {
    const game = new GuessNumberGame();
    
    // Для отладки - доступ к игре из консоли
    window.game = game;
    console.log('🎮 Игра "Угадай число" запущена!');
    console.log('Доступные команды:');
    console.log('- game._checkGuess(число) - проверить число');
    console.log('- game._giveHint() - получить подсказку');
    console.log('- game._startNewGame() - начать новую игру');
});