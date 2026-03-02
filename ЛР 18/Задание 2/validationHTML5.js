// Валидация формы с использованием HTML5 атрибутов
document.addEventListener('DOMContentLoaded', function() {
    const html5Form = document.getElementById('html5Form');
    const html5SubmitBtn = document.getElementById('html5Submit');
    const html5Results = document.getElementById('html5Results');
    const html5ValidationStatus = document.getElementById('html5ValidationStatus');
    
    // Получаем все поля формы
    const html5Inputs = html5Form.querySelectorAll('input');
    
    // Добавляем обработчики событий для валидации при вводе
    html5Inputs.forEach(input => {
        // Валидация при потере фокуса
        input.addEventListener('blur', function() {
            validateHTML5Field(this);
        });
        
        // Валидация при вводе (для динамической проверки)
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
    
    // Функция для очистки ошибки поля
    function clearFieldError(field) {
        const errorElement = document.getElementById(field.id + 'Error');
        if (errorElement) {
            errorElement.classList.remove('show');
            field.classList.remove('invalid');
        }
    }
    
    // Функция для отображения ошибки поля
    function showFieldError(field, message) {
        const errorElement = document.getElementById(field.id + 'Error');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('show');
            field.classList.add('invalid');
            field.classList.remove('valid');
        }
    }
    
    // Функция для отметки поля как валидного
    function markFieldAsValid(field) {
        const errorElement = document.getElementById(field.id + 'Error');
        if (errorElement) {
            errorElement.classList.remove('show');
            field.classList.remove('invalid');
            field.classList.add('valid');
        }
    }
    
    // Функция валидации отдельного поля HTML5
    function validateHTML5Field(field) {
        // Очищаем предыдущие ошибки
        clearFieldError(field);
        
        // Проверка обязательных полей
        if (field.hasAttribute('required') && !field.value.trim()) {
            showFieldError(field, 'Поле обязательно для заполнения');
            return false;
        }
        
        // Если поле не обязательное и пустое - пропускаем проверку
        if (!field.value.trim() && !field.hasAttribute('required')) {
            markFieldAsValid(field);
            return true;
        }
        
        // Проверка по типу поля
        let isValid = true;
        let errorMessage = '';
        
        switch(field.type) {
            case 'email':
                if (!isValidEmail(field.value)) {
                    isValid = false;
                    errorMessage = 'Введите корректный email адрес';
                }
                break;
                
            case 'number':
                if (field.hasAttribute('min') || field.hasAttribute('max')) {
                    const value = parseInt(field.value);
                    const min = field.hasAttribute('min') ? parseInt(field.getAttribute('min')) : -Infinity;
                    const max = field.hasAttribute('max') ? parseInt(field.getAttribute('max')) : Infinity;
                    
                    if (value < min || value > max) {
                        isValid = false;
                        errorMessage = `Значение должно быть от ${min} до ${max}`;
                    }
                }
                break;
                
            case 'tel':
                if (field.hasAttribute('pattern')) {
                    const pattern = new RegExp(field.getAttribute('pattern'));
                    if (!pattern.test(field.value)) {
                        isValid = false;
                        errorMessage = 'Номер телефона должен соответствовать формату: +7 900 123 45 67';
                    }
                }
                break;
                
            case 'url':
                if (!isValidUrl(field.value)) {
                    isValid = false;
                    errorMessage = 'Введите корректный URL адрес';
                }
                break;
                
            case 'password':
                if (field.hasAttribute('minlength')) {
                    const minLength = parseInt(field.getAttribute('minlength'));
                    if (field.value.length < minLength) {
                        isValid = false;
                        errorMessage = `Пароль должен содержать не менее ${minLength} символов`;
                    }
                }
                break;
        }
        
        // Проверка пользовательских валидаций через Constraint Validation API
        if (field.willValidate) {
            if (!field.checkValidity()) {
                isValid = false;
                errorMessage = field.validationMessage;
            }
        }
        
        // Отображаем результат валидации
        if (isValid) {
            markFieldAsValid(field);
        } else {
            showFieldError(field, errorMessage);
        }
        
        return isValid;
    }
    
    // Функция проверки email с помощью регулярного выражения
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Функция проверки URL
    function isValidUrl(url) {
        try {
            new URL(url);
            return true;
        } catch (e) {
            return false;
        }
    }
    
    // Функция для валидации всей формы HTML5
    function validateHTML5Form() {
        let isFormValid = true;
        const validationResults = {};
        
        // Проверяем каждое поле
        html5Inputs.forEach(input => {
            const isValid = validateHTML5Field(input);
            isFormValid = isFormValid && isValid;
            
            // Сохраняем результат валидации
            validationResults[input.name] = {
                value: input.value,
                isValid: isValid
            };
        });
        
        // Отображаем общий статус валидации
        if (isFormValid) {
            html5ValidationStatus.textContent = '✅ Форма прошла валидацию HTML5 успешно!';
            html5ValidationStatus.className = 'validation-status valid';
            
            // Отображаем результаты
            displayHTML5Results(validationResults);
        } else {
            html5ValidationStatus.textContent = '❌ Форма содержит ошибки. Пожалуйста, исправьте их.';
            html5ValidationStatus.className = 'validation-status invalid';
        }
        
        return isFormValid;
    }
    
    // Функция для отображения результатов валидации HTML5
    function displayHTML5Results(results) {
        let resultsHTML = '<h3>Результаты валидации HTML5:</h3>';
        resultsHTML += '<ul>';
        
        for (const [fieldName, data] of Object.entries(results)) {
            const statusIcon = data.isValid ? '✅' : '❌';
            const statusText = data.isValid ? 'Валидно' : 'Не валидно';
            
            resultsHTML += `<li>${fieldName}: ${data.value || '(пусто)'} - ${statusIcon} ${statusText}</li>`;
        }
        
        resultsHTML += '</ul>';
        resultsHTML += '<p>Все проверки выполнены с использованием HTML5 атрибутов валидации.</p>';
        
        html5Results.innerHTML = resultsHTML;
    }
    
    // Обработчик отправки формы HTML5
    html5SubmitBtn.addEventListener('click', function(e) {
        e.preventDefault();
        validateHTML5Form();
    });
    
    // Инициализация при загрузке
    console.log('HTML5 валидация инициализирована');
});