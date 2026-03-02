// Инициализация после загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    // Создаем экземпляр класса для работы с формой
    const formExtractor = new FormDataExtractor('userForm');
    
    // Элементы DOM
    const submitBtn = document.getElementById('submitBtn');
    const resetBtn = document.getElementById('resetBtn');
    const showDialogBtn = document.getElementById('showDialogBtn');
    const showAlertBtn = document.getElementById('showAlertBtn');
    const closeDialogBtn = document.getElementById('closeDialog');
    const dialogOverlay = document.getElementById('dialogOverlay');
    const dialogContent = document.getElementById('dialogContent');
    const resultsDiv = document.getElementById('results');
    
    // Функция для отображения данных на странице
    function displayDataOnPage() {
        const formData = formExtractor.extractFormData();
        const formattedData = formExtractor.formatFormData(formData);
        
        resultsDiv.innerHTML = `<h3>Данные из формы:</h3>${formattedData}`;
    }
    
    // Функция для отображения данных в диалоговом окне
    function displayDataInDialog() {
        const formData = formExtractor.extractFormData();
        const formattedData = formExtractor.formatFormData(formData);
        
        dialogContent.innerHTML = formattedData;
        dialogOverlay.style.display = 'flex';
    }
    
    // Функция для отображения данных в alert
    function displayDataInAlert() {
        const formData = formExtractor.extractFormData();
        let alertText = 'Данные формы:\n\n';
        
        for (const [key, value] of Object.entries(formData)) {
            const readableKey = formExtractor.getReadableFieldName(key);
            let displayValue = value;
            
            if (Array.isArray(value)) {
                displayValue = value.length > 0 ? value.join(', ') : 'Не выбрано';
            }
            
            if (!value || (Array.isArray(value) && value.length === 0)) {
                displayValue = 'Не указано';
            }
            
            alertText += `${readableKey}: ${displayValue}\n`;
        }
        
        alert(alertText);
    }
    
    // Функция для вывода данных в консоль
    function displayDataInConsole() {
        const formData = formExtractor.extractFormData();
        console.log('=== Данные формы ===');
        console.table(formData);
        console.log('====================');
    }
    
    // Обработчик отправки формы
    if (submitBtn) {
        submitBtn.addEventListener('click', function(e) {
            e.preventDefault(); // Предотвращаем стандартную отправку формы
            
            // Валидация обязательных полей
            const fullName = document.getElementById('fullName').value.trim();
            const email = document.getElementById('email').value.trim();
            
            if (!fullName || !email) {
                alert('Пожалуйста, заполните обязательные поля: ФИО и Email');
                return;
            }
            
            displayDataOnPage();
            displayDataInConsole();
        });
    }
    
    // Обработчик кнопки сброса
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            formExtractor.resetForm();
            resultsDiv.innerHTML = '<p>Форма очищена. Введите новые данные.</p>';
        });
    }
    
    // Обработчик кнопки показа в диалоге
    if (showDialogBtn) {
        showDialogBtn.addEventListener('click', displayDataInDialog);
    }
    
    // Обработчик кнопки показа в alert
    if (showAlertBtn) {
        showAlertBtn.addEventListener('click', displayDataInAlert);
    }
    
    // Закрытие диалогового окна
    if (closeDialogBtn) {
        closeDialogBtn.addEventListener('click', function() {
            dialogOverlay.style.display = 'none';
        });
    }
    
    // Закрытие диалога по клику на оверлей
    dialogOverlay.addEventListener('click', function(e) {
        if (e.target === dialogOverlay) {
            dialogOverlay.style.display = 'none';
        }
    });
    
    // Вывод данных в консоль при загрузке страницы для демонстрации
    console.log('Форма загружена. Используйте кнопки для извлечения данных.');
    
    // Добавляем обработчик для автоматического вывода в консоль при изменении формы
    const form = document.getElementById('userForm');
    if (form) {
        form.addEventListener('change', function() {
            console.log('Форма изменена. Текущие данные:');
            displayDataInConsole();
        });
    }
});