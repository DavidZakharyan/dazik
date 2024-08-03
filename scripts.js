// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAu5Bg9tziYzdU14HJXome7F2OBPXsJ8no",
    authDomain: "myadssite-24b63.firebaseapp.com",
    projectId: "myadssite-24b63",
    storageBucket: "myadssite-24b63.appspot.com",
    messagingSenderId: "23382315564",
    appId: "1:23382315564:web:70dd8a25fc95b7d0cf3789",
    measurementId: "G-PRK2QEJKPP"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const analytics = firebase.getAnalytics(app);
const database = firebase.database();

let currentCity = '';
let currentTheme = '';

// Загрузка объявлений из Firebase
function loadAds() {
    const dbRef = firebase.database().ref();
    dbRef.on('value', (snapshot) => {
        const ads = snapshot.val() || {};
        displayAds(ads);
    });
}

// Сохранение объявления в Firebase
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

// Отображение объявлений в разделе "Смотреть объявления"
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
function goBackTo### Обновленный `scripts.js` (продолжение):

```javascript
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

// Инициализация при загрузке страницы
window.onload = function() {
    const cityDropdown = document.getElementById('city-dropdown');
    cityDropdown.addEventListener('change', filterCity);
}
