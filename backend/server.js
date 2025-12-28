const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Variables de entorno
const OLLAMA_API = process.env.OLLAMA_API_URL || 'http://localhost:11434/api/generate';
const MODEL = process.env.OLLAMA_MODEL || 'llama3';

// Rutas
app.get('/', (req, res) => {
    res.json({ 
        message: 'TuTarot Backend - API de Tarot',
        version: '1.0.0',
        status: 'online'
    });
});

app.get('/health', (req, res) => {
    res.json({ status: 'healthy' });
});

// POST /api/tarot - Obtener interpretación del tarot
app.post('/api/tarot', async (req, res) => {
    try {
        console.log('Solicitud recibida en /api/tarot');
        
        if (!req.body || !req.body.formData || !req.body.cardsData) {
            return res.status(400).json({
                success: false,
                error: 'Faltan datos: formData y cardsData son requeridos'
            });
        }

        const { formData, cardsData } = req.body;
        
        // Construir el prompt
        const prompt = buildPrompt(formData, cardsData);
        
        console.log('Enviando solicitud a Ollama en:', OLLAMA_API);
        
        // Llamar a Ollama
        const ollamaResponse = await axios.post(OLLAMA_API, {
            model: MODEL,
            prompt: prompt,
            stream: false,
            temperature: 0.7,
        }, {
            timeout: 300000 // 5 minutos
        });

        const interpretation = ollamaResponse.data.response || '';
        
        console.log('✓ Respuesta de Ollama recibida exitosamente');
        
        res.json({
            success: true,
            response: interpretation
        });
    } catch (error) {
        console.error('❌ Error:', error.message);
        
        let errorMessage = 'Error al conectar con Ollama';
        let statusCode = 500;
        
        if (error.code === 'ECONNREFUSED') {
            errorMessage = 'No se puede conectar con Ollama. Asegúrate de que esté corriendo en ' + OLLAMA_API;
            statusCode = 503;
        } else if (error.message.includes('timeout')) {
            errorMessage = 'Timeout: La solicitud tardó demasiado tiempo. Ollama tarda más de lo esperado.';
            statusCode = 504;
        }
        
        res.status(statusCode).json({
            success: false,
            error: errorMessage,
            details: error.message
        });
    }
});

// Función para construir el prompt
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

// Manejo de rutas no encontradas
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Ruta no encontrada',
        path: req.path
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════╗
║     TuTarot Backend - Servidor OK     ║
╠════════════════════════════════════════╣
║ Puerto: ${PORT}
║ Ollama API: ${OLLAMA_API}
║ Modelo: ${MODEL}
╚════════════════════════════════════════╝
    `);
});
