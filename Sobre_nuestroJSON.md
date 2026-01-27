<img src="https://github.com/GastonArielPerrone/Tu-tarot/blob/main/static/images/content/sobre_nuestroJSON.png" width="100%" height="300px"/>

# 📝 Descripción del JSON

Nuestro JSON se basa en los datos de todas las cartas existentes del Tarot generadas por la IA (ChatGPT) incluyendo imágenes como contenido de cada una de ellas. Esta API es de Open Source para que cada desarrollador pueda utilizarla en sus proyectos.
Para llamarla, el deasarrollador deberá colocar la siguiente sintaxis:

En JavaScript
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

En Python

1: Abrir una terminal dentro del proyecto (Bash recomendado) y copiar el siguiente comando para instalar "request".
```Bash
pip install request
```
2: 
```Python
import requests

url = 'https://github.com/GastonArielPerrone/Tu-tarot/blob/main/API/tarot_deck.json'
# Realizar la solicitud GET
response = requests.get(url)

# Verificar si la solicitud fue exitosa
if response.status_code == 200:
    data = response.json()
    print(data)
    #Acción a realizar.
else:
    print('Error:', response.status_code)
```

Ruta de la API: https://github.com/GastonArielPerrone/Tu-tarot/blob/main/API/tarot_deck.json

# 👷 Estructura del JSON

```txt
{
 id: "string",
 name: "string",
 arcana: "string", 
 suit: "null", 
 number: "integer",
 keywords: "array",
 description: "string",
 image_path: "string"
}
```
