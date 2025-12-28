Proxy local para evitar problemas de CORS con Ollama

1) Instalar dependencias (en la raíz del proyecto):

```bash
npm install express http-proxy-middleware cors
```

2) Iniciar el proxy:

```bash
node proxy.js
```

El proxy escucha por defecto en `http://localhost:8080` y reenviará `/api/generate` hacia `http://localhost:11434/api/generate`, añadiendo CORS.

3) Flujo recomendado para desarrollo local:
- Ejecutar Ollama en tu máquina (puerto 11434)
- Ejecutar `node proxy.js`
- Ejecutar tu servidor local (Live Server, `http-server`, o abrir `index.html` desde Live Server)

La app intentará conectarse directamente a `http://localhost:11434` primero; si falla por CORS o red, reintentará vía `http://localhost:8080/api/generate` (proxy).

Alternativas:
- Usar una extensión del navegador para deshabilitar CORS (solo para pruebas)
- Ejecutar todo en un backend real con CORS configurado
