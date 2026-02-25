export async function selectThreeCardsRandom() {
    try {
        console.log('Iniciando carga de cartas...');
        const response = await fetch('../API/tarot_deck.json');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const cards = await response.json();
        console.log('Cartas cargadas:', cards.length);

        const shuffled = [...cards].sort(() => Math.random() - 0.5);
        const selectedCards = shuffled.slice(0, 3);

        const mappedCards = selectedCards.map(card => ({
            ...card,
            image: card.image_path || card.image
        }));

        console.log('Cartas seleccionadas:', mappedCards);

        return {
            past: mappedCards[0],
            present: mappedCards[1],
            future: mappedCards[2]
        };
    } catch (error) {
        console.error('Error al cargar las cartas:', error);
        return null;
    }
}
