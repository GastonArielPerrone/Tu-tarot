export async function fetchLoveOneCardReading() {
    try {
        const response = await fetch('../API/tarot_deck.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
        })
        .then(response => response.json())
        .then(data => {
            const cards = data.filter(card => 
                card.category && card.category.includes('love')
            );
            const shuffled = [...cards].sort(() => Math.random() - 0.5);
            const selectedCards = shuffled[0];
            
            const mappedCards = selectedCards.map(card => ({
            ...card,
            image: card.image_path || card.image
        }));

        console.log('Cartas seleccionadas:', mappedCards);

        });
        
        return mappedCards;

    } catch (error) {
        console.error('Error fetching love one card reading:', error);
        throw error;
    }
}