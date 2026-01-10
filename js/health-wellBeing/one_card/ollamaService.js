const OLLAMA_API = 'http://localhost:11434/api/generate';
const MODEL = 'llama3';

export async function getTarotistInterpretationOneCard(formData, cardData) {
    try {
        const prompt = buildPrompt(formData, cardData);
        
        console.log('Enviando solicitud a Ollama para carta única...');
        console.log('Prompt:', prompt);
        
        const response = await fetch(OLLAMA_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: MODEL,
                prompt: prompt,
                stream: false,
                temperature: 0.7,
            })
        });

        if (!response.ok) {
            throw new Error(`Error de Ollama: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Respuesta de Ollama recibida');
        console.log('Data recibida:', data);
        console.log('Response property:', data.response);
        console.log('Largo de respuesta:', data.response ? data.response.length : 'N/A');
        
        return data.response || '';
    } catch (error) {
        console.error('Error al conectar con Ollama:', error);
        throw new Error(`No se pudo conectar con Ollama. Asegúrate de que esté ejecutándose en http://localhost:11434. Error: ${error.message}`);
    }
}

function buildPrompt(formData, cardData) {
    const systemPrompt = `Eres un Tarotista experto y empático. Tu tarea es interpretar las cartas del tarot de manera profunda, considerando el contexto personal del usuario.

Rol: Tarotista
Instrucciones: Necesito que como tarotista le expliques bien al usuario acerca de la carta que se le asignó considerando la situación actual sobre su salud y bienestar mencionada. Por último, resumile el resultado final con consejos constructivos para afrontarlo.

Importante:
- Sé empático y considerado en tu interpretación
- Conecta la interpretación de la carta con los datos personales proporcionados
- Ofrece perspectivas constructivas y esperanzadoras
- Incluye consejos prácticos al final`;

    const userContext = `
Datos del usuario:
- Nombre: ${formData.nombres} ${formData.apellidos}
- Edad: ${formData.edad} años
- Estado actual de Salud y Bienestar: ${formData.salud_actual}

Carta asignada:
- ${cardData.name}
  Descripción: ${cardData.description}

Por favor, realiza una interpretación profunda y personalizada de esta carta considerando el contexto amoroso del usuario.`;

    return `${systemPrompt}\n\n${userContext}`;
}