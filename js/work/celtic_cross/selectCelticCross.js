export async function selectCelticCrossRandom() {
    try {
        const response = await fetch('../API/tarot_deck.json');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const cards = await response.json();

        // Barajar y tomar 10 cartas
        const shuffled = [...cards].sort(() => Math.random() - 0.5);
        const selected = shuffled.slice(0, 10).map(card => ({
            ...card,
            image: card.image_path || card.image
        }));

        // Nombres de posiciones en Cruz Celta (1..10)
        const names = [
            'Presente',
            'La influencia / Obstáculo (Cruza)',
            'Pasado lejano',
            'Pasado reciente',
            'Meta consciente / Culminación',
            'Futuro próximo',
            'La persona (actitudes)',
            'Entorno / Influencias externas',
            'Esperanzas y miedos',
            'Resultado probable'
        ];

        const result = {};
        selected.forEach((card, idx) => {
            result[`pos${idx + 1}`] = { ...card, positionName: names[idx] };
        });

        // También devolver array por si hace falta
        result.array = selected;

        return result;
    } catch (error) {
        console.error('Error al cargar cartas Cruz Celta:', error);
        return null;
    }
}