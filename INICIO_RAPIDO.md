# 🚀 INICIO RÁPIDO - Tarotista IA

## Requisitos (1 minuto)

```bash
# 1. Descargar Ollama
# Visita: https://ollama.ai/
# Instala y ejecuta

# 2. Descargar modelo llama3 (primera vez: ~5 minutos)
ollama pull llama3

# 3. Ejecutar Ollama
ollama serve
```

## Usar (0 minutos)

1. Abre: `pages/tarot-love-three-cards.html`
2. Completa el formulario (o deja que se auto-rellene en localhost)
3. Haz click en: "Barajar y colocar cartas sobre la mesa"
4. ¡Listo! Verás las cartas y la interpretación del Tarotista IA

## Si algo falla

**Error: "No se pudo conectar con Ollama"**
```
✅ Verifica: http://localhost:11434 (debería decir "Ollama is running")
✅ Ejecuta: ollama serve (en otra terminal)
✅ Revisa: ollama list (debe mostrar llama3)
```

**La respuesta tarda mucho**
```
✅ Normal: llama3 puede tardar 30-120 segundos
✅ Depende: de tu CPU/GPU
```

## Personalizar (opcional)

### Cambiar velocidad de aparición de texto
Archivo: `js/main-tarot-love-three-cards.js`
```javascript
// Busca esta línea en la función displayTextLetterByLetter
const speed = 50; // Cambia este número (50 = rápido, 200 = lento)
```

### Cambiar modelo IA
Archivo: `js/ollamaService.js`
```javascript
const MODEL = 'llama3'; // Cambiar a: mistral, neural-chat, etc.
```

---

**Documentación completa**: Ver `OLLAMA_SETUP.md`  
**Cambios técnicos**: Ver `CAMBIOS_REALIZADOS.md`  
**Ejemplo de respuesta**: Ver `EJEMPLO_RESPUESTA.md`
