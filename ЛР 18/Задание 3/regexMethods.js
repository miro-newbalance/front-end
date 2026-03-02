// ============================================
// 1. Метод RegExp.test()
// ============================================

/**
 * Проверка валидности email с помощью test()
 */
function testEmail() {
    const email = document.getElementById('emailInput').value;
    // Регулярное выражение для проверки email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    const isValid = emailRegex.test(email);
    const result = document.getElementById('testResult');
    
    result.innerHTML = `Email: "${email}"\n`;
    result.innerHTML += `Регулярное выражение: ${emailRegex}\n`;
    result.innerHTML += `Результат проверки: ${isValid ? '✅ Валидный email' : '❌ Невалидный email'}`;
    
    result.style.background = isValid ? '#d4edda' : '#f8d7da';
}

/**
 * Проверка даты в формате ДД.ММ.ГГГГ
 */
function testDate() {
    const date = document.getElementById('dateInput').value;
    // Регулярное выражение для даты (упрощенное)
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/;
    
    const isValid = dateRegex.test(date);
    const result = document.getElementById('dateResult');
    
    result.innerHTML = `Дата: "${date}"\n`;
    result.innerHTML += `Регулярное выражение: ${dateRegex}\n`;
    result.innerHTML += `Результат проверки: ${isValid ? '✅ Корректный формат' : '❌ Некорректный формат'}`;
    
    result.style.background = isValid ? '#d4edda' : '#f8d7da';
}

// ============================================
// 2. Метод RegExp.exec()
// ============================================

/**
 * Поиск всех чисел в тексте с помощью exec()
 */
function findNumbers() {
    const text = document.getElementById('execText').value;
    const result = document.getElementById('execResult');
    result.innerHTML = '';
    
    // Регулярное выражение для поиска чисел
    const numberRegex = /\d+/g;
    let matches = [];
    let match;
    
    // Использование exec() в цикле для поиска всех совпадений
    while ((match = numberRegex.exec(text)) !== null) {
        matches.push({
            число: match[0],
            индекс: match.index,
            входная_строка: match.input.substring(match.index, match.index + 20) + '...'
        });
    }
    
    if (matches.length === 0) {
        result.innerHTML = 'Числа не найдены';
        result.style.background = '#f8d7da';
        return;
    }
    
    result.innerHTML = `Найдено чисел: ${matches.length}\n\n`;
    matches.forEach((m, i) => {
        result.innerHTML += `${i + 1}. Число: "${m.число}"\n`;
        result.innerHTML += `   Индекс: ${m.индекс}\n`;
        result.innerHTML += `   Контекст: "${m.входная_строка}"\n\n`;
    });
    
    result.style.background = '#d1ecf1';
}

/**
 * Извлечение структурированных данных
 */
function extractData() {
    const input = document.getElementById('dataInput').value;
    const result = document.getElementById('dataResult');
    result.innerHTML = '';
    
    // Регулярное выражение для извлечения данных в формате Имя:Возраст:Город
    const dataRegex = /([А-Яа-яA-Za-z]+):(\d+):([А-Яа-яA-Za-z\s]+)/g;
    let matches = [];
    let match;
    
    while ((match = dataRegex.exec(input)) !== null) {
        matches.push({
            полноеСовпадение: match[0],
            имя: match[1],
            возраст: match[2],
            город: match[3],
            индекс: match.index
        });
    }
    
    if (matches.length === 0) {
        result.innerHTML = 'Данные не найдены';
        result.style.background = '#f8d7da';
        return;
    }
    
    result.innerHTML = 'Извлеченные данные:\n\n';
    matches.forEach((m, i) => {
        result.innerHTML += `Запись ${i + 1}:\n`;
        result.innerHTML += `  Имя: ${m.имя}\n`;
        result.innerHTML += `  Возраст: ${m.возраст}\n`;
        result.innerHTML += `  Город: ${m.город}\n`;
        result.innerHTML += `  Позиция в строке: ${m.индекс}\n\n`;
    });
    
    result.style.background = '#d4edda';
}

// ============================================
// 3. Методы String
// ============================================

/**
 * String.match() - поиск всех телефонов
 */
function findPhones() {
    const text = document.getElementById('matchText').value;
    const result = document.getElementById('matchResult');
    
    // Регулярное выражение для поиска российских номеров телефонов
    const phoneRegex = /(\+7|8)[\s\-\(]?\d{3}[\)\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}/g;
    
    const matches = text.match(phoneRegex);
    
    if (!matches || matches.length === 0) {
        result.innerHTML = 'Телефоны не найдены';
        result.style.background = '#f8d7da';
        return;
    }
    
    result.innerHTML = `Найдено телефонов: ${matches.length}\n\n`;
    matches.forEach((phone, i) => {
        result.innerHTML += `${i + 1}. ${phone}\n`;
    });
    
    result.style.background = '#d1ecf1';
}

/**
 * String.replace() - замена валюты
 */
function replaceRubles() {
    const text = document.getElementById('replaceText').value;
    const result = document.getElementById('replaceResult');
    
    // Замена "руб." на символ рубля с использованием регулярного выражения
    const newText = text.replace(/руб\./g, '₽');
    
    result.innerHTML = `Оригинальный текст:\n${text}\n\n`;
    result.innerHTML += `Текст после замены:\n${newText}`;
    
    result.style.background = '#fff3cd';
}

// ============================================
// 4. Примеры с флагами
// ============================================

/**
 * Поиск с игнорированием регистра (флаг i)
 */
function searchCaseInsensitive() {
    const word = document.getElementById('searchWord').value;
    const text = 'JavaScript - это язык программирования. javascript используется везде. JAVASCRIPT мощный инструмент.';
    const result = document.getElementById('searchResult');
    
    // Без флага i
    const regexCaseSensitive = new RegExp(word, 'g');
    // С флагом i
    const regexCaseInsensitive = new RegExp(word, 'gi');
    
    const matchesSensitive = text.match(regexCaseSensitive) || [];
    const matchesInsensitive = text.match(regexCaseInsensitive) || [];
    
    result.innerHTML = `Текст для поиска:\n"${text}"\n\n`;
    result.innerHTML += `Поиск "${word}" БЕЗ флага i:\n`;
    result.innerHTML += `Найдено: ${matchesSensitive.length} (${matchesSensitive.join(', ')})\n\n`;
    result.innerHTML += `Поиск "${word}" С флагом i:\n`;
    result.innerHTML += `Найдено: ${matchesInsensitive.length} (${matchesInsensitive.join(', ')})`;
    
    result.style.background = '#e2e3e5';
}

/**
 * Глобальный поиск (флаг g)
 */
function findAllCats() {
    const text = document.getElementById('globalText').value;
    const result = document.getElementById('globalResult');
    
    // Без флага g - только первое совпадение
    const regexWithoutG = /кот/i;
    // С флагом g - все совпадения
    const regexWithG = /кот/gi;
    
    const matchWithoutG = text.match(regexWithoutG);
    const matchesWithG = text.match(regexWithG) || [];
    
    result.innerHTML = `Текст: "${text}"\n\n`;
    result.innerHTML += `Без флага g (только первое совпадение):\n`;
    result.innerHTML += `Результат: ${matchWithoutG ? matchWithoutG[0] : 'не найдено'}\n\n`;
    result.innerHTML += `С флагом g (все совпадения):\n`;
    result.innerHTML += `Найдено: ${matchesWithG.length} совпадений\n`;
    result.innerHTML += `Результат: [${matchesWithG.join(', ')}]`;
    
    result.style.background = '#d1ecf1';
}

// ============================================
// 5. String.split() и String.search()
// ============================================

/**
 * String.split() с регулярным выражением
 */
function splitText() {
    const text = document.getElementById('splitText').value;
    const result = document.getElementById('splitResult');
    
    // Разделение по запятой, точке с запятой, точке или пробелу
    const parts = text.split(/[,;.\s]+/);
    
    result.innerHTML = `Оригинальный текст:\n"${text}"\n\n`;
    result.innerHTML += `Разделители: [, ; . пробел]\n\n`;
    result.innerHTML += `Результат разделения (${parts.length} элементов):\n`;
    
    parts.forEach((part, index) => {
        if (part.trim()) { // Игнорируем пустые строки
            result.innerHTML += `${index + 1}. "${part.trim()}"\n`;
        }
    });
    
    result.style.background = '#d4edda';
}

/**
 * String.search() - поиск индекса первого совпадения
 */
function searchPattern() {
    const pattern = document.getElementById('searchPattern').value;
    const text = 'Мой номер: 123-45-67, другой номер: 890-12-34';
    const result = document.getElementById('searchPatternResult');
    
    try {
        const regex = new RegExp(pattern);
        const index = text.search(regex);
        
        result.innerHTML = `Текст: "${text}"\n`;
        result.innerHTML += `Паттерн: ${pattern}\n\n`;
        
        if (index !== -1) {
            const match = text.match(regex);
            result.innerHTML += `✅ Совпадение найдено!\n`;
            result.innerHTML += `Индекс начала: ${index}\n`;
            result.innerHTML += `Найденный текст: "${match[0]}"\n`;
            result.innerHTML += `Контекст: "...${text.substring(Math.max(0, index - 10), index)}[${match[0]}]${text.substring(index + match[0].length, index + match[0].length + 10)}..."`;
            
            result.style.background = '#d4edda';
        } else {
            result.innerHTML += `❌ Совпадений не найдено`;
            result.style.background = '#f8d7da';
        }
    } catch (e) {
        result.innerHTML = `❌ Ошибка в регулярном выражении: ${e.message}`;
        result.style.background = '#f8d7da';
    }
}

// ============================================
// Дополнительные примеры при загрузке страницы
// ============================================

// Автозаполнение некоторых полей при загрузке
document.addEventListener('DOMContentLoaded', function() {
    // Устанавливаем значения по умолчанию для демонстрации
    document.getElementById('execText').value = 'Заказ №1234, сумма 5600 рублей, скидка 15%';
    document.getElementById('matchText').value = 'Телефоны: +7(123)456-78-90, 8-900-123-45-67, 89991234567';
    document.getElementById('replaceText').value = 'Цена: 1000 руб. Скидка: 200 руб. Итого: 800 руб.';
    document.getElementById('splitText').value = 'Яблоки,апельсины;бананы.виноград ананас';
    document.getElementById('globalText').value = 'Кот котёнок кот кошка КОТ';
    document.getElementById('dataInput').value = 'Иван:25:Москва,Анна:30:СПб,Петр:35:Казань';
});