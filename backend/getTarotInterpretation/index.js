const axios = require('axios');
require('dotenv').config();

const OLLAMA_API = process.env.OLLAMA_API_URL || 'http://localhost:11434/api/generate';
const MODEL = process.env.OLLAMA_MODEL || 'llama3';

module.exports = async function (context, req) {
    context.log('Function getTarotInterpretation triggered');
    
    // Validar que los datos existan
    if (!req.body || !req.body.formData || !req.body.cardsData) {
        context.res = {
            status: 400,
            body: JSON.stringify({
                error: 'Faltan datos: formData y cardsData son requeridos'
            })
        };
        return;
    }

    try {
        const { formData, cardsData } = req.body;
        
        // Construir el prompt
        const prompt = buildPrompt(formData, cardsData);
        
        context.log('Enviando solicitud a Ollama...');
        
        // Llamar a Ollama
        const ollamaResponse = await axios.post(OLLAMA_API, {
            model: MODEL,
            prompt: prompt,
            stream: false,
            temperature: 0.7,
        }, {
            timeout: 300000 // 5 minutos de timeout
        });

        const interpretation = ollamaResponse.data.response || '';
        
        context.log('Respuesta de Ollama recibida exitosamente');
        
        context.res = {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            body: JSON.stringify({
                success: true,
                response: interpretation
            })
        };
    } catch (error) {
        context.log('Error:', error.message);
        
        let errorMessage = 'Error al conectar con Ollama';
        let statusCode = 500;
        
        if (error.code === 'ECONNREFUSED') {
            errorMessage = 'No se puede conectar con Ollama. Asegúrate de que esté corriendo en ' + OLLAMA_API;
            statusCode = 503;
        } else if (error.message.includes('timeout')) {
            errorMessage = 'Timeout: La solicitud tardó demasiado tiempo';
            statusCode = 504;
        }
        
        context.res = {
            status: statusCode,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                success: false,
                error: errorMessage,
                details: error.message
            })
        };
    }
};

function buildPrompt(formData, cardsData) {
    const systemPrompt = `Eres un Tarotista experto y empático. Tu tarea es interpretar las cartas del tarot de manera profunda, considerando el contexto personal del usuario.

Rol: Tarotista
Instrucciones: Necesito que como tarotista le expliques bien al usuario acerca de cada carta que se le asignó en base a Pasado, Presente y Futuro y los datos aportados por el usuario. Por último resumile el resultado final con consejos para afrontarlo.

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
${formData.pareja ? `- Pareja: ${formData.pareja}` : ''}

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
