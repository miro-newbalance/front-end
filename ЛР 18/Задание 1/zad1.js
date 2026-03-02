// Класс для извлечения данных из формы
class FormDataExtractor {
    constructor(formId) {
        this.form = document.getElementById(formId);
        if (!this.form) {
            console.error(`Форма с ID "${formId}" не найдена`);
        }
    }

    // Метод для извлечения всех данных из формы
    extractFormData() {
        if (!this.form) return {};
        
        const formData = {};
        
        // Извлекаем текстовые поля, email, tel, textarea
        const textInputs = this.form.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], textarea');
        textInputs.forEach(input => {
            if (input.name) {
                formData[input.name] = input.value.trim();
            }
        });
        
        // Извлекаем выпадающий список (одиночный выбор)
        const selectSingle = this.form.querySelector('select:not([multiple])');
        if (selectSingle && selectSingle.name) {
            formData[selectSingle.name] = selectSingle.value;
        }
        
        // Извлекаем список с множественным выбором
        const selectMultiple = this.form.querySelector('select[multiple]');
        if (selectMultiple && selectMultiple.name) {
            const selectedOptions = Array.from(selectMultiple.selectedOptions).map(option => option.value);
            formData[selectMultiple.name] = selectedOptions;
        }
        
        // Извлекаем переключатели (радио-кнопки)
        const radioGroups = {};
        const radioInputs = this.form.querySelectorAll('input[type="radio"]');
        radioInputs.forEach(radio => {
            if (radio.name && radio.checked) {
                formData[radio.name] = radio.value;
            }
        });
        
        // Извлекаем флажки (чекбоксы)
        const checkboxes = this.form.querySelectorAll('input[type="checkbox"]');
        const checkboxGroups = {};
        
        checkboxes.forEach(checkbox => {
            if (checkbox.name) {
                if (!checkboxGroups[checkbox.name]) {
                    checkboxGroups[checkbox.name] = [];
                }
                if (checkbox.checked) {
                    checkboxGroups[checkbox.name].push(checkbox.value);
                }
            }
        });
        
        // Добавляем данные чекбоксов в formData
        Object.keys(checkboxGroups).forEach(groupName => {
            formData[groupName] = checkboxGroups[groupName];
        });
        
        return formData;
    }
    
    // Метод для форматирования данных в читаемый вид
    formatFormData(formData) {
        let formattedText = '';
        
        for (const [key, value] of Object.entries(formData)) {
            let displayValue = value;
            
            // Форматируем массивы
            if (Array.isArray(value)) {
                displayValue = value.length > 0 ? value.join(', ') : 'Не выбрано';
            }
            
            // Форматируем пустые значения
            if (!value || (Array.isArray(value) && value.length === 0)) {
                displayValue = 'Не указано';
            }
            
            // Преобразуем ключи в читаемые названия
            const readableKey = this.getReadableFieldName(key);
            formattedText += `<div class="result-item"><strong>${readableKey}:</strong> ${displayValue}</div>`;
        }
        
        return formattedText;
    }
    
    // Метод для получения читаемых названий полей
    getReadableFieldName(fieldName) {
        const fieldNames = {
            'fullName': 'ФИО',
            'email': 'Email',
            'phone': 'Телефон',
            'country': 'Страна',
            'interests': 'Интересы',
            'gender': 'Пол',
            'languages': 'Языки программирования',
            'comments': 'Комментарии'
        };
        
        return fieldNames[fieldName] || fieldName;
    }
    
    // Метод для сброса формы
    resetForm() {
        if (this.form) {
            this.form.reset();
        }
    }
}