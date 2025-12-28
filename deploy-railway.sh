#!/bin/bash

# Script para desplegar en Railway
# Uso: ./deploy-railway.sh

echo "╔════════════════════════════════════════╗"
echo "║   Despliegue en Railway - TuTarot     ║"
echo "╚════════════════════════════════════════╝"
echo ""

# Verificar que estamos en la carpeta correcta
if [ ! -f "backend/package.json" ]; then
    echo "❌ Error: Ejecuta este script desde la raíz del proyecto"
    exit 1
fi

echo "1️⃣  Verificando Git..."
if ! command -v git &> /dev/null; then
    echo "❌ Git no está instalado"
    exit 1
fi

echo "✅ Git encontrado"
echo ""

echo "2️⃣  Commitando cambios..."
git add .
git commit -m "Preparado para despliegue en Railway"
git push origin main

echo ""
echo "3️⃣  Pasos para desplegar en Railway:"
echo ""
echo "  1. Ve a https://railway.app"
echo "  2. Haz clic en 'New Project'"
echo "  3. Selecciona 'Deploy from GitHub'"
echo "  4. Selecciona tu repositorio Tu-tarot"
echo "  5. Railway detectará automáticamente el backend"
echo "  6. Configura estas variables de entorno:"
echo "     - OLLAMA_API_URL=http://localhost:11434/api/generate"
echo "     - OLLAMA_MODEL=llama3"
echo ""
echo "✅ ¡Listo para despliegue!"
echo ""
echo "📖 Ver documentación: DEPLOYMENT_RAILWAY.md"
