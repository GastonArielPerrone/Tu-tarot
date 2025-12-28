# Despliegue en Railway - Guía Rápida

Railway es el servicio más simple para desplegar tu backend. **¡Totalmente gratis!**

## 🚀 Pasos para Desplegar en Railway

### Paso 1: Preparar tu código
El código ya está listo. Solo asegúrate de que los archivos estén en GitHub:

```bash
git add .
git commit -m "Backend convertido a Express para Railway"
git push origin main
```

### Paso 2: Registrarse en Railway
1. Ve a https://railway.app
2. Haz clic en **"Start Project"**
3. Conéctate con tu cuenta de GitHub (autoriza Railway)

### Paso 3: Crear nuevo proyecto
1. Haz clic en **"New Project"**
2. Selecciona **"Deploy from GitHub"**
3. Selecciona el repositorio **Tu-tarot**
4. Railway automáticamente detectará la carpeta `backend/`

### Paso 4: Configurar Variables de Entorno
En el dashboard de Railway:
1. Entra al servicio que se creó
2. Ve a **"Variables"**
3. Agrega estas variables:
   ```
   OLLAMA_API_URL=http://localhost:11434/api/generate
   OLLAMA_MODEL=llama3
   PORT=3000
   ```

> **Importante:** Reemplaza `http://localhost:11434` con la URL real donde corre Ollama:
> - Si Ollama está en tu máquina local y quieres acceso desde Railway, necesitas exponer el puerto (ngrok, etc.)
> - Si Ollama está en un servidor remoto, pon su IP/dominio

### Paso 5: ¡Listo!
Railway automáticamente:
- ✅ Instala dependencias (`npm install`)
- ✅ Ejecuta el servidor (`npm start`)
- ✅ Te asigna una URL como: `https://tutarot-backend.railway.app`

## 🧪 Probar el Servidor Localmente

Antes de desplegar, prueba localmente:

```bash
cd backend

# Instalar dependencias
npm install

# Ejecutar el servidor
npm start
```

Deberías ver:
```
╔════════════════════════════════════════╗
║     TuTarot Backend - Servidor OK     ║
╠════════════════════════════════════════╣
║ Puerto: 3000
║ Ollama API: http://localhost:11434/api/generate
║ Modelo: llama3
╚════════════════════════════════════════╝
```

Luego prueba la API con curl:
```bash
curl -X POST http://localhost:3000/api/tarot \
  -H "Content-Type: application/json" \
  -d '{
    "formData": {
      "nombres": "Juan",
      "apellidos": "Pérez",
      "edad": 30,
      "estado": "Soltero",
      "pasado": "Búsqueda",
      "presente": "Reflexión",
      "futuro": "Cambio"
    },
    "cardsData": {
      "past": {"name": "El Mago", "description": "Potencial y poder creativo"},
      "present": {"name": "El Ermitaño", "description": "Introspección y búsqueda interna"},
      "future": {"name": "La Rueda de la Fortuna", "description": "Cambio y ciclos"}
    }
  }'
```

## 📋 Actualizar ollamaService.js

Después de desplegar en Railway, actualiza la URL en tu frontend:

**En `js/ollamaService.js`:**
```javascript
const BACKEND_API = 'https://tutarot-backend.railway.app/api/tarot';
```

O mejor, usa una variable de entorno que se cargue automáticamente.

## ⚙️ Solución de Problemas

### Error: "Cannot find module 'express'"
- Asegúrate de que `package.json` tiene express en dependencias
- Railway ejecutará automáticamente `npm install`

### Error: "Ollama unreachable"
El problema más común es que Railway no puede alcanzar tu Ollama local:

**Soluciones:**
1. **ngrok** (más simple):
   ```bash
   ngrok http 11434
   ```
   Luego usa la URL que te da ngrok en OLLAMA_API_URL

2. **Ollama en servidor remoto:**
   Asegúrate que el puerto 11434 esté abierto y configura la IP correcta

3. **Ejecuta Ollama en Railway también:**
   Crea otro servicio de Railway para Ollama

### Error: "CORS"
Ya está configurado en el backend, pero si aún tienes problemas, verifica:
- El header `Access-Control-Allow-Origin: *` está en las respuestas
- GitHub Pages está llamando a la URL correcta

## 📊 Monitor el Servidor

En el dashboard de Railway:
- Ver logs en tiempo real
- Ver uso de memoria/CPU
- Ver deployments anteriores

## 💰 Costos

**Totalmente gratis** mientras uses:
- Menos de 500 horas/mes
- Menos de 100GB de almacenamiento

Eso es más que suficiente para una aplicación personal.

## 📚 Documentación Oficial

- Railway: https://docs.railway.app
- Express: https://expressjs.com
