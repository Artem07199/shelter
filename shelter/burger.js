// 1. Ищем нужные элементы
const burger = document.querySelector('.burger-menu');
const nav = document.querySelector('.header-nav');
const overlay = document.querySelector('.nav-overlay');
const closeBtn = document.querySelector('.close-menu');
const navLinks = document.querySelectorAll('.nav-list-link');

// Функция открытия меню
const openMenu = () => {
    nav.classList.add('is-open');
    document.body.style.overflow = 'hidden'; // Запрет прокрутки сайта
};

// Функция закрытия меню
const closeMenu = () => {
    nav.classList.remove('is-open');
    document.body.style.overflow = ''; // Возврат прокрутки
};

// 2. Вешаем обработчики событий
burger.addEventListener('click', openMenu);

// Закрытие при клике на кнопку «крестик»
closeBtn.addEventListener('click', closeMenu);

// Закрытие при клике на оверлей (темный фон)
overlay.addEventListener('click', closeMenu);

// Закрытие при клике на любую ссылку в меню
navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
});

// Дополнительно: закрытие при нажатии клавиши Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        closeMenu();
    }
});