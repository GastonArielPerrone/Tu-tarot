<img src="https://github.com/GastonArielPerrone/Tu-tarot/blob/main/static/images/content/sobre_nuestroJSON.png" width="100%" height="300px"/>

# Descripción del JSON

Nuestro JSON se basa en los datos de todas las cartas existentes del Tarot generadas por la IA (ChatGPT) incluyendo imágenes como contenido de cada una de ellas. Esta API es de Open Source para que cada desarrollador pueda utilizarla en sus proyectos.
Para llamarla, el deasarrollador deberá colocar la siguiente sintaxis en un archivo de JavaScript (.js):

```JavaScript
fetch("https://github.com/GastonArielPerrone/Tu-tarot/blob/main/API/tarot_deck.json")
.then(respone => response.json())
.then(data => console.log(data)
// Acción a realizar
)
.catch(function(error){
// Acción a realizar
});
```
Ruta de la API: https://github.com/GastonArielPerrone/Tu-tarot/blob/main/API/tarot_deck.json

# Estructura del JSON

| Campo | Tipo |
| :--- | :--- |
| id | String |
| name | String |
| arcana | String |
| suit | Null |
| number | Interger |
| keywords | Array |
| description | String |
| image_path | String |
