// Кастомная валидация формы с использованием JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const jsForm = document.getElementById('jsForm');
    const jsValidateBtn = document.getElementById('jsValidateBtn');
    const jsRealTimeBtn = document.getElementById('jsRealTimeBtn');
    const jsResults = document.getElementById('jsResults');
    const jsValidationStatus = document.getElementById('jsValidationStatus');
    
    // Получаем элементы формы
    const jsUsername = document.getElementById('jsUsername');
    const jsEmail = document.getElementById('jsEmail');
    const jsPassword = document.getElementById('jsPassword');
    const jsPhone = document.getElementById('jsPhone');
    const jsDate = document.getElementById('jsDate');
    const jsComments = document.getElementById('jsComments');
    const charCount = document.getElementById('charCount');
    const interestsCheckboxes = jsForm.querySelectorAll('input[name="interests"]');
    
    // Переменная для отслеживания режима реального времени
    let realTimeValidation = false;
    
    // 1. Валидация имени пользователя
    function validateUsername() {
        const value = jsUsername.value.trim();
        const errorElement = document.getElementById('jsUsernameError');
        
        // Проверка на пустое значение
        if (!value) {
            showError(jsUsername, errorElement, 'Имя пользователя обязательно для заполнения');
            return false;
        }
        
        // Проверка длины
        if (value.length < 3 || value.length > 20) {
            showError(jsUsername, errorElement, 'Имя пользователя должно быть от 3 до 20 символов');
            return false;
        }
        
        // Проверка допустимых символов (только буквы и цифры)
        const usernameRegex = /^[a-zA-Z0-9]+$/;
        if (!usernameRegex.test(value)) {
            showError(jsUsername, errorElement, 'Имя пользователя может содержать только буквы и цифры');
            return false;
        }
        
        // Если все проверки пройдены
        clearError(jsUsername, errorElement);
        return true;
    }
    
    // 2. Валидация email
    function validateEmail() {
        const value = jsEmail.value.trim();
        const errorElement = document.getElementById('jsEmailError');
        
        // Проверка на пустое значение
        if (!value) {
            showError(jsEmail, errorElement, 'Email обязателен для заполнения');
            return false;
        }
        
        // Проверка формата email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showError(jsEmail, errorElement, 'Введите корректный email адрес (например: user@example.com)');
            return false;
        }
        
        // Проверка домена (дополнительная проверка)
        const domain = value.split('@')[1];
        const invalidDomains = ['example.com', 'test.com', 'mailinator.com'];
        if (invalidDomains.includes(domain.toLowerCase())) {
            showError(jsEmail, errorElement, 'Пожалуйста, используйте реальный email адрес');
            return false;
        }
        
        // Если все проверки пройдены
        clearError(jsEmail, errorElement);
        return true;
    }
    
    // 3. Валидация пароля
    function validatePassword() {
        const value = jsPassword.value;
        const errorElement = document.getElementById('jsPasswordError');
        
        // Проверка на пустое значение
        if (!value) {
            showError(jsPassword, errorElement, 'Пароль обязателен для заполнения');
            updatePasswordRequirements(false, false, false, false, false);
            updatePasswordStrength(0);
            return false;
        }
        
        // Проверки сложности пароля
        const hasMinLength = value.length >= 8;
        const hasUppercase = /[A-Z]/.test(value);
        const hasLowercase = /[a-z]/.test(value);
        const hasNumber = /\d/.test(value);
        const hasSpecial = /[!@#$%^&*]/.test(value);
        
        // Обновляем отображение требований
        updatePasswordRequirements(hasMinLength, hasUppercase, hasLowercase, hasNumber, hasSpecial);
        
        // Проверяем, удовлетворяет ли пароль всем требованиям
        let isValid = true;
        let errorMessages = [];
        
        if (!hasMinLength) {
            errorMessages.push('не менее 8 символов');
            isValid = false;
        }
        if (!hasUppercase) {
            errorMessages.push('хотя бы одну заглавную букву');
            isValid = false;
        }
        if (!hasLowercase) {
            errorMessages.push('хотя бы одну строчную букву');
            isValid = false;
        }
        if (!hasNumber) {
            errorMessages.push('хотя бы одну цифру');
            isValid = false;
        }
        if (!hasSpecial) {
            errorMessages.push('хотя бы один специальный символ (!@#$%^&*)');
            isValid = false;
        }
        
        // Расчет силы пароля
        let strength = 0;
        if (hasMinLength) strength += 20;
        if (hasUppercase) strength += 20;
        if (hasLowercase) strength += 20;
        if (hasNumber) strength += 20;
        if (hasSpecial) strength += 20;
        
        updatePasswordStrength(strength);
        
        if (!isValid) {
            const errorMessage = 'Пароль должен содержать: ' + errorMessages.join(', ');
            showError(jsPassword, errorElement, errorMessage);
            return false;
        }
        
        // Если все проверки пройдены
        clearError(jsPassword, errorElement);
        return true;
    }
    
    // Функция для обновления отображения требований к паролю
    function updatePasswordRequirements(hasLength, hasUpper, hasLower, hasNumber, hasSpecial) {
        updateRequirement('lengthReq', hasLength);
        updateRequirement('uppercaseReq', hasUpper);
        updateRequirement('lowercaseReq', hasLower);
        updateRequirement('numberReq', hasNumber);
        updateRequirement('specialReq', hasSpecial);
    }
    
    // Функция для обновления одного требования
    function updateRequirement(elementId, isMet) {
        const element = document.getElementById(elementId);
        if (element) {
            if (isMet) {
                element.classList.add('met');
                element.classList.remove('unmet');
                element.querySelector('.requirement-icon').textContent = '✅';
            } else {
                element.classList.add('unmet');
                element.classList.remove('met');
                element.querySelector('.requirement-icon').textContent = '❌';
            }
        }
    }
    
    // Функция для обновления индикатора силы пароля
    function updatePasswordStrength(strength) {
        const strengthBar = document.getElementById('passwordStrengthBar');
        if (strengthBar) {
            strengthBar.style.width = strength + '%';
            
            // Изменение цвета в зависимости от силы
            if (strength < 40) {
                strengthBar.style.backgroundColor = '#e74c3c'; // Красный
            } else if (strength < 80) {
                strengthBar.style.backgroundColor = '#f39c12'; // Оранжевый
            } else {
                strengthBar.style.backgroundColor = '#2ecc71'; // Зеленый
            }
        }
    }
    
    // 4. Валидация телефона
    function validatePhone() {
        const value = jsPhone.value.trim();
        const errorElement = document.getElementById('jsPhoneError');
        
        // Если поле не обязательно и пустое - пропускаем проверку
        if (!value) {
            clearError(jsPhone, errorElement);
            return true;
        }
        
        // Различные форматы номеров телефонов
        const phonePatterns = [
            /^\+7\s?[0-9]{3}\s?[0-9]{3}\s?[0-9]{2}\s?[0-9]{2}$/, // +7 900 123 45 67
            /^8\s?[0-9]{3}\s?[0-9]{3}\s?[0-9]{2}\s?[0-9]{2}$/,   // 8 900 123 45 67
            /^[0-9]{10}$/,                                        // 9001234567
            /^\+?[0-9]{1,3}\s?\(?[0-9]{3}\)?\s?[0-9]{3}\s?[0-9]{2}\s?[0-9]{2}$/ // Международный формат
        ];
        
        // Проверяем все форматы
        const isValid = phonePatterns.some(pattern => pattern.test(value));
        
        if (!isValid) {
            showError(jsPhone, errorElement, 'Введите корректный номер телефона. Примеры: +7 900 123 45 67, 89001234567');
            return false;
        }
        
        // Если все проверки пройдены
        clearError(jsPhone, errorElement);
        return true;
    }
    
    // 5. Валидация даты
    function validateDate() {
        const value = jsDate.value.trim();
        const errorElement = document.getElementById('jsDateError');
        
        // Если поле не обязательно и пустое - пропускаем проверку
        if (!value) {
            clearError(jsDate, errorElement);
            return true;
        }
        
        // Проверка формата ДД.ММ.ГГГГ
        const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/;
        if (!dateRegex.test(value)) {
            showError(jsDate, errorElement, 'Дата должна быть в формате ДД.ММ.ГГГГ (например: 15.05.1990)');
            return false;
        }
        
        // Проверка корректности даты
        const parts = value.split('.');
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10);
        const year = parseInt(parts[2], 10);
        
        const date = new Date(year, month - 1, day);
        const isValidDate = (
            date.getFullYear() === year &&
            date.getMonth() === month - 1 &&
            date.getDate() === day
        );
        
        if (!isValidDate) {
            showError(jsDate, errorElement, 'Введите корректную дату');
            return false;
        }
        
        // Проверка возраста (не менее 18 лет)
        const today = new Date();
        const minDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
        
        if (date > minDate) {
            showError(jsDate, errorElement, 'Вы должны быть не моложе 18 лет');
            return false;
        }
        
        // Если все проверки пройдены
        clearError(jsDate, errorElement);
        return true;
    }
    
    // 6. Валидация интересов (чекбоксов)
    function validateInterests() {
        const checkedInterests = Array.from(interestsCheckboxes).filter(checkbox => checkbox.checked);
        const errorElement = document.getElementById('jsInterestsError');
        
        // Проверка минимального количества выбранных интересов
        if (checkedInterests.length < 2) {
            showError(interestsCheckboxes[0], errorElement, 'Выберите не менее 2 интересов');
            return false;
        }
        
        // Если все проверки пройдены
        clearError(interestsCheckboxes[0], errorElement);
        return true;
    }
    
    // 7. Валидация комментариев
    function validateComments() {
        const value = jsComments.value;
        const errorElement = document.getElementById('jsCommentsError');
        
        // Проверка максимальной длины
        if (value.length > 500) {
            showError(jsComments, errorElement, `Комментарий не должен превышать 500 символов. Сейчас: ${value.length}`);
            return false;
        }
        
        // Проверка на наличие запрещенных слов
        const forbiddenWords = ['спам', 'реклама', 'взлом', 'мошенничество'];
        const hasForbiddenWord = forbiddenWords.some(word => 
            value.toLowerCase().includes(word.toLowerCase())
        );
        
        if (hasForbiddenWord) {
            showError(jsComments, errorElement, 'Комментарий содержит запрещенные слова');
            return false;
        }
        
        // Если все проверки пройдены
        clearError(jsComments, errorElement);
        return true;
    }
    
    // Функция для подсчета символов в комментариях
    function updateCharCount() {
        const maxLength = 500;
        const currentLength = jsComments.value.length;
        const remaining = maxLength - currentLength;
        
        charCount.textContent = remaining;
        
        // Изменение цвета при приближении к лимиту
        if (remaining < 0) {
            charCount.style.color = '#e74c3c';
        } else if (remaining < 50) {
            charCount.style.color = '#f39c12';
        } else {
            charCount.style.color = '#2ecc71';
        }
        
        // Если включена валидация в реальном времени
        if (realTimeValidation) {
            validateComments();
        }
    }
    
    // Функция для отображения ошибки
    function showError(field, errorElement, message) {
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('show');
            field.classList.add('invalid');
            field.classList.remove('valid');
        }
    }
    
    // Функция для очистки ошибки
    function clearError(field, errorElement) {
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.classList.remove('show');
            field.classList.remove('invalid');
            field.classList.add('valid');
        }
    }
    
    // Функция для валидации всей формы JavaScript
    function validateJSForm() {
        const validations = [
            validateUsername(),
            validateEmail(),
            validatePassword(),
            validatePhone(),
            validateDate(),
            validateInterests(),
            validateComments()
        ];
        
        const isFormValid = validations.every(result => result === true);
        
        // Отображаем общий статус валидации
        if (isFormValid) {
            jsValidationStatus.textContent = '✅ Форма прошла кастомную валидацию успешно!';
            jsValidationStatus.className = 'validation-status valid';
            
            // Отображаем результаты
            displayJSResults();
        } else {
            jsValidationStatus.textContent = '❌ Форма содержит ошибки. Пожалуйста, исправьте их.';
            jsValidationStatus.className = 'validation-status invalid';
        }
        
        return isFormValid;
    }
    
    // Функция для отображения результатов валидации JavaScript
    function displayJSResults() {
        // Собираем данные формы
        const formData = {
            'Имя пользователя': jsUsername.value,
            'Email': jsEmail.value,
            'Телефон': jsPhone.value || '(не указано)',
            'Дата рождения': jsDate.value || '(не указано)',
            'Интересы': Array.from(interestsCheckboxes)
                .filter(cb => cb.checked)
                .map(cb => cb.nextElementSibling.textContent)
                .join(', '),
            'Длина комментария': `${jsComments.value.length} символов`
        };
        
        // Формируем HTML для отображения
        let resultsHTML = '<h3>Результаты кастомной валидации:</h3>';
        resultsHTML += '<ul>';
        
        for (const [fieldName, value] of Object.entries(formData)) {
            resultsHTML += `<li><strong>${fieldName}:</strong> ${value}</li>`;
        }
        
        // Добавляем оценку силы пароля
        const passwordStrength = document.getElementById('passwordStrengthBar').style.width;
        resultsHTML += `<li><strong>Сложность пароля:</strong> ${passwordStrength}</li>`;
        
        resultsHTML += '</ul>';
        resultsHTML += '<p>Все проверки выполнены с использованием кастомного JavaScript.</p>';
        
        jsResults.innerHTML = resultsHTML;
    }
    
    // Функция для включения/выключения валидации в реальном времени
    function toggleRealTimeValidation() {
        realTimeValidation = !realTimeValidation;
        
        if (realTimeValidation) {
            jsRealTimeBtn.textContent = 'Выключить проверку в реальном времени';
            jsRealTimeBtn.style.backgroundColor = '#e74c3c';
            
            // Добавляем обработчики событий для валидации в реальном времени
            jsUsername.addEventListener('input', validateUsername);
            jsEmail.addEventListener('input', validateEmail);
            jsPassword.addEventListener('input', validatePassword);
            jsPhone.addEventListener('input', validatePhone);
            jsDate.addEventListener('input', validateDate);
            jsComments.addEventListener('input', updateCharCount);
            
            // Для чекбоксов
            interestsCheckboxes.forEach(checkbox => {
                checkbox.addEventListener('change', validateInterests);
            });
            
            console.log('Валидация в реальном времени включена');
        } else {
            jsRealTimeBtn.textContent = 'Включить проверку в реальном времени';
            jsRealTimeBtn.style.backgroundColor = '#3498db';
            
            // Удаляем обработчики событий
            jsUsername.removeEventListener('input', validateUsername);
            jsEmail.removeEventListener('input', validateEmail);
            jsPassword.removeEventListener('input', validatePassword);
            jsPhone.removeEventListener('input', validatePhone);
            jsDate.removeEventListener('input', validateDate);
            jsComments.removeEventListener('input', updateCharCount);
            
            // Для чекбоксов
            interestsCheckboxes.forEach(checkbox => {
                checkbox.removeEventListener('change', validateInterests);
            });
            
            console.log('Валидация в реальном времени выключена');
        }
    }
    
    // Инициализация обработчиков событий
    jsValidateBtn.addEventListener('click', validateJSForm);
    jsRealTimeBtn.addEventListener('click', toggleRealTimeValidation);
    jsComments.addEventListener('input', updateCharCount);
    
    // Инициализация при загрузке
    updateCharCount();
    console.log('JavaScript валидация инициализирована');
});