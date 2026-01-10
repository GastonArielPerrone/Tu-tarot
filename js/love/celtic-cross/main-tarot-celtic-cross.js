document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Cargado - Iniciando script');

    try {
        const mute = document.querySelector('.muted');
        if (mute) {
            const ttsmuted = new SpeechSynthesisUtterance(mute.textContent);
            ttsmuted.lang = 'es-ES';
            ttsmuted.rate = 0.80;
            ttsmuted.pitch = 1.2;
            ttsmuted.volume = 0.5;
            window.speechSynthesis.cancel();
            window.speechSynthesis.speak(ttsmuted);
        }
    } catch (error) {
        console.log('TTS inicial no disponible:', error.message);
    }
    
    const form = document.getElementById('celtic-cross-form');
    const modal = document.getElementById('myModal');
    
    console.log('Formulario encontrado:', !!form);
    console.log('Modal encontrado:', !!modal);
    
    if (!form || !modal) {
        console.error('Error: Formulario o modal no encontrados');
        return;
    }
    
    const modalContent = modal.querySelector('.modal-content');
    
    if (!modalContent) {
        console.error('Error: modal-content no encontrado');
        return;
    }
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
        submitBtn.addEventListener('click', async (event) => {
            console.log('Click en botón capturado');
            event.preventDefault();
            event.stopPropagation();
            
            if (!form.checkValidity()) {
                console.log('Formulario no válido');
                form.reportValidity();
                return false;
            }
            
            const formData = {
                nombres: document.getElementById('nombres') ? document.getElementById('nombres').value : '',
                apellidos: document.getElementById('apellidos') ? document.getElementById('apellidos').value : '',
                edad: document.getElementById('edad') ? document.getElementById('edad').value : '',
                estado: document.getElementById('estado') ? document.getElementById('estado').value : '',
                detalle: document.getElementById('detalle') ? document.getElementById('detalle').value : ''
            };
            currentFormData = formData;
            
            console.log('Datos capturados:', currentFormData);
            
            console.log('Cargando cartas...');
            
            try {
                const cards = await selectCelticCrossRandom();
                
                console.log('Cartas recibidas:', cards);
                
                if (cards) {
                    currentCardsData = cards;
                    
                    renderModalContent(cards);
                    
                    openModal();
                
                    await generateTarotistInterpretation();
                } else {
                    console.error('No se pudo cargar las cartas:', cards);
                    alert('Error al cargar las cartas. Intenta de nuevo.');
                }
            } catch (error) {
                console.error('Error al seleccionar cartas:', error);
                alert('Error al seleccionar las cartas: ' + error.message);
            }
            
            return false;
        });
    } else {
        console.error('Botón de envío no encontrado');
    }
    
    function renderModalContent(cards) {
        console.log('Renderizando modal con cartas:', cards);
        
        let cardsHTML = '';
        for (let i = 1; i <= 10; i++) {
            const card = cards[`pos${i}`];
            if (card) {
                cardsHTML += `
                    <div class="card-reading" style="flex: 1; display: flex; flex-direction: column; align-items: center; text-align: center; margin: 10px; min-width: 150px;">
                        <div class="card-position" style="font-weight: bold; margin-bottom: 5px;">${card.positionName}</div>
                        <img src="${card.image}" alt="${card.name}" class="card-image" style="max-width: 120px; height: auto; margin-bottom: 10px; border-radius: 8px;">
                        <div class="card-name" style="font-weight: bold; margin-bottom: 5px; font-size: 0.9em;">${card.name}</div>
                    </div>
                `;
            }
        }

        const html = `
            <button class="modal-close" aria-label="Cerrar modal">×</button>
            <h2 class="modal-title">Tu Lectura de Cruz Celta 🔮</h2>
            <div class="cards-container" style="display: flex; flex-wrap: wrap; justify-content: center; max-height: 400px; overflow-y: auto;">
                ${cardsHTML}
            </div>
            
            <!-- Sección Tarotista IA -->
            <div id="tarotista-section" class="tarotista-ia-section" style="margin-top: 30px; padding: 20px; border: 2px solid #9945ff; border-radius: 10px; background: rgba(153, 69, 255, 0.05);">
                <h3 style="color: #9945ff; margin-top: 0; display: flex; align-items: center; gap: 10px;">
                    <span>🔮</span>
                    Interpretación del Tarotista IA
                </h3>
                <div id="tarotista-response" style="min-height: 100px; color: #666; line-height: 1.6;">
                    <p style="color: #999;">Cargando interpretación del Tarotista IA...</p>
                </div>
            </div>
        `;
        
        const content = modal.querySelector('.modal-content');
        if (content) {
            content.innerHTML = html;
            
            const closeBtn = content.querySelector('.modal-close');
            if (closeBtn) {
                closeBtn.addEventListener('click', closeModal);
            }
        }
    }
    
    async function generateTarotistInterpretation() {
        const responseDiv = document.getElementById('tarotista-response');
        if (!responseDiv) {
            console.error('tarotista-response no encontrado');
            return;
        }
        
        try {
            console.log('Solicitando interpretación a Ollama...');
            const response = await getTarotistInterpretation(currentFormData, currentCardsData);
            console.log('Respuesta recibida de Ollama');
            
            responseDiv.innerHTML = `<p>${response.replace(/\n/g, '<br>')}</p>`;
            
            if (ttsEnabled) {
                try {
                    const utterance = new SpeechSynthesisUtterance(response);
                    utterance.lang = 'es-ES';
                    utterance.rate = 0.9;
                    utterance.pitch = 1.0;
                    utterance.volume = 1.0;
                    window.speechSynthesis.speak(utterance);
                    console.log('TTS iniciado');
                } catch (ttsError) {
                    console.error('Error en TTS:', ttsError);
                }
            }
            
        } catch (error) {
            console.error('Error al obtener la interpretación:', error);
            responseDiv.innerHTML = `<p style="color: #d32f2f;"><strong>Error:</strong> ${error.message}</p>`;
        }
    }
});

function openModal() {
    const modal = document.getElementById('myModal');
    console.log('Abriendo modal...');
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        console.log('Modal abierto, clase show agregada');
    } else {
        console.error('Modal no encontrado en openModal()');
    }
}

function closeModal() {
    const modal = document.getElementById('myModal');
    console.log('Cerrando modal...');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
        window.speechSynthesis.cancel();
        console.log('Modal cerrado');
    }
}