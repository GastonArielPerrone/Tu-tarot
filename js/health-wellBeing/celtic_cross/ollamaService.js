const OLLAMA_API = 'http://localhost:11434/api/generate';
const MODEL = 'llama3';

export async function getTarotistInterpretation(formData, cardsData) {
    try {
        const prompt = buildPrompt(formData, cardsData);
        const response = await fetch(OLLAMA_API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ model: MODEL, prompt, stream: false, temperature: 0.7 })
        });

        if (!response.ok) throw new Error(`Error de Ollama: ${response.status} ${response.statusText}`);
        const data = await response.json();
        return data.response || '';
    } catch (error) {
        console.error('Error al conectar con Ollama (Cruz Celta):', error);
        throw new Error(`No se pudo conectar con Ollama. Asegúrate de que esté ejecutándose en http://localhost:11434. Error: ${error.message}`);
    }
}

function buildPrompt(formData, cardsData) {
    const systemPrompt = `Eres un Tarotista experto y empático. Interpretarás la tirada Cruz Celta de forma clara y profunda.
    Tema: Salud y Bienestar.`;

    let cardsText = '';
    for (let i = 1; i <= 10; i++) {
        const c = cardsData[`pos${i}`];
        if (c) {
            cardsText += `\n- POSICION ${i} (${c.positionName}): ${c.name}\n  Descripción: ${c.description}\n`;
        }
    }

    const userContext = `
Datos del usuario:
- Nombre: ${formData.nombres || ''} ${formData.apellidos || ''}
- Edad: ${formData.edad || ''}
- Estado sentimental: ${formData.estado || ''}

Contexto aportado:
- ${formData.detalle || 'Sin detalles adicionales'}

Cartas asignadas:${cardsText}

Por favor realiza una interpretación por posición explicando el significado en contexto, luego una síntesis final con consejos prácticos y tono empático.`;

    return `${systemPrompt}\n\n${userContext}`;
}
