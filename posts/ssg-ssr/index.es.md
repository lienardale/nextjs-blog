---
title: 'When to Use Static Generation v.s. Server-side Rendering'
date: '2020-01-02'
---

Recomendamos usar **Generación Estática** (con y sin datos) siempre que sea posible porque su página puede ser construida una vez y servida por CDN, lo que hace que sea mucho más rápido que tener un servidor renderizando la página en cada petición.

Puede utilizar la Generación Estática para muchos tipos de páginas, incluyendo

- Páginas de marketing
- Entradas de blog
- Listados de productos de comercio electrónico
- Ayuda y documentación

Debería preguntarse: "¿Puedo pre-renderizar esta página **antes** de la solicitud de un usuario?" Si la respuesta es afirmativa, entonces debería elegir la Generación Estática.

Por otro lado, la Generación Estática no es una buena idea si no puede pre-renderizar una página antes de que el usuario la solicite. Tal vez su página muestra datos actualizados con frecuencia, y el contenido de la página cambia en cada solicitud.

En ese caso, puede utilizar el **Renderizado del lado del servidor**. Será más lento, pero la página pre-renderizada estará siempre actualizada. O puede omitir el pre-renderizado y utilizar JavaScript del lado del cliente para rellenar los datos.