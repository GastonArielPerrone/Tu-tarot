# 🔮 Integración de Ollama - Tarotista IA

## Descripción

Se ha integrado el servicio **Ollama** con el modelo **llama3** al proyecto TuTarot. Ahora, después de que se realiza una lectura de tarot de 3 cartas, aparecerá una sección **"Tarotista IA"** que proporcionará una interpretación personalizada basada en:

- Datos del usuario (nombre, edad, estado sentimental, pareja)
- Contexto personal (pasado, presente, futuro)
- Las 3 cartas asignadas (pasado, presente, futuro)

## Requisitos Previos

1. **Tener Ollama instalado** en tu sistema
   - Descargar desde: https://ollama.ai/

2. **Tener el modelo `llama3` descargado**
   - Ejecutar en terminal:

     ```bash
     ollama pull llama3
     ```

3. **Ollama debe estar ejecutándose** en `http://localhost:11434`
   - Por defecto, Ollama se ejecuta en este puerto
   - Si necesitas cambiar el puerto, edita la variable `OLLAMA_API` en `js/ollamaService.js`

## Cómo Funciona

### 1. **Flujo de Ejecución**

```
Usuario completa formulario
        ↓
Se seleccionan 3 cartas al azar
        ↓
Se muestran las cartas en el modal
        ↓
Sistema envía datos a Ollama
        ↓
Ollama genera interpretación con rol "Tarotista"
        ↓
Texto se muestra letra por letra en "Tarotista IA"
```

### 2. **El Prompt del Tarotista**

El sistema envía a Ollama un prompt que incluye:

- **Rol**: "Tarotista experto y empático"
- **Instrucción**: 
  > "Necesito que como tarotista le expliques bien al usuario acerca de cada carta que se le asignó en base a Pasado, Presente y Futuro y los datos aportados por el usuario. Por último resumile el resultado final con consejos para afrontarlo."

- **Contexto del usuario**: Todos los datos del formulario
- **Cartas**: Nombres y descripciones de las 3 cartas seleccionadas

### 3. **Visualización Letra por Letra**

La respuesta de Ollama aparece en la sección "Tarotista IA" **letra por letra** usando `setInterval` con un delay de 50ms por carácter, creando un efecto de escritura en tiempo real.

## Archivos Modificados/Creados

### ✨ Nuevos Archivos

- **`js/ollamaService.js`** - Servicio que maneja la comunicación con Ollama

### 📝 Archivos Modificados

1. **`js/main-tarot-love-three-cards.js`**
   - Agregadas variables globales para almacenar datos del formulario y cartas
   - Agregada función `generateTarotistInterpretation()` para llamar a Ollama
   - Agregada función `displayTextLetterByLetter()` para mostrar el texto con efecto de escritura
   - Modificada `renderModalContent()` para incluir la nueva sección "Tarotista IA"

2. **`css/styles.css`**
   - Agregados estilos para `.tarotista-ia-section`
   - Agregados estilos para `#tarotista-response`
   - Agregada animación `fadeIn` para la sección

3. **`pages/tarot-love-three-cards.html`**
   - (Sin cambios directos, los cambios se hacen via JavaScript)

## Configuración

### Cambiar el Modelo (opcional)

Si deseas usar otro modelo de Ollama, edita `js/ollamaService.js`:

```javascript
const MODEL = 'llama3'; // Cambiar aquí
```

Modelos disponibles:
- `llama3` (recomendado)
- `mistral`
- `neural-chat`
- `orca-mini`
- Otros disponibles en Ollama

### Cambiar Velocidad de Escritura (opcional)

En `js/main-tarot-love-three-cards.js`, en la función `displayTextLetterByLetter()`:

```javascript
const speed = 50; // Milisegundos entre cada carácter (ajusta este valor)
```

### Cambiar la URL de Ollama (si está en otro servidor)

En `js/ollamaService.js`:

```javascript
const OLLAMA_API = 'http://localhost:11434/api/generate'; // Cambiar URL aquí
```

## Solución de Problemas

### ❌ "No se pudo conectar con Ollama"

**Soluciones:**

1. Verifica que Ollama esté ejecutándose:
   ```bash
   ollama serve
   ```

2. Asegúrate de que el modelo esté descargado:
   ```bash
   ollama list
   ```

3. Si no está, descargalo:
   ```bash
   ollama pull llama3
   ```

4. Verifica que puedas acceder a Ollama:
   - Abre en navegador: `http://localhost:11434`
   - Deberías ver: `Ollama is running`

### ⏳ La respuesta tarda mucho

- Esto es normal, especialmente la primera vez
- El modelo `llama3` puede tardar 30-60 segundos en generar la respuesta
- Depende del hardware de tu máquina

### 📝 El texto no aparece letra por letra

- Abre las DevTools (F12) y revisa la consola
- Verifica que no haya errores de JavaScript
- Asegúrate de que `ollamaService.js` se está cargando correctamente

## Características Técnicas

- ✅ Integración asíncrona con Ollama
- ✅ Manejo de errores robusto
- ✅ Estilos responsivos
- ✅ Animación suave de aparición
- ✅ Scroll automático al generar texto
- ✅ Almacenamiento temporal de datos del usuario y cartas

## Próximas Mejoras Posibles

- [ ] Agregar opción de guardar respuesta
- [ ] Agregar opción de regenerar interpretación
- [ ] Estadísticas de interpretaciones
- [ ] Soporte para múltiples idiomas
- [ ] Caché de interpretaciones
- [ ] Opción para cambiar velocidad de escritura
- [ ] Tema oscuro/claro para la sección IA

---

**Versión**: 1.0  
**Último actualizado**: 28 de diciembre de 2025
