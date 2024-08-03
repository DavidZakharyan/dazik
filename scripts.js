// Объявления будут храниться по ключу "город-тематика"
let ads = {};  
let currentCity = '';  // Переменная для хранения текущего выбранного города
let currentTheme = ''; // Переменная для хранения текущей выбранной тематики

// Показывает объявления в разделе "Смотреть объявления"
function displayAds() {
    const adsContainer = document.getElementById('ads-container');
    adsContainer.innerHTML = '';
    const key = `${currentCity}-${currentTheme}`;
    const cityThemeAds = ads[key] || [];

    cityThemeAds.forEach((ad, index) => {
        const adElement = document.createElement('div');
        adElement.innerHTML = `
            <p>📌Название: ${ad.title}</p>
            <p>👇Описание: ${ad.description}</p>
            <p>💰Стоимость: ${ad.price} руб.</p>
            <p>👨‍💻Для связи: ${ad.contact}</p>
            <button onclick="deleteAd(${index})">Удалить</button>
            <hr>
        `;
        adsContainer.appendChild(adElement);
    });
}

// Удаляет объявление по индексу
function deleteAd(index) {
    const key = `${currentCity}-${currentTheme}`;
    const cityThemeAds = ads[key] || [];
    
    if (confirm('Вы уверены, что хотите удалить это объявление?')) {
        cityThemeAds.splice(index, 1);  // Удаляет объявление из массива
        ads[key] = cityThemeAds;  // Обновляет массив объявлений в объекте
        displayAds();  // Обновляет отображение объявлений
    }
}

// Обновляет текущий выбранный город и отображает соответствующие темы
function filterCity() {
    currentCity = document.getElementById('city-dropdown').value;
    document.getElementById('theme-selection').style.display = 'block';
    document.getElementById('theme-options').style.display = 'none';
    document.getElementById('create-ad').style.display = 'none';
    document.getElementById('view-ads').style.display = 'none';
    alert('Вы выбрали город: ' + currentCity);
}

// Устанавливает текущую тему и отображает соответствующие опции
function selectTheme(theme) {
    currentTheme = theme;
    if (theme === 'Задать вопрос') {
        document.getElementById('theme-selection').style.display = 'none';
        document.getElementById('question').style.display = 'block';
    } else {
        document.getElementById('theme-selection').style.display = 'none';
        document.getElementById('theme-options').style.display = 'block';
    }
}

// Переход на создание объявления
function showCreateAd() {
    document.getElementById('theme-options').style.display = 'none';
    document.getElementById('create-ad').style.display = 'block';
}

// Переход на просмотр объявлений
function showAds() {
    document.getElementById('theme-options').style.display = 'none';
    document.getElementById('view-ads').style.display = 'block';
    displayAds();
}

// Сохранение нового объявления
function saveAd() {
    const title = document.getElementById('ad-title').value;
    const description = document.getElementById('ad-description').value;
    const contact = document.getElementById('ad-contact').value;
    const price = document.getElementById('ad-price').value;

    if (title && description && contact && price) {
        const ad = {
            title: title,
            description: description,
            contact: contact,
            price: price
        };
        const key = `${currentCity}-${currentTheme}`;
        if (!ads[key]) {
            ads[key] = [];
        }
        ads[key].push(ad);
        alert('Объявление сохранено!');
        document.getElementById('ad-form').reset();
        goBackToThemeOptions();
    } else {
        alert('Пожалуйста, заполните все поля.');
    }
}

// Возврат к выбору тем
function goBackToThemes() {
    document.getElementById('question').style.display = 'none';
    document.getElementById('theme-options').style.display = 'none';
    document.getElementById('theme-selection').style.display = 'block';
}

// Возврат к опциям тем
function goBackToThemeOptions() {
    document.getElementById('create-ad').style.display = 'none';
    document.getElementById('view-ads').style.display = 'none';
    document.getElementById('theme-options').style.display = 'block';
}

// Показ выбранного опции (не используется, но можно оставить для будущего функционала)
function optionSelected(option) {
    alert('Вы выбрали: ' + option);
}
