openPageTheme();

function openPageTheme() {
const imageButtons = document.querySelectorAll('.button-option');

imageButtons.forEach(button => {
    button.addEventListener('click', () => {
        let pageUrl = '';
        if (button.classList.contains('tarot-love')) {
            pageUrl = '../pages/tarot-love.html';
        } else if (button.classList.contains('tarot-work')) {
            pageUrl = '../pages/tarot-work.html';
        } else if (button.classList.contains('tarot-health-wellBeing')) {
            pageUrl = '../pages/tarot-health-wellBeing.html';
        }
        window.location.href = pageUrl;
    });
});
}