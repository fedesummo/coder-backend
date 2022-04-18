# Coderhouse

## Desafío "API RESTful".

Se detallan a continuación los endpoints de la API, junto con una breve descripción del funcionamiento de cada uno de ellos.

### Endpoints

GET `/api/products`  
Devuelve un array con todos los productos registrados.

POST `/api/products`  
Permite registrar un nuevo producto, devolviendo el ID asignado al mismo.  
El cuerpo de la petición debe contener un objeto con los pares clave/valor que definen al producto.  
*Ej: { title: "...", thumbnail, "...", price: "..." }*

PUT `/api/products/:id`  
Permite modificar los datos de un producto.  
El cuerpo de la petición debe contener un objeto con los nuevos pares clave/valor que definirán al producto.  
*Ej: { title: "...", thumbnail, "...", price: "..." }*

DELETE `/api/products/:id`  
Permite eliminar un producto.