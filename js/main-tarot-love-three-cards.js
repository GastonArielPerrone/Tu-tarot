import { selectThreeCardsRandom } from "./selectThreeCards.js";
import { getTarotistInterpretation } from "./ollamaService.js";

// Variable global para almacenar datos del formulario y cartas
let currentFormData = null;
let currentCardsData = null;

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Cargado - Iniciando script');
    
    const form = document.getElementById('love-three-form');
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
    
    // Cerrar modal al hacer clic fuera
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Cerrar modal con tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
    
    form.addEventListener('submit', async (event) => {
        console.log('Evento submit capturado');
        event.preventDefault();
        event.stopPropagation();
        return false;
    }, true); // Usar captura para asegurar que se ejecute primero
    
    // Agregar manejador al botón directamente
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
        submitBtn.addEventListener('click', async (event) => {
            console.log('Click en botón capturado');
            event.preventDefault();
            event.stopPropagation();
            
            // Capturar datos del formulario
            const formData = {
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
            
            console.log('Datos capturados:', formData);
            
            // Guardar datos globales para usar en la interpretación
            currentFormData = formData;
            
            // Obtener las 3 cartas seleccionadas al azar
            console.log('Cargando cartas...');
            const cards = await selectThreeCardsRandom();
            
            console.log('Cartas recibidas:', cards);
            
            if (cards && cards.past && cards.present && cards.future) {
                // Guardar datos de cartas
                currentCardsData = cards;
                
                // Renderizar contenido del modal
                renderModalContent(cards.past, cards.present, cards.future);
                
                // Mostrar modal
                openModal();
                
                // Llamar a Ollama para obtener la interpretación
                await generateTarotistInterpretation();
            } else {
                console.error('No se pudieron cargar las cartas:', cards);
                alert('Error al cargar las cartas. Intenta de nuevo.');
            }
            
            return false;
        });
    }
    
    function renderModalContent(pastCard, presentCard, futureCard) {
        console.log('Renderizando modal con cartas');
        const html = `
            <button class="modal-close" onclick="document.getElementById('myModal').classList.remove('show')">×</button>
            <h2 class="modal-title">Tu Lectura de 3 Cartas 🔮</h2>
            <div class="cards-container">
                <div class="card-reading">
                    <div class="card-position">Pasado</div>
                    <img src="${pastCard.image}" alt="${pastCard.name}" class="card-image">
                    <div class="card-name">${pastCard.name}</div>
                    <div class="card-description">${pastCard.description}</div>
                </div>
                <div class="card-reading">
                    <div class="card-position">Presente</div>
                    <img src="${presentCard.image}" alt="${presentCard.name}" class="card-image">
                    <div class="card-name">${presentCard.name}</div>
                    <div class="card-description">${presentCard.description}</div>
                </div>
                <div class="card-reading">
                    <div class="card-position">Futuro</div>
                    <img src="${futureCard.image}" alt="${futureCard.name}" class="card-image">
                    <div class="card-name">${futureCard.name}</div>
                    <div class="card-description">${futureCard.description}</div>
                </div>
            </div>
            
            <!-- Sección Tarotista IA -->
            <div id="tarotista-section" class="tarotista-ia-section" style="margin-top: 30px; padding: 20px; border: 2px solid #9945ff; border-radius: 10px; background: rgba(153, 69, 255, 0.05);">
                <h3 style="color: #9945ff; margin-top: 0; display: flex; align-items: center;">
                    <span style="margin-right: 10px;">🔮</span>
                    Interpretación del Tarotista IA
                </h3>
                <div id="tarotista-response" style="min-height: 100px; font-style: italic; color: #666; line-height: 1.6;">
                    <p style="color: #999;">Cargando interpretación del Tarotista IA...</p>
                </div>
            </div>
            
            <button class="modal-close-btn" onclick="document.getElementById('myModal').classList.remove('show')">Cerrar Lectura</button>
        `;
        modalContent.innerHTML = html;
    }
    
    function openModal() {
        console.log('Abriendo modal');
        modal.classList.add('show');
    }
    
    function closeModal() {
        console.log('Cerrando modal');
        modal.classList.remove('show');
    }
    
    // Función para obtener interpretación del Tarotista IA
    async function generateTarotistInterpretation() {
        if (!currentFormData || !currentCardsData) {
            console.error('No hay datos del formulario o cartas disponibles');
            return;
        }
        
        const responseDiv = document.getElementById('tarotista-response');
        console.log('Elemento tarotista-response encontrado:', !!responseDiv);
        
        try {
            responseDiv.innerHTML = '<p style="color: #999;">Consultando al Tarotista IA... (esto puede tomar unos segundos)</p>';
            
            console.log('Llamando a getTarotistInterpretation...');
            const interpretation = await getTarotistInterpretation(currentFormData, currentCardsData);
            
            console.log('Interpretación recibida, tipo:', typeof interpretation);
            console.log('Largo de interpretación:', interpretation.length);
            console.log('Primeros 100 caracteres:', interpretation.substring(0, 100));
            
            // Mostrar texto letra por letra
            displayTextLetterByLetter(responseDiv, interpretation);
            
        } catch (error) {
            console.error('Error al obtener interpretación:', error);
            responseDiv.innerHTML = `<p style="color: #e74c3c;"><strong>⚠️ Error:</strong> ${error.message}</p>
                <p style="color: #999; font-size: 0.9em;">Asegúrate de que Ollama esté ejecutándose en http://localhost:11434 y que el modelo "llama3" esté disponible.</p>`;
        }
    }
    
    // Función para mostrar el texto letra por letra con setInterval
    function displayTextLetterByLetter(element, text) {
        console.log('displayTextLetterByLetter iniciada');
        console.log('Texto a mostrar (primeros 100 caracteres):', text.substring(0, 100));
        console.log('Elemento recibido:', element);
        
        element.innerHTML = '';
        let index = 0;
        const speed = 50; // Milisegundos entre cada carácter
        
        const p = document.createElement('p');
        p.style.color = 'var(--text-color)';
        p.style.whiteSpace = 'pre-wrap';
        p.style.wordWrap = 'break-word';
        p.style.lineHeight = '1.6';
        element.appendChild(p);
        
        console.log('Párrafo creado, iniciando setInterval');
        
        const interval = setInterval(() => {
            if (index < text.length) {
                p.textContent += text.charAt(index);
                index++;
                // Auto-scroll dentro del elemento si es necesario
                element.scrollTop = element.scrollHeight;
            } else {
                clearInterval(interval);
                console.log('Interpretación completada - ' + index + ' caracteres mostrados');
            }
        }, speed);
    }

    });
