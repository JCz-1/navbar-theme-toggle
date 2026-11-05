"use strict";

const sideNav = document.getElementById("side-nav");
const menuBtn = document.getElementById("menu-btn");
const closeBtn = document.getElementById("close-btn");

menuBtn.addEventListener('click', () => {
  sideNav.classList.remove('translate-x-full')
});

closeBtn.addEventListener('click', () => {
  sideNav.classList.add('translate-x-full')
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !sideNav.classList.contains('translate-x-full')) {
    sideNav.classList.add('translate-x-full')
  }
})

document.addEventListener('click', (event) => {
  if (!sideNav.classList.contains('translate-x-full') && !sideNav.contains(event.target) && !menuBtn.contains(event.target)) {
    sideNav.classList.add('translate-x-full')
  }
})

/* Theme Toggle Section  */
const page = document.documentElement;

const systemTheme = document.getElementById('system-theme');
const lightTheme = document.getElementById('light-theme');
const darkTheme = document.getElementById('dark-theme');

function saveTheme(theme) {
  localStorage.setItem('theme', theme);
}

function getTheme() {
  return localStorage.getItem('theme');
}

const systemPreference = window.matchMedia('(prefers-color-scheme: dark)');

function applySystemTheme() {
  systemPreference.matches ? 
    applyDarkTheme() : applyLightTheme();
}

function applyLightTheme() {
  page.classList.remove('dark');
}

function applyDarkTheme() {
  page.classList.add('dark');
}

// Listen for system preference changes
systemPreference.addEventListener('change', (event) => {
  if (getTheme() === 'system') {
    event.matches ? applyDarkTheme() : applyLightTheme();
  }
});

// Apply saved theme on page load
const savedTheme = getTheme();

if (savedTheme === 'dark') {
  applyDarkTheme();
} else if (savedTheme === 'light') {
  applyLightTheme();
} else {
  applySystemTheme();
}

const systemButton = systemTheme.parentElement;
const lightButton = lightTheme.parentElement;
const darkButton = darkTheme.parentElement;

function updateActiveTheme(theme) {
  systemButton.classList.remove('active-button');
  lightButton.classList.remove('active-button');
  darkButton.classList.remove('active-button');

  if (theme === 'system') {
    systemButton.classList.add('active-button')
  } else if (theme === 'light') {
    lightButton.classList.add('active-button')
  } else if (theme === 'dark') {
    darkButton.classList.add('active-button')
  }
}
updateActiveTheme(savedTheme || 'system');

// Theme button event listeners
systemTheme.addEventListener('click', () => {
  applySystemTheme();
  updateActiveTheme('system');
  saveTheme('system');
});

lightTheme.addEventListener('click', () => {
  applyLightTheme();
  updateActiveTheme('light');
  saveTheme('light');
});

darkTheme.addEventListener('click', () => {
  applyDarkTheme();
  updateActiveTheme('dark');
  saveTheme('dark');
});


