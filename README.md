
# Tribu de Mamás - Frontend Development

Este proyecto tiene como objetivo el desarrollo del frontend de la plataforma web Tribu de Mamás, una comunidad que apoya a madres en la etapa de maternidad. La plataforma busca centralizar y automatizar procesos como suscripciones, administración de eventos, beneficios y cupones digitales, ofreciendo una experiencia de usuario más eficiente, segura y personalizada.

El frontend de la aplicación está desarrollado en React, un framework moderno y eficiente para construir interfaces de usuario. Utilizamos Docker para contenerización, lo que facilita la portabilidad y despliegue del proyecto en diferentes entornos.
## Características Principales

* **Sistema de Suscripción:** Integración con un sistema de pagos en línea, automatización de notificaciones y gestión de membresías.
* **Cupones Digitales y Generación de QR:** Administración de cupones y creación de códigos QR para descuentos en establecimientos asociados.
* **Calendario de Eventos:** Inscripción y compra de entradas para eventos organizados por la comunidad, con recordatorios y notificaciones.
* **Perfil de Usuario:** Cada mamá tendrá un perfil personalizado donde gestionará sus datos personales, estado de suscripción, etc.
* **Dashboard de Métricas:** Visualización en tiempo real de estadísticas clave para los administradores de la comunidad.
* **Foro:** Espacio de intercambio de publicaciones y experiencias entre las usuarias, con la posibilidad de sincronización con Instagram.

## Requisitos Previos

Para ejecutar este proyecto localmente necesitas tener instalados los siguientes programas:

* **Docker:** La aplicación se ejecutará dentro de un contenedor Docker.
* **Git:** Para clonar el repositorio y gestionar versiones.

Además, tener configurado un entorno compatible con Docker y acceso a la terminal.
## Instalación y Ejecución

Para ejecutar el proyecto debes seguir estos pasos:

- **1. Clonar del Repositorio**
Primero, clona el repositorio desde GitHub. Ejecuta el siguiente comando en tu terminal:

```bash
git clone https://github.com/AsyliusGG/tribu-front.git

```
- **2. Creación  y levantamiento de la Imagen.**
Para ejecutar la aplicación por primera vez con Docker Compose, debe usar el siguiente comando:

```bash
docker-compose up --build
```

- **Detener el contenedor**
Cuando la persona termine de trabajar y quiera detener el contenedor, puede presionar Ctrl + C en la terminal donde está corriendo o ejecutar el siguiente comando en otra terminal dentro de la carpeta del proyecto:

```bash
docker-compose down
```

- **Acceder a la aplicación**
Una vez ya creada la imagen (después de haberla cerrado), para inicializar el proyecto, debe usar el siguiente comando:

```bash
docker-compose up
```