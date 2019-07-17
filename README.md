Tecnologias utilizadas:

Node.js, ReactJS, Redux, Redis, ES6, Docker, Traefik

Servicio utilizado:

https://darksky.net/dev

Requerimientos:

Se busca un servicio que muestre la temperatura y estación de diferentes
ciudades del mundo, para esto, queremos un mapa del mundo que, al hacer click
sobre un país, muestre en un modal, la temperatura y estación de ese país.

Las consultas deberán ser hechas a un API expuesta que por detrás, consulte el
servicio de Darksky para el Clima,

una vez consultado el dato, se debe guardar un Redis para que, una consulta
posterior, saque la data cacheable de Redis.

Las request al API de Darksky deben contener una taza de error del 10%,
aleatorio, este error tiene que ser capturado y reintentado hasta que funcione,
es totalmente transparente para el usuario.

Cualquier otro error, debe verse reflejado con un mensaje de error genérico para
el usuario.

El navegador debe mostrar el Mapa a través de Google Maps, una vista global con
el zoom bloqueado, cada click debe gatillar la selección del País/Capital y
mostrar en un modal la info necesaria de la capital del país seleccionado (para
países grandes, no importa que al seleccionar otra ciudad se seleccione la
capital, buscamos solo seleccionar país con su capital).

La aplicación debe estar dividida en 2 microservicios, ambos deben exponerse y
usar Traefik para dirigir los requests tanto al backend del API como al
frontend, por ejemplo:

www.app.com/API va a 127.0.0.1:8000 interamente www.app.com va a 127.0.0.1:3000
internamente

Todo debe estar dockerizado al momento de ser subido a la nube.

La aplicación deberá ser subida a AWS o Heroku (dockhero) a tu elección y a
el/los repositorio/s de Git. Cualquier extra relacionado con la prueba es
aceptable, pero enfócate más en demostrar tus conocimientos.
