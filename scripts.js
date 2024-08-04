let currentCity = '';
let currentTheme = '';

// Загружаем объявления из Firebase
function loadAds() {
    const dbRef = firebase.database().ref();
    dbRef.on('value', (snapshot) => {
        const ads = snapshot.val() || {};
        displayAds(ads);
    });
}

// Сохраняем объявление в Firebase
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
        const dbRef = firebase.database().ref(key);
        dbRef.push(ad);
        alert('Объявление сохранено!');
        document.getElementById('ad-form').reset();
        goBackToThemeOptions();
    } else {
        alert('Пожалуйста, заполните все поля.');
    }
}

// Показываем объявления в разделе "Смотреть объявления"
function displayAds(ads) {
    const adsContainer = document.getElementById('ads-container');
    adsContainer.innerHTML = '';
    const key = `${currentCity}-${currentTheme}`;
    const cityThemeAds = ads[key] || [];

    for (const adId in cityThemeAds) {
        const ad = cityThemeAds[adId];
        const adElement = document.createElement('div');
        adElement.innerHTML = `
            <p>📌Название: ${ad.title}</p>
            <p>👇Описание: ${ad.description}</p>
            <p>💰Стоимость: ${ad.price} руб.</p>
            <p>👨‍💻Для связи: ${ad.contact}</p>
            <button onclick="deleteAd('${key}', '${adId}')">Удалить</button>
            <hr>
        `;
        adsContainer.appendChild(adElement);
    }
}

// Удаление объявления из Firebase
function deleteAd(key, adId) {
    if (confirm('Вы уверены, что хотите удалить это объявление?')) {
        const dbRef = firebase.database().ref(`${key}/${adId}`);
        dbRef.remove();
    }
}

// Обновление текущего выбранного города и отображение соответствующих тем
function filterCity() {
    currentCity = document.getElementById('city-dropdown').value;
    document.getElementById('theme-selection').style.display = 'block';
    document.getElementById('theme-options').style.display = 'none';
    document.getElementById('create-ad').style.display = 'none';
    document.getElementById('view-ads').style.display = 'none';
    alert('Вы выбрали город: ' + currentCity);
}

// Устанавливаем текущую тему и отображаем соответствующие опции
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
    loadAds();
}

// Возврат к выбору тем
function goBackToThemes() {
    document.getElementById('theme-selection').style.display = 'block';
    document.getElementById('theme-options').style.display = 'none';
    document.getElementById('create-ad').style.display = 'none';
    document.getElementById('view-ads').style.display = 'none';
    document.getElementById('question').style.display = 'none';
}

// Возврат к опциям тем
function goBackToThemeOptions() {
    document.getElementById('theme-options').style.display = 'block';
    document.getElementById('create-ad').style.display = 'none';
    document.getElementById('view-ads').style.display = 'none';
}

// Инициализация событий
document.getElementById('city-dropdown').addEventListener('change', filterCity);
