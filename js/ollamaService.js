/**
 * Servicio para integración con Ollama a través del Backend (Railway)
 * Llamada HTTP al backend que actúa como proxy a Ollama
 */

// URL del Backend - Se reemplaza según el entorno
// Producción (Railway): https://tutarot-backend.railway.app/api/tarot
// Desarrollo local: http://localhost:3000/api/tarot
const BACKEND_API = process.env.BACKEND_API_URL || 'https://tutarot-backend.railway.app/api/tarot';

export async function getTarotistInterpretation(formData, cardsData) {
    try {
        console.log('Enviando solicitud al backend en:', BACKEND_API);
        
        const response = await fetch(BACKEND_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                formData: formData,
                cardsData: cardsData
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `Error del servidor: ${response.status}`);
        }

        const data = await response.json();
        console.log('Respuesta del backend recibida ✓');
        console.log('Interpretación:', data.response ? data.response.substring(0, 100) + '...' : 'N/A');
        
        if (!data.success) {
            throw new Error(data.error || 'Error desconocido del backend');
        }
        
        return data.response || '';
    } catch (error) {
        console.error('Error al conectar con el backend:', error);
        throw new Error(`No se pudo conectar con el servicio de tarot. Error: ${error.message}`);
    }
}

