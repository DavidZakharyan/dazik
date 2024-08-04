// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push, onValue, remove } from "firebase/database";

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
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

let currentCity = '';
let currentTheme = '';

let ads = {};

// Загрузка объявлений из Firebase
function loadAds() {
    const adsRef = ref(database, 'ads');
    onValue(adsRef, (snapshot) => {
        const data = snapshot.val();
        ads = data || {};
        displayAds();
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
        const adsRef = ref(database, `ads/${key}`);
        const newAdRef = push(adsRef);
        set(newAdRef, ad);
        alert('Объявление сохранено!');
        document.getElementById('ad-form').reset();
        goBackToThemeOptions();
    } else {
        alert('Пожалуйста, заполните все поля.');
    }
}

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
            <button onclick="deleteAd('${key}', '${index}')">Удалить</button>
            <hr>
        `;
        adsContainer.appendChild(adElement);
    });
}

// Удаляет объявление по индексу
function deleteAd(key, index) {
    const adsRef = ref(database, `ads/${key}`);
    const adRef = ref(database, `ads/${key}/${index}`);
    if (confirm('Вы уверены, что хотите удалить это объявление?')) {
        remove(adRef);
        alert('Объявление удалено!');
        loadAds();
    }
}

// Обновляет текущий выбранный город и отображает соответствующие темы
function filterCity() {
    currentCity = document.getElementById('city-dropdown').value;
    console.log('Выбранный город:', currentCity); // Добавлено для отладки
    if (currentCity) {
        document.getElementById('theme-selection').style.display = 'block';
        document.getElementById('theme-options').style.display = 'none';
        document.getElementById('create-ad').style.display = 'none';
        document.getElementById('view-ads').style.display = 'none';
        alert('Вы выбрали город: ' + currentCity);
    } else {
        document.getElementById('theme-selection').style.display = 'none';
    }
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

// Инициализация при загрузке страницы
window.onload = function() {
    loadAds(); // Загружаем объявления из Firebase
    const cityDropdown = document.getElementById('city-dropdown');
    cityDropdown.addEventListener('change', filterCity);
}
