const OLLAMA_API = 'http://localhost:11434/api/generate';
const MODEL = 'llama3';

export async function getTarotistInterpretation(formData, cardsData) {
    try {
        const prompt = buildPrompt(formData, cardsData);
        
        console.log('Enviando solicitud a Ollama...');
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

function buildPrompt(formData, cardsData) {
    const systemPrompt = `Eres un Tarotista experto y empático. Tu tarea es interpretar las cartas del tarot de manera profunda, considerando el contexto personal del usuario.

Rol: Tarotista
Instrucciones: Necesito que como tarotista le expliques bien al usuario acerca de cada carta que se le asignó en base a Pasado, Presente y Futuro y los datos aportados por el usuario. Por último resumile el resultado final con consejos para afrontarlo.
Tema: Trabajo.

Importante:
- Sé empático y considerado en tu interpretación
- Conecta la interpretación de las cartas con los datos personales proporcionados
- Ofrece perspectivas constructivas y esperanzadoras
- Incluye consejos prácticos al final`;

    const userContext = `
Datos del usuario:
- Nombre: ${formData.nombres} ${formData.apellidos}
- Edad: ${formData.edad} años
- Estado sentimental: ${formData.estado}
${formData.empresa_rubro ? `- Empresa/Rubro: ${formData.empresa_rubro}` : ''}

Contexto del usuario:
- PASADO: ${formData.pasado}
- PRESENTE: ${formData.presente}
- FUTURO: ${formData.futuro}
${formData.detalle ? `- Detalles adicionales: ${formData.detalle}` : ''}

Cartas asignadas:
- PASADO: ${cardsData.past.name}
  Descripción: ${cardsData.past.description}

- PRESENTE: ${cardsData.present.name}
  Descripción: ${cardsData.present.description}

- FUTURO: ${cardsData.future.name}
  Descripción: ${cardsData.future.description}

Por favor, realiza una interpretación profunda y personalizada de estas cartas considerando el contexto del usuario.`;

    return `${systemPrompt}\n\n${userContext}`;
}