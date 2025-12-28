# 🎯 Referencia Rápida - Ollama Tarotista IA

## TL;DR (Demasiado Largo; No Leí)

```bash
# 1. Descarga Ollama https://ollama.ai/
# 2. ollama pull llama3
# 3. ollama serve (mantén abierto)
# 4. Abre pages/tarot-love-three-cards.html
# 5. ¡Hecho!
```

---

## Archivos Principales

| Archivo | Qué hace |
|---------|----------|
| `js/ollamaService.js` | Habla con Ollama |
| `js/main-tarot-love-three-cards.js` | Orquesta todo |
| `css/styles.css` | Estilos bonitos |

---

## Flujo Resumido

```
Formulario → Cartas → Ollama → Texto Letra por Letra
```

---

## Comandos Útiles

```bash
# Descargar modelo
ollama pull llama3

# Listar modelos descargados
ollama list

# Ejecutar Ollama (NECESARIO)
ollama serve

# Probar conexión
curl http://localhost:11434
```

---

## Errores Comunes & Soluciones

| Error | Solución |
|-------|----------|
| "No se pudo conectar con Ollama" | Ejecuta `ollama serve` |
| "Modelo no encontrado" | Ejecuta `ollama pull llama3` |
| "Tarda mucho" | Normal, espera 30-120 seg |
| "Sin texto letra por letra" | Abre F12 → Console, revisa errores |

---

## Variables Configurables

```javascript
// js/ollamaService.js
const OLLAMA_API = 'http://localhost:11434/api/generate'; // URL
const MODEL = 'llama3'; // Modelo

// js/main-tarot-love-three-cards.js (función displayTextLetterByLetter)
const speed = 50; // Milisegundos entre letras
```

---

## Flujo de Datos

```
{
  nombres: "María",
  apellidos: "Gómez",
  edad: "32",
  pareja: "Juan",
  estado: "pareja",
  pasado: "...",
  presente: "...",
  futuro: "...",
  detalle: "..."
} ───→ Ollama ───→ Interpretación IA
```

---

## Documentación

| Archivo | Para quién |
|---------|----------|
| `INICIO_RAPIDO.md` | Usuarios nuevos |
| `README_OLLAMA.md` | Visión general |
| `OLLAMA_SETUP.md` | Developers |
| `CAMBIOS_REALIZADOS.md` | Code review |
| `EJEMPLO_RESPUESTA.md` | Expectativas |
| `VERIFICACION.md` | QA/Testing |

---

## Características

✅ Integración Ollama  
✅ Modelo llama3  
✅ Rol Tarotista  
✅ Prompt personalizado  
✅ Datos del usuario  
✅ Interpretación de cartas  
✅ Texto letra por letra  
✅ Manejo de errores  
✅ Documentación  
✅ Configuración fácil  

---

## Performance

⚡ Carga página: < 1 seg  
⏳ Generar cartas: < 1 seg  
⏳ Procesar Ollama: 30-120 seg  
⚡ Animar texto: 10-30 seg  

---

## Browsers Soportados

✅ Chrome 80+  
✅ Firefox 75+  
✅ Safari 13+  
✅ Edge 80+  

---

**¿Preguntas?** Revisa los .md's en la carpeta raíz  
**¿Problemas?** Consulta `OLLAMA_SETUP.md` → Solución de problemas
