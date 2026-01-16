<img src='https://github.com/GastonArielPerrone/Tu-tarot/blob/main/static/images/content/sobre_TuTarot.png' width='100%' height='300px'/>

# Descripción
"TuTarot" es una aplicación web interactiva diseñada para ofrecer lecturas de tarot personalizadas. Utilizando una interfaz intuitiva, los usuarios pueden seleccionar diferentes tipos de tiradas y áreas de consulta (amor, salud y bienestar) para obtener orientación y reflexiones. La aplicación integra un modelo de lenguaje local (Ollama) para generar interpretaciones únicas y detalladas de las cartas seleccionadas, brindando una experiencia de tarot moderna y accesible.

# Requerimientos para su uso
Para poder utilizar la funcionalidad de interpretación automática de las cartas, es necesario tener instalado y en ejecución un servidor local de Ollama con un modelo de lenguaje disponible (por ejemplo, `llama2` o `gemma`).

# Adaptabilidad
- PC/Notebook
- Tablet
- Celular

# Objetivos generales
- Ofrecer una plataforma digital para realizar lecturas de tarot de forma sencilla e intuitiva.
- Proveer interpretaciones de las cartas generadas por inteligencia artificial para una experiencia más personalizada.
- Permitir a los usuarios explorar diferentes tipos de tiradas según sus áreas de interés.
- Crear una herramienta de autoconocimiento y reflexión a través del simbolismo del tarot.

# Funcionalidad
- **Selección de tipo de lectura:** El usuario puede elegir entre diferentes categorías como "Amor" y "Salud y Bienestar".
- **Diferentes tiradas:** Dentro de cada categoría, se ofrecen distintas tiradas como "Una carta", "Tres cartas" y la "Cruz Celta".
- **Selección de cartas:** Interfaz interactiva para que el usuario seleccione las cartas del mazo.
- **Interpretación con IA:** Una vez seleccionadas las cartas, la aplicación se comunica con un servicio local de Ollama para generar una interpretación detallada de la tirada.
- **Visualización de cartas:** La aplicación cuenta con una sección para visualizar todas las cartas del tarot con sus imágenes y descripciones.

# Herramientas utilizadas
- HTML5
- CSS3
- JavaScript
- <a href="https://github.com/GastonArielPerrone/Tu-tarot/blob/main/Sobre_nuestroJSON.md">JSON</a>
- Ollama (para el servicio de IA)
- Playwright (para testing)

# Guía para el usuario / consultante
1.  **Elige tu consulta:** Navega a la sección de "Lecturas" y selecciona el área de tu vida sobre la que deseas consultar (por ejemplo, "Amor"). Otra opción es desde "Inicio" debes mover el carrusel seleccionando por punto hasta encontrar un tema. Por ejemplo: "Tarot para el Amor". Ahí tenés que hacer clic en "Ir".
2.  **Selecciona una tirada:** Elige el tipo de tirada que prefieras (por ejemplo, "Tres cartas").
3.  **Completa el formulario:** Completa el formulario para que la IA Tarotista pueda leerte profundamente tu tirada.
4.  **Clic en el botón de "Barajar y colocar cartas sobre la mesa":** Una vez realizado el clic, el programa barajará y en un modal/recuadro
te colocará las cartas seleccionadas aleatoriamente.
1.  **Lectura de la IA:** Este paso puede tardar unos minutos. Solo debes esperar a que la IA Tarotista reflexione y te de la devolución de tu consulta.
