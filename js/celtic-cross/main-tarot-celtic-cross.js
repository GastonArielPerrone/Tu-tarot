import { selectCelticCrossRandom } from './selectCelticCross.js';
import { getTarotistInterpretation } from './ollamaService.js';

let currentFormData = null;
let currentCardsData = null;
let ttsEnabled = true;

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('celtic-cross-form');
    const modal = document.getElementById('myModal');
    if (!form || !modal) return;

    const modalContent = modal.querySelector('.modal-content');

    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.classList.contains('show')) closeModal(); });

    form.addEventListener('submit', (e) => { e.preventDefault(); e.stopPropagation(); return false; }, true);

    const btn = form.querySelector('button[type="submit"]');
    if (btn) btn.addEventListener('click', async (e) => {
        e.preventDefault(); e.stopPropagation();
        const formData = {
            nombres: document.getElementById('nombres') ? document.getElementById('nombres').value : '',
            apellidos: document.getElementById('apellidos') ? document.getElementById('apellidos').value : '',
            edad: document.getElementById('edad') ? document.getElementById('edad').value : '',
            estado: document.getElementById('estado') ? document.getElementById('estado').value : '',
            detalle: document.getElementById('detalle') ? document.getElementById('detalle').value : ''
        };
        currentFormData = formData;

        const cards = await selectCelticCrossRandom();
        if (!cards) { alert('Error al cargar cartas.'); return; }
        currentCardsData = cards;

        renderModalContent(cards);
        openModal();
        await generateTarotistInterpretation();
    });

    function renderModalContent(cards) {
        const html = `
            <button class="modal-close" onclick="document.getElementById('myModal').classList.remove('show')">×</button>
            <h2 class="modal-title">Lectura Cruz Celta 🔮</h2>
            <div class="reading-board-container">
                <div id="celtic-cross-board">
                    <div class="center-cross">
                        ${renderCardHtml(cards.pos1, 1)}
                        ${renderCardHtml(cards.pos2, 2)}
                    </div>
                    ${renderCardHtml(cards.pos3, 3)}
                    ${renderCardHtml(cards.pos4, 4)}
                    ${renderCardHtml(cards.pos5, 5)}
                    ${renderCardHtml(cards.pos6, 6)}
                    <div class="staff">
                        ${renderCardHtml(cards.pos7, 7)}
                        ${renderCardHtml(cards.pos8, 8)}
                        ${renderCardHtml(cards.pos9, 9)}
                        ${renderCardHtml(cards.pos10, 10)}
                    </div>
                </div>
            </div>

            <div id="tarotista-section" class="tarotista-ia-section" style="margin-top:20px; padding:16px; border:2px solid #9945ff; border-radius:8px; background:rgba(153,69,255,0.04);">
                <h3 style="color:#9945ff; margin:0 0 10px 0; display:flex; align-items:center;">🔮 Interpretación del Tarotista IA</h3>
                <div id="tarotista-response" style="min-height:120px; color:#666; line-height:1.6; white-space:pre-wrap;"></div>
            </div>

            <button class="modal-close-btn" onclick="document.getElementById('myModal').classList.remove('show')">Cerrar Lectura</button>
            
            <div id="card-detail-modal">
                <div class="card-detail-content"></div>
            </div>
        `;
        modalContent.innerHTML = html;

        // Add click listeners to cards
        Object.values(cards).forEach((card, index) => {
            const cardElement = modalContent.querySelector(`.card-pos-${index + 1}`);
            if (cardElement) {
                cardElement.addEventListener('click', () => showCardDetailModal(card));
            }
        });

        const detailModal = document.getElementById('card-detail-modal');
        if (detailModal) {
            detailModal.addEventListener('click', (e) => {
                if (e.target === detailModal) {
                    detailModal.classList.remove('show');
                }
            });
        }
    }

    function renderCardHtml(card, position) {
        if (!card) return '';
        return `
            <div class="celtic-card card-pos-${position}">
                <img src="${card.image}" alt="${card.name}">
                <div style="font-size:0.85rem; margin-top:6px; color:#FFF;"><strong>${card.positionName}</strong></div>
                <div style="font-size:0.75rem; color:#666;">${card.name}</div>
            </div>
        `;
    }

    function showCardDetailModal(card) {
        const detailModal = document.getElementById('card-detail-modal');
        const detailContent = detailModal.querySelector('.card-detail-content');

        detailContent.innerHTML = `
            <span class="close-btn" onclick="document.getElementById('card-detail-modal').classList.remove('show')">&times;</span>
            <h3>${card.name}</h3>
            <img src="${card.image}" alt="${card.name}">
            <p>${card.description}</p>
        `;

        detailModal.classList.add('show');
    }

    function openModal() { modal.classList.add('show'); }
    function closeModal() { modal.classList.remove('show'); stopTTS(); }

    async function generateTarotistInterpretation() {
        if (!currentFormData || !currentCardsData) return;
        const responseDiv = document.getElementById('tarotista-response');
        try {
            responseDiv.innerHTML = '<p style="color:#999;">Consultando al Tarotista IA...</p>';
            stopTTS();
            const interpretation = await getTarotistInterpretation(currentFormData, currentCardsData);
            displayTextLetterByLetter(responseDiv, interpretation);
        } catch (error) {
            responseDiv.innerHTML = `<p style="color:#e74c3c;"><strong>⚠️ Error:</strong> ${error.message}</p>`;
        }
    }

    function displayTextLetterByLetter(element, text) {
        element.innerHTML = '';
        let index = 0;
        const speed = 25;
        const p = document.createElement('p');
        p.style.whiteSpace = 'pre-wrap';
        p.style.lineHeight = '1.6';
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

    function stopTTS() { try { if (typeof window !== 'undefined' && 'speechSynthesis' in window) window.speechSynthesis.cancel(); } catch (e){}}
    function speakChunk(chunk) { if (!(typeof window !== 'undefined' && 'speechSynthesis' in window)) return; if (!ttsEnabled) return; try { window.speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(chunk); u.lang = 'es-ES'; u.rate = 0.95; window.speechSynthesis.speak(u);} catch(e){}}

});