openPageHealthWellBeing();

function openPageHealthWellBeing() {
    const imageButtons = document.querySelectorAll('.tarot-type-cards');

    imageButtons.forEach(button => {
        button.addEventListener('click', () => {
            let pageUrl = '';
            if (button.classList.contains('one-card')) {
                pageUrl = '../pages/tarot-health-wellBeing-one-card.html';
            } else if (button.classList.contains('three-cards')) {
                pageUrl = '../pages/tarot-health-wellBeing-three-cards.html';
            } else if (button.classList.contains('cross-celtic')) {
                pageUrl = '../pages/tarot-health-wellBeing-celtic-cross.html';
            }
            window.location.href = pageUrl;
        });
    });
}