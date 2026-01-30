# KDS Backend – NestJS

## 1. Descripción de la solución

Este proyecto implementa el backend de un **Kitchen Display System (KDS)**, responsable de gestionar pedidos, estados de las órdenes y su interacción con sistemas externos simulados.

El objetivo principal es exponer una API clara y mantenible que permita:
- Recibir pedidos desde sistemas externos (simulados).
- Consultar órdenes.
- Actualizar el estado de una orden siguiendo reglas de negocio.
- Mantener una arquitectura desacoplada y escalable.

El backend está desarrollado con **NestJS** y sigue una versión ligera de **Clean Architecture**, priorizando la separación de responsabilidades, la testabilidad y la claridad del dominio.

---

## 2. Instrucciones para ejecutar el proyecto

### Requisitos previos
- Node.js (v18 o superior)
- npm

### Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Crear el archivo .env en la raíz del proyecto:
```bash
PORT = 3001
API_KEY = 3uibNAk5CvDHuoL
```
Sin este archivo el backend no funcionará correctamente, ya que se utiliza para:
- Definir el puerto de ejecución.
- Proteger el acceso a la API mediante una API Key.

3. Ejecutar el proyecto:
```bash
npm run start
```

el servidor quedará disponible en:
```bash
http://localhost:3001
```

## 3. Decisiones técnicas relevantes

### Arquitectura (Clean Architecture – versión ligera)

El backend está organizado por módulos funcionales (orders, riders), y dentro de cada módulo se separan claramente las capas:

- Domain
  - Entidades
  - Interfaces de repositorios
- Application
  - Casos de uso (servicios de negocio)
- Infrastructure
  - Controladores HTTP
  - Implementaciones concretas (repositorios en memoria, mocks externos)

Esta estructura permite:

- Aislar el negocio de frameworks y detalles técnicos.
- Facilitar cambios futuros (por ejemplo, reemplazar la base de datos en memoria).
- Evitar acoplamientos innecesarios entre módulos.

### Simulación de sistemas externos (EventBus / Message Queue)

En un entorno real, los pedidos llegarían al sistema mediante webhooks o colas de mensajes (RabbitMQ, Kafka, etc.).
Dado que esto no forma parte del alcance del desafío, se implementó una simulación mediante un EventBus en memoria, que emite eventos de nuevos pedidos, permite desacoplar la recepción de pedidos del resto del sistema y mantiene el flujo de datos realista sin depender de infraestructura externa.

Esta decisión permite demostrar cómo se integraría el sistema con una arquitectura orientada a eventos sin añadir complejidad innecesaria.

### Seguridad básica del API

Se implementó una **API Key** simple como mecanismo básico de protección:
- Todas las peticiones deben incluir el header x-api-key.
- La clave se gestiona mediante variables de entorno.
- Se manejan correctamente las peticiones OPTIONS (CORS preflight).

No se implementó autenticación completa (JWT, OAuth) pero la solución es fácilmente extensible.

## 4. Posibles mejoras

- Sustituir los repositorios en memoria por una base de datos real.
- Implementar un sistema de mensajería real (RabbitMQ / Kafka).
- Añadir autenticación y autorización con roles.
- Añadir tests unitarios para casos de uso.