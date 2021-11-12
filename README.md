# Gestionate
[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://twitch.tv/elFonTii)
## Instructivo para inicializar la aplicación

###### Abrir una instancia de powershell
###### Navegar hasta el directorio del proyecto PATH://Desktop/gestion-complejo-deportivo-main/gestion-complejo-deportivo/
###### También es posible hacerlo mediante Visual Studio Code.
###### Para desplegar la aplicación en modo de desarrollo ejecutar ```npm run dev```.
###### Iniciar una instancia en un navegador e introducir ```localhost``` o la ip privada de la máquina.
###### **`Es importante que no exista otra aplicación escuchando en el puerto 80`**, ya que eso generaría un conflicto con nuestra aplicación.
###### Donde el proyecto se encuentra instalado, se dejó el servicio de apache2 escuchando en el puerto 90, por lo que si se quiere ingresar al dom de phpmyadmin se debe introducir ```localhost:90/phpmyadmin```
###### La aplicación está lista para su utilización.

## Credenciales de acceso - Testing
#### Usuario
	username: test
	password: test

#### Administrador
	username: admin
	password: admin
#### Credenciales de pago
	reference: 17767666569
	(Los datos del pago pueden no ser iguales a los de la cancha a pagar, ya que el pago fue hecho con una cancha en especifico)


### ACTUALIZACIÓN ENTRANTE
##### El comando ```npm run deploy``` será actualizado a ```npm start``` en actualizaciones posteriores.


## Información
### Resumen
¡Gestionate! es un sistema de gestión de complejos deportivos diseñada con el fin de facilitar el uso y control de los diferentes servicios que ofrecen los complejos deportivos, estos consisten en alquileres de canchas para diferentes deportes y la suscripciones a diferentes servicios, tales como un gimnasio, clases de natación o cualquier otro servicio que el complejo brinde a sus usuarios.
En base a entrevistas a las diferentes empresas de la zona conocemos que actualmente los complejos deportivos de nuestra ciudad cuentan con una solución rudimentaria, ya que los alquileres consisten en realizar una llamada o enviar un mensaje al dueño del complejo para acordar fecha y hora de la reserva. Las suscripciones de los usuarios a los servicios ofrecidos se acuerdan personalmente, todos los datos son gestionados por los empleados a papel y no se cuenta con una solución tecnológica para lograr realizar todas las tareas eficientemente y no se brinda al usuario la mejor experiencia.
¡Gestionate! Es una alternativa tecnológica a estas prácticas rudimentarias simplificando las tareas de gestión e interacción con el usuario. 
El implementar un sistema de gestión utilizando tecnologías web puede suponer un gran cambio en los métodos empleados para gestionar los servicios ofrecidos, ya que le permitiría a
los dueños de los complejos realizar tareas administrativas de manera más eficiente, y cálculos de manera automática.
Los usuarios de nuestros clientes también se verían beneficiados al optar por nuestra solución, ya que al realizar reservas y pagar sus suscripciones, no dependerían del dueño del complejo para realizar dichas acciones.
Se propone entonces, brindar una solución tecnológica con las siguientes características: 
Por un lado, una aplicación web de manejo y gestión para complejos deportivos, desarrollada empleando el framework Express de desarrollo web para el lenguaje JavaScript. Al tratarse de un proyecto de desarrollo web, utilizaremos HTML , así como también la inclusión de JavaScript, CSS y Bootstrap con el fin de crear una solución adaptable a distintas resoluciones de pantalla y lo más amigable posible frente a la vista de cualquier usuario.

### Análisis de las tecnologías implementadas
##### Back-end
	Node.js
	Express.js
##### Administrador de vistas
	Handlebars
##### Front-end
	HTML5
	CSS3
	Bootstrap
	jQuery
	Fontawesome
#### Pagos
	Mercadopago
	
