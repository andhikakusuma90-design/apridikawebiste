document.addEventListener("DOMContentLoaded", () => {
    createParticles();
    createFloatingHearts();
});

/* ===== PARTICLES ===== */
function createParticles() {
    const container = document.getElementById('particles-container');
    const particleCount = window.innerWidth <= 768 ? 8 : 25;

    for (let i = 0; i < particleCount; i++) {
        let particle = document.createElement('div');
        particle.classList.add('particle');

        let size     = Math.random() * 8 + 4;
        let posX     = Math.random() * 100;
        let delay    = Math.random() * 12;
        let duration = Math.random() * 10 + 8;

        particle.style.width           = `${size}px`;
        particle.style.height          = `${size}px`;
        particle.style.left            = `${posX}vw`;
        particle.style.animationDelay  = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;

        container.appendChild(particle);
    }
}

/* ===== FLOATING HEARTS ===== */
function createFloatingHearts() {
    const hearts = ['♥', '♡', '💕', '💖', '✨'];
    const count  = window.innerWidth <= 768 ? 5 : 12;

    for (let i = 0; i < count; i++) {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];

        const size     = Math.random() * 1.2 + 0.8;
        const posX     = Math.random() * 100;
        const delay    = Math.random() * 15;
        const duration = Math.random() * 10 + 10;
        const hue      = Math.random() * 40 - 10; // slight hue variation

        heart.style.left             = `${posX}vw`;
        heart.style.fontSize         = `${size}rem`;
        heart.style.animationDelay   = `${delay}s`;
        heart.style.animationDuration= `${duration}s`;
        heart.style.color            = `hsl(${340 + hue}, 85%, 60%)`;

        document.body.appendChild(heart);
    }
}

/* ===== THEME SWITCHER ===== */
const themeBtn = document.getElementById('theme-btn');
const musicBtn = document.getElementById('music-btn');
const bgMusic  = document.getElementById('bg-music');

themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('theme-alt');
    const icon = themeBtn.querySelector('i');
    if (document.body.classList.contains('theme-alt')) {
        icon.classList.replace('fa-sun', 'fa-moon');
    } else {
        icon.classList.replace('fa-moon', 'fa-sun');
    }
});

/* ===== MUSIC PLAYER ===== */
const updateMusicIcon = () => {
    const icon = musicBtn.querySelector('i');
    if (bgMusic.paused) {
        icon.classList.replace('fa-pause', 'fa-music');
    } else {
        icon.classList.replace('fa-music', 'fa-pause');
    }
};

bgMusic.addEventListener('play',  updateMusicIcon);
bgMusic.addEventListener('pause', updateMusicIcon);

bgMusic.play()
    .then(() => { bgMusic.muted = false; })
    .catch(() => { /* autoplay blocked */ });

document.addEventListener('click', () => {
    bgMusic.muted = false;
    if (bgMusic.paused) bgMusic.play();
}, { once: true });

musicBtn.addEventListener('click', () => {
    if (bgMusic.paused) bgMusic.play();
    else bgMusic.pause();
});

/* Pause music when any video plays */
document.querySelectorAll('video').forEach(video => {
    video.addEventListener('play', () => {
        if (!bgMusic.paused) bgMusic.pause();
    });
});

/* ===== SIDE MENU ===== */
const menuBtn     = document.getElementById('menu-btn');
const sideMenu    = document.getElementById('side-menu');
const menuClose   = document.getElementById('menu-close');
const menuOverlay = document.getElementById('menu-overlay');

function openMenu()  {
    sideMenu.classList.add('open');
    menuOverlay.classList.add('active');
}
function closeMenu() {
    sideMenu.classList.remove('open');
    menuOverlay.classList.remove('active');
    
    // Pause all videos when the menu is closed
    document.querySelectorAll('video').forEach(video => {
        video.pause();
    });
}

if (menuBtn)     menuBtn.addEventListener('click', openMenu);
if (menuClose)   menuClose.addEventListener('click', closeMenu);
if (menuOverlay) menuOverlay.addEventListener('click', closeMenu);

/* ===== TAB SWITCHING ===== */
function switchTab(tabName) {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tabName);
    });
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.toggle('active', content.id === 'tab-' + tabName);
    });
}

const openFotoBtn  = document.getElementById('open-foto-btn');
const openVideoBtn = document.getElementById('open-video-btn');

if (openFotoBtn) openFotoBtn.addEventListener('click', () => {
    openMenu();
    switchTab('foto');
});
if (openVideoBtn) openVideoBtn.addEventListener('click', () => {
    openMenu();
    switchTab('video');
});

document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
});

/* ===== GRID ITEM CLICK FEEDBACK ===== */
document.querySelectorAll('.menu-grid-item').forEach(item => {
    item.addEventListener('click', () => {
        item.style.transform = 'scale(0.96)';
        setTimeout(() => { item.style.transform = ''; }, 150);
    });
});

/* ===== CAROUSEL CLICK ===== */
document.querySelectorAll('.carousel-track img, .carousel-track video').forEach(media => {
    media.addEventListener('click', () => {
        openMenu();
        if (media.tagName.toLowerCase() === 'video') {
            switchTab('video');
        } else {
            switchTab('foto');
        }
    });
});

/* ===== TIME COUNTER ===== */
function updateCounter() {
    const startDate = new Date("2024-10-18T00:00:00");
    const now = new Date();
    
    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();
    let days = now.getDate() - startDate.getDate();
    
    if (days < 0) {
        months--;
        const previousMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += previousMonth.getDate();
    }
    
    if (months < 0) {
        years--;
        months += 12;
    }
    
    const diffTime = Math.abs(now - startDate);
    const hours = Math.floor((diffTime / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diffTime / 1000 / 60) % 60);
    const seconds = Math.floor((diffTime / 1000) % 60);

    const elY = document.getElementById('t-years');
    if (elY) {
        elY.textContent = years;
        document.getElementById('t-months').textContent = months;
        document.getElementById('t-days').textContent = days;
        document.getElementById('t-hours').textContent = hours;
        document.getElementById('t-minutes').textContent = minutes;
        document.getElementById('t-seconds').textContent = seconds;
    }
}

setInterval(updateCounter, 1000);
updateCounter();
