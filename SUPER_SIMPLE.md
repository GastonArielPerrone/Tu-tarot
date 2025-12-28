# 🔮 GUÍA SUPER SIMPLE - Tarotista IA

## ¿Qué pasó?

Se integró **Ollama** (una IA local) al proyecto de tarot. Ahora cuando haces una lectura, ¡aparece un Tarotista IA que da una interpretación personalizada!

---

## ¿Cómo lo uso?

### PASO 1: Descargar Ollama
1. Ve a https://ollama.ai/
2. Descarga e instala
3. Abre terminal y escribe:
   ```
   ollama pull llama3
   ```
   (Tarda ~5 minutos la primera vez)

### PASO 2: Ejecutar Ollama
Abre una terminal y escribe:
```
ollama serve
```
(Deja esta ventana abierta mientras usas la app)

### PASO 3: Usar la app
1. Abre: `pages/tarot-love-three-cards.html`
2. Completa el formulario (o se llena solo si estás en localhost)
3. Haz click en: "Barajar y colocar cartas sobre la mesa"
4. ¡Espera! El Tarotista IA está pensando (30-120 segundos)
5. ¡Disfruta la lectura! ✨

---

## ¿Qué cambió en el proyecto?

### Archivos Nuevos
- `js/ollamaService.js` - Habla con la IA

### Archivos Modificados
- `js/main-tarot-love-three-cards.js` - Orquesta todo
- `css/styles.css` - Diseño bonito

### Documentación (8 archivos)
- Guías completas para entender cómo funciona

---

## ¿Qué ve el usuario?

```
┌────────────────────────────────┐
│    Tu Lectura de 3 Cartas 🔮   │
├────────────────────────────────┤
│                                │
│   Pasado    Presente    Futuro │
│   [Card]     [Card]     [Card] │
│                                │
├────────────────────────────────┤
│ 🔮 Tarotista IA                 │
│                                │
│ Querida [Nombre], tu lectura... │
│ (aparece letra por letra ✍️)   │
│ ...                            │
│ Con consejos al final          │
│                                │
└────────────────────────────────┘
```

---

## ¿Cuánto tarda?

- ⚡ Cargar página: 1 segundo
- ⚡ Buscar cartas: 1 segundo  
- ⏳ IA procesando: 30-120 segundos (NORMAL)
- ⚡ Mostrar texto: 10-30 segundos
- **TOTAL**: 1-3 minutos aproximadamente

---

## ¿Qué pasa si da error?

### Error: "No se conecta con Ollama"
**Solución**: Abre otra terminal y escribe:
```
ollama serve
```

### Error: "Modelo no encontrado"
**Solución**: Escribe en terminal:
```
ollama pull llama3
```

### Tarda mucho tiempo
**Solución**: ¡Es normal! Espera. La primera vez es más lenta.

---

## ¿Se puede personalizar?

### Cambiar velocidad de escritura
En `js/main-tarot-love-three-cards.js`, busca:
```javascript
const speed = 50;
```
Cambia 50 a:
- 20 = MUY RÁPIDO
- 50 = RÁPIDO
- 100 = NORMAL
- 200 = LENTO

### Cambiar modelo de IA
En `js/ollamaService.js`, busca:
```javascript
const MODEL = 'llama3';
```
Puedes cambiar a:
- `mistral` (rápido, menos preciso)
- `neural-chat` (equilibrado)
- `llama3` (más lento, más preciso) ← RECOMENDADO

---

## Archivos Importantes para Leer

| Archivo | Qué es |
|---------|--------|
| `INICIO_RAPIDO.md` | Lo más importante (1 minuto) |
| `README_OLLAMA.md` | Explicación completa |
| `QUICK_REFERENCE.md` | Referencia rápida |
| `OLLAMA_SETUP.md` | Detalles técnicos |

---

## Checklist Rápido

```
☐ Descargué Ollama
☐ Ejecuté: ollama pull llama3
☐ Ejecuto: ollama serve (en otra terminal)
☐ Abro la página tarot-love-three-cards.html
☐ Completo el formulario
☐ Hago click en "Barajar y colocar cartas"
☐ Espero 30-120 segundos
☐ ¡Leo la interpretación del Tarotista IA!
```

---

## Lo Importante

✅ **TODO se ejecuta en tu máquina**  
✅ **NO se envía data a internet**  
✅ **Los datos NO se guardan**  
✅ **Es 100% privado**  

---

## Ejemplos de Lo Que Ves

### Entrada (datos del usuario)
```
Nombre: María Ana
Edad: 32
Estado: En pareja
Contexto Pasado: Relación intensa hace 2 años
Contexto Presente: Incertidumbre pero esperanza
Contexto Futuro: Posible reconciliación
```

### Salida (Tarotista IA)
```
Querida María Ana,

Tu lectura revela un hermoso viaje de transformación.

**Pasado - [Nombre Carta]:**
Esta carta indica que en tu pasado ha habido una 
conexión profunda...

**Presente - [Nombre Carta]:**
En tu presente, [análisis personalizado]...

**Futuro - [Nombre Carta]:**
El futuro promete [interpretación]...

**CONSEJOS PARA AFRONTAR:**
1. [Consejo 1]
2. [Consejo 2]
3. [Consejo 3]
```

---

## Preguntas Frecuentes

### ¿Necesito internet?
No, todo es local. Pero Ollama se descarga de internet la primera vez.

### ¿Se cuelga mucho?
La primera vez tarda más. Luego es más rápido.

### ¿Puedo hacer varias lecturas?
Sí, sin problema. Solo mantén `ollama serve` abierto.

### ¿Los datos se guardan?
No. Todo se procesa y desaparece.

### ¿Puedo cambiar el modelo de IA?
Sí, pero recomendamos llama3 por su precisión.

---

## Contacto/Soporte

Si hay problemas:
1. Abre las DevTools (F12)
2. Ve a la pestaña Console
3. Revisa si hay errores
4. Consulta `OLLAMA_SETUP.md`

---

## ¡A DISFRUTAR!

¡Tu Tarotista IA está listo para usar! 🔮✨

---

**Más fácil imposible. ¡Vamos!**
