let isDark = false;

const themeIcon = document.getElementById('toggleThemeIcon');

function toggleTheme() {
    const element = document.body;
    element.classList.toggle('dark-mode');
    themeIcon.classList.toggle('fa-sun');
    return false;
}
