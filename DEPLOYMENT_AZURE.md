# Instrucciones de Despliegue en Azure Functions

## Requisitos Previos
- Cuenta de Azure (gratuita)
- Azure CLI instalado: https://docs.microsoft.com/cli/azure/install-azure-cli
- Node.js 18+
- Azure Functions Core Tools: `npm install -g azure-functions-core-tools@4 --unsafe-perm true`

## Pasos de Despliegue

### 1. Preparar el Backend Localmente

```bash
# Ir a la carpeta del backend
cd backend

# Instalar dependencias
npm install
```

### 2. Crear la Aplicación de Función en Azure

```bash
# Instalar Azure CLI si no lo tienes
npm install -g azure-functions-core-tools@4 --unsafe-perm true

# Iniciar sesión en Azure
az login

# Crear un Resource Group (reemplazar con tu región)
az group create --name TuTarotRG --location eastus

# Crear una Storage Account
az storage account create \
  --name tutarotstorage \
  --location eastus \
  --resource-group TuTarotRG \
  --sku Standard_LRS

# Crear la Function App
az functionapp create \
  --resource-group TuTarotRG \
  --consumption-plan-location eastus \
  --runtime node \
  --runtime-version 18 \
  --functions-version 4 \
  --name tutarot-backend \
  --storage-account tutarotstorage
```

### 3. Configurar Variables de Entorno en Azure

```bash
# Configurar la URL de Ollama
az functionapp config appsettings set \
  --name tutarot-backend \
  --resource-group TuTarotRG \
  --settings OLLAMA_API_URL="http://tu-ip-ollama:11434/api/generate" OLLAMA_MODEL="llama3"
```

> **Nota:** Reemplazar `tu-ip-ollama` con la dirección IP del servidor donde corre Ollama

### 4. Desplegar la Función

```bash
# Opción A: Desde GitHub (Recomendado)
# 1. Push del código a GitHub
# 2. Conectar el repositorio en Azure Portal
# 3. Configurar CI/CD automático

# Opción B: Desplegar localmente
cd backend
func azure functionapp publish tutarot-backend
```

### 5. Actualizar la Configuración en el Frontend

Actualizar `js/ollamaService.js` con la URL del backend:

```javascript
const BACKEND_API = 'https://tutarot-backend.azurewebsites.net/api/tarot';
```

## Verificación

```bash
# Probar la función
curl -X POST https://tutarot-backend.azurewebsites.net/api/tarot \
  -H "Content-Type: application/json" \
  -d '{
    "formData": {"nombres": "Test", "apellidos": "User", "edad": 25, "estado": "Soltero", "pasado": "Búsqueda", "presente": "Reflexión", "futuro": "Cambio"},
    "cardsData": {
      "past": {"name": "El Mago", "description": "Potencial y poder creativo"},
      "present": {"name": "El Ermitaño", "description": "Introspección y búsqueda interna"},
      "future": {"name": "La Rueda de la Fortuna", "description": "Cambio y ciclos"}
    }
  }'
```

## Monitoreo

En Azure Portal:
- Monitor > Application Insights
- Ver logs en tiempo real: `az functionapp log tail --name tutarot-backend --resource-group TuTarotRG`

## Costos

- **Gratis:** Primeros 1,000,000 de ejecuciones por mes
- **Después:** $0.20 por 1,000,000 de ejecuciones
- Sin costo mínimo si se mantiene bajo el límite gratuito

## Solución de Problemas

### Error: No se puede conectar con Ollama
- Asegúrate que Ollama esté corriendo
- Verifica que la URL de Ollama sea accesible desde Azure
- Si Ollama está en tu máquina local, considera usar un servicio como ngrok

### Timeout (504)
- Aumentar el timeout en `host.json`: cambiar a 600 segundos (10 minutos)

### Error CORS
- El backend ya incluye headers CORS configurados
- Si aún tienes problemas, contactar al administrador
