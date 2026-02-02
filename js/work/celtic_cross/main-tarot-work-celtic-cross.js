import { selectCelticCrossRandom } from "./selectCelticCross.js";
import { getTarotistInterpretation } from "./ollamaService.js";

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('celtic-cross-form');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
});

async function handleFormSubmit(event) {
    event.preventDefault();
    const modal = document.getElementById('myModal');
    const modalContent = modal.querySelector('.modal-content');

    modal.classList.add('show');
    modalContent.innerHTML = `
        <div class="loading-spinner">
            <img src="../static/images/content/loader_cards_random.png" alt="Barajando cartas..." class="card-image">
            <p>Barajando y tirando las cartas...</p>
        </div>`;

    try {
        const formData = {
            nombres: document.getElementById('nombres').value,
            apellidos: document.getElementById('apellidos').value,
            edad: document.getElementById('edad').value,
            estado: document.getElementById('estado').value,
            empresa_rubro: document.getElementById('empresa_rubro').value,
            detalle: document.getElementById('detalle').value
        };

        const cardsData = await selectCelticCrossRandom();
        if (!cardsData) {
            throw new Error('No se pudieron seleccionar las cartas.');
        }

        renderCelticCross(modalContent, cardsData, formData);

        const interpretation = await getTarotistInterpretation(formData, cardsData);
        const interpretationElement = document.getElementById('tarotista-response');
        if (interpretationElement) {
            interpretationElement.textContent = interpretation;
            textToSpeech(interpretation);
        }

    } catch (error) {
        console.error('Error en la lectura Cruz Celta:', error);
        modalContent.innerHTML = `
            <div class="error-message">
                <h2>Error</h2>
                <p>${error.message}</p>
                <button class="modal-close-btn">Cerrar</button>
            </div>`;
        addCloseButtonLogic(modal);
    }
}

function renderCelticCross(container, cards, formData) {
    const cardPositions = `
        <div class="celtic-card card-pos-3" data-pos="pos3"></div>
        <div class="celtic-card card-pos-5" data-pos="pos5"></div>
        <div class="celtic-card card-pos-4" data-pos="pos4"></div>
        <div class="center-cross">
            <div class="celtic-card card-pos-1" data-pos="pos1"></div>
            <div class="celtic-card card-pos-2" data-pos="pos2"></div>
        </div>
        <div class="celtic-card card-pos-6" data-pos="pos6"></div>
        <div class="staff">
            <div class="celtic-card card-pos-10" data-pos="pos10"></div>
            <div class="celtic-card card-pos-9" data-pos="pos9"></div>
            <div class="celtic-card card-pos-8" data-pos="pos8"></div>
            <div class="celtic-card card-pos-7" data-pos="pos7"></div>
        </div>
    `;

    container.innerHTML = `
    <button class="modal-close" aria-label="Cerrar modal">×</button>
        <h2 class="modal-title">Tu Lectura de Cruz Celta</h2>
        <div class="reading-board-container">
            <div id="celtic-cross-board">${cardPositions}</div>
        </div>
        <div class="tarotista-ia-section">
            <h3>Interpretación del Tarotista IA</h3>
            <p id="tarotista-response">El tarotista está analizando tu tirada, por favor espera...</p>
        </div>
    `;

    for (let i = 1; i <= 10; i++) {
        const posKey = `pos${i}`;
        const card = cards[posKey];
        const cardElement = container.querySelector(`[data-pos="${posKey}"]`);
        if (card && cardElement) {
            cardElement.innerHTML = `<img src="../${card.image}" alt="${card.name}" title="${card.positionName}: ${card.name}">`;
            cardElement.addEventListener('click', () => showCardDetail(card));
        }
    }
    addCloseButtonLogic(container.closest('.modal-container'));
}

function showCardDetail(card) {
    let detailModal = document.getElementById('card-detail-modal');
    if (!detailModal) {
        detailModal = document.createElement('div');
        detailModal.id = 'card-detail-modal';
        document.body.appendChild(detailModal);
    }

    detailModal.innerHTML = `
        <div class="card-detail-content">
            <span class="close-btn">&times;</span>
            <h3>${card.positionName}: ${card.name}</h3>
            <img src="../${card.image}" alt="${card.name}">
            <p>${card.description}</p>
        </div>
    `;

    detailModal.classList.add('show');

    const closeBtn = detailModal.querySelector('.close-btn');
    closeBtn.onclick = () => detailModal.classList.remove('show');

    window.onclick = (event) => {
        if (event.target === detailModal) {
            detailModal.classList.remove('show');
        }
    };
}

function textToSpeech(text) {
    if (!text) return;

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = 'es-ES';
    speech.rate = 0.95;   
    speech.pitch = 1.05;  

    window.speechSynthesis.speak(speech);
}

function addCloseButtonLogic(modal) {
    const closeButton = modal.querySelector('.modal-close');
    if (closeButton) {
        closeButton.onclick = () => modal.classList.remove('show');
    }
}