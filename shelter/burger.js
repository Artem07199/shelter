
const burger = document.querySelector('.burger-menu');
const nav = document.querySelector('.header-nav');
const overlay = document.querySelector('.nav-overlay');
const closeBtn = document.querySelector('.close-menu');
const navLinks = document.querySelectorAll('.nav-list-link');

const openMenu = () => {
    nav.classList.add('is-open');
    document.body.style.overflow = 'hidden'; 
};


const closeMenu = () => {
    nav.classList.remove('is-open');
    document.body.style.overflow = ''; 
};


burger.addEventListener('click', openMenu);


closeBtn.addEventListener('click', closeMenu);


overlay.addEventListener('click', closeMenu);


navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        closeMenu();
    }
});