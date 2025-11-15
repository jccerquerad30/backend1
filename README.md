# SPOA Virtual - Backend

Backend API para la plataforma SPOA Virtual construido con Express.js y MongoDB.

## Requisitos previos

- Node.js v14+
- MongoDB v4.4+
- npm o yarn

## Instalación

1. Clonar el repositorio:
```bash
git clone <repo-url>
cd backend
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
```bash
cp .env.example .env
```

Editar `.env` y configurar:
```
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/spoa
NODE_ENV=development
```

4. Llenar la base de datos con datos de prueba:
```bash
npm run seed
```

## Uso

### Desarrollo
```bash
npm start
```

El servidor estará disponible en `http://localhost:3000`

### Verificar que el servidor está corriendo
```bash
curl http://localhost:3000/api/health
```

## API Endpoints

### Autenticación
- **POST** `/api/auth/register` - Registrar nuevo usuario
- **POST** `/api/auth/login` - Iniciar sesión
- **GET** `/api/auth/me` - Obtener datos del usuario actual

### Salas
- **GET** `/api/salas` - Listar todas las salas
- **POST** `/api/salas` - Crear nueva sala

### Avances
- **GET** `/api/avances/:salaId` - Listar avances de una sala
- **POST** `/api/avances` - Registrar nuevo avance

## Credenciales de prueba

Una vez ejecutado el seed, puedes usar:

| Usuario | Contraseña | Rol |
|---------|-----------|-----|
| juzgado1 | 123456 | juzgado |
| demandante1 | 123456 | demandante |
| demandado1 | 123456 | demandado |

## Estructura del proyecto

```
backend/
├── models/          # Esquemas de MongoDB
│   ├── Usuario.js
│   ├── Sala.js
│   └── Avance.js
├── routes/          # Rutas API
│   ├── auth.js
│   ├── salas.js
│   └── avances.js
├── db.js           # Conexión a MongoDB
├── server.js       # Servidor principal
├── seed.js         # Script para llenar BD
├── package.json    # Dependencias
├── .env            # Variables de entorno
└── .gitignore      # Archivos a ignorar
```

## Despliegue

### En Heroku
```bash
heroku create <app-name>
heroku config:set MONGODB_URI=<your-mongodb-uri>
git push heroku main
```

### En AWS, Azure, o servidor propio
1. Instalar Node.js en el servidor
2. Instalar MongoDB o usar MongoDB Atlas
3. Clonar el repositorio
4. Configurar variables de entorno
5. Ejecutar `npm install && npm start`

## Licencia

ISC
