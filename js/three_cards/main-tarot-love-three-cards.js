import { selectThreeCardsRandom } from "./selectThreeCards.js";
import { getTarotistInterpretation } from "./ollamaService.js";

let currentFormData = null;
let currentCardsData = null;
let ttsEnabled = true;

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('love-three-form');
    const modal = document.getElementById('myModal');
    if (!form || !modal) return;

    const modalContent = modal.querySelector('.modal-content');

    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.classList.contains('show')) closeModal(); });

    form.addEventListener('submit', (e) => { e.preventDefault(); e.stopPropagation(); return false; }, true);

    const btn = form.querySelector('button[type="submit"]');
    if (btn) btn.addEventListener('click', async (e) => {
        e.preventDefault(); e.stopPropagation();
        
        currentFormData = {
            nombres: document.getElementById('nombres').value,
            apellidos: document.getElementById('apellidos').value,
            edad: document.getElementById('edad').value,
            pareja: document.getElementById('pareja').value,
            estado: document.getElementById('estado').value,
            pasado: document.getElementById('pasado').value,
            presente: document.getElementById('presente').value,
            futuro: document.getElementById('futuro').value,
            detalle: document.getElementById('detalle').value
        };

        const cards = await selectThreeCardsRandom();
        if (cards && cards.past && cards.present && cards.future) {
            currentCardsData = cards;
            renderModalContent(cards);
            openModal();
            await generateTarotistInterpretation();
        } else {
            alert('Error al cargar las cartas. Intenta de nuevo.');
        }
    });
    
    function renderModalContent(cards) {
        const { past, present, future } = cards;
        const html = `
            <button class="modal-close" onclick="document.getElementById('myModal').classList.remove('show')">×</button>
            <h2 class="modal-title">Tu Lectura de 3 Cartas 🔮</h2>
            <div class="cards-container">
                <div class="card-reading-simple" data-card="past">
                    <div class="card-position">Pasado</div>
                    <img src="${past.image}" alt="${past.name}" class="card-image">
                    <div class="card-name">${past.name}</div>
                </div>
                <div class="card-reading-simple" data-card="present">
                    <div class="card-position">Presente</div>
                    <img src="${present.image}" alt="${present.name}" class="card-image">
                    <div class="card-name">${present.name}</div>
                </div>
                <div class="card-reading-simple" data-card="future">
                    <div class="card-position">Futuro</div>
                    <img src="${future.image}" alt="${future.name}" class="card-image">
                    <div class="card-name">${future.name}</div>
                </div>
            </div>
            
            <div id="tarotista-section" class="tarotista-ia-section">
                <h3 style="color: #9945ff; margin-top: 0; display: flex; align-items: center;">
                    <span style="margin-right: 10px;">🔮</span> Interpretación del Tarotista IA
                </h3>
                <div id="tarotista-response" style="min-height: 100px; font-style: italic; color: #666; line-height: 1.6;">
                    <p style="color: #999;">Cargando interpretación...</p>
                </div>
            </div>
            
            <div id="card-detail-modal">
                <div class="card-detail-content"></div>
            </div>
        `;
        modalContent.innerHTML = html;

        modalContent.querySelectorAll('.card-reading-simple').forEach(cardElement => {
            cardElement.addEventListener('click', () => {
                const cardKey = cardElement.dataset.card;
                showCardDetailModal(cards[cardKey]);
            });
        });

        const detailModal = document.getElementById('card-detail-modal');
        if (detailModal) {
            detailModal.addEventListener('click', (e) => {
                if (e.target === detailModal) detailModal.classList.remove('show');
            });
        }

        const closeBtn = modal.querySelector('.modal-close');
        if (closeBtn) closeBtn.addEventListener('click', closeModal);
    }

    function showCardDetailModal(card) {
        const detailModal = document.getElementById('card-detail-modal');
        const detailContent = detailModal.querySelector('.card-detail-content');

        detailContent.innerHTML = `
            <span class="close-btn">&times;</span>
            <h3>${card.name}</h3>
            <img src="${card.image}" alt="${card.name}">
            <p>${card.description}</p>
        `;
        
        const closeBtn = detailContent.querySelector('.close-btn');
        if(closeBtn) {
            closeBtn.addEventListener('click', () => detailModal.classList.remove('show'));
        }

        detailModal.classList.add('show');
    }
    
    async function generateTarotistInterpretation() {
        if (!currentFormData || !currentCardsData) return;
        
        const responseDiv = document.getElementById('tarotista-response');
        try {
            responseDiv.innerHTML = '<p style="color: #999;">Consultando al Tarotista IA...</p>';
            stopTTS();
            const interpretation = await getTarotistInterpretation(currentFormData, currentCardsData);
            displayTextLetterByLetter(responseDiv, interpretation);
        } catch (error) {
            responseDiv.innerHTML = `<p style="color: #e74c3c;"><strong>⚠️ Error:</strong> ${error.message}</p>`;
        }
    }
    
    function displayTextLetterByLetter(element, text) {
        element.innerHTML = '';
        let index = 0;
        const speed = 50;
        const p = document.createElement('p');
        p.style.whiteSpace = 'pre-wrap';
        element.appendChild(p);
        const shouldUseSpeech = (typeof window !== 'undefined') && ('speechSynthesis' in window) && ttsEnabled;

        const interval = setInterval(() => {
            if (index < text.length) {
                p.textContent += text.charAt(index);
                index++;
                element.scrollTop = element.scrollHeight;
            } else {
                clearInterval(interval);
                if (shouldUseSpeech) {
                    stopTTS();
                    speakChunk(text);
                }
            }
        }, speed);
    }

    function stopTTS() {
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
            window.speechSynthesis.cancel();
        }
    }

    function speakChunk(chunk) {
        if (!(typeof window !== 'undefined' && 'speechSynthesis' in window) || !ttsEnabled) return;
        try {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(chunk);
            utterance.lang = 'es-ES';
            utterance.rate = 0.95;
            window.speechSynthesis.speak(utterance);
        } catch (e) {}
    }
});

function openModal() {
    const modal = document.getElementById('myModal');
    if(modal) modal.classList.add('show');
}

function closeModal() {
    const modal = document.getElementById('myModal');
    if(modal) modal.classList.remove('show');
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
    }
}