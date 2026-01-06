/**
 * Función para seleccionar una carta aleatoria del tarot
 */

export async function selectOneCardRandom() {
    try {
        // Ruta correcta: subir desde js/one_card/ → js/ → raíz → API/
        const response = await fetch('../API/tarot_deck.json');
        
        if (!response.ok) {
            throw new Error('Error 404: No se pudo cargar el archivo tarot_deck.json. Status: ' + response.status);
        }
        
        const data = await response.json();
        console.log('Deck cargado:', data.length, 'cartas totales');
        
        if (!Array.isArray(data) || data.length === 0) {
            throw new Error('El archivo tarot_deck.json no es un array válido o está vacío');
        }
        
        // Seleccionar una carta aleatoria de todas las disponibles
        const randomIndex = Math.floor(Math.random() * data.length);
        const selectedCard = data[randomIndex];
        
        // Validar que la carta tenga los campos necesarios
        if (!selectedCard.name || !selectedCard.description) {
            throw new Error('La carta no tiene los campos "name" o "description"');
        }
        
        // Mapear la carta con su imagen
        const mappedCard = {
            ...selectedCard,
            image: selectedCard.image_path || selectedCard.image || '../static/images/tarot/default.png'
        };
        
        console.log('Carta seleccionada:', mappedCard.name, '(' + mappedCard.id + ')');
        console.log('URL de imagen:', mappedCard.image);
        
        return mappedCard;
        
    } catch (error) {
        console.error('Error al seleccionar carta:', error);
        throw error;
    }
}