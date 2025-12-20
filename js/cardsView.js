
function loadTarotDeck() {
fetch('../API/tarot_deck.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(card => {
            const mainElement = document.getElementsByClassName('main-flex')[0];
            const cardElement = document.createElement('div');
            cardElement.className = 'card';
            cardElement.innerHTML = `
                <img src="${card.image_path}" alt="${card.name}" class="card-image"/>
                <h2>${card.name}</h2>
                <p>${card.description}</p>
            `;
            mainElement.appendChild(cardElement);
            console.log(card);
        });
    })
    .catch(error => console.error('Error loading the tarot deck:', error));
}

document.addEventListener('DOMContentLoaded', loadTarotDeck);