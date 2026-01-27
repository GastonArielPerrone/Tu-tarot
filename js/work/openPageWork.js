openPage();

function openPage() {
    const imageButtons = document.querySelectorAll('.tarot-type-cards');
    imageButtons.forEach(button => {
        button.addEventListener('click', () => {
            let pageUrl = '';
            if (button.classList.contains('one-card')) {
                pageUrl = '../pages/tarot-work-one-card.html';
            } else if (button.classList.contains('three-cards')) {
                pageUrl = '../pages/tarot-work-three-cards.html';
            } else if (button.classList.contains('cross-celtic')) {
                pageUrl = '../pages/tarot-work-celtic-cross.html';
            }
            window.location.href = pageUrl;
        })
    })
}