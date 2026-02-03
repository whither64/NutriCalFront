# NutriCal 🥗

Aplicación web de calculadora nutricional desarrollada con React, Express y PostgreSQL.

## Tecnologías

- **Frontend**: React + Vite (JavaScript)
- **Backend**: Node.js + Express
- **Base de Datos**: PostgreSQL
- **Containerización**: Docker + Docker Compose

## Estructura del Proyecto

```
NutriCal/
├── frontend/           # Aplicación React con Vite
│   ├── src/
│   ├── Dockerfile
│   └── package.json
├── backend/           # API REST con Express
│   ├── server.js
│   ├── init.sql
│   ├── Dockerfile
│   └── package.json
└── docker-compose.yml
```

## Requisitos Previos

- Docker Desktop instalado
- Docker Compose

## Instalación y Ejecución

### Con Docker Compose (Recomendado)

1. Navega al directorio del proyecto:
```bash
cd NutriCal
```

2. Inicia todos los servicios:
```bash
docker-compose up -d
```

3. La aplicación estará disponible en:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000
   - PostgreSQL: localhost:5432

4. Para detener los servicios:
```bash
docker-compose down
```

### Sin Docker (Desarrollo Local)

#### Backend:
```bash
cd backend
npm install
npm start
```

#### Frontend:
```bash
cd frontend
npm install
npm run dev
```

#### Base de Datos:
Asegúrate de tener PostgreSQL instalado y ejecuta el script `init.sql` para crear la base de datos y las tablas.

## API Endpoints

- `GET /health` - Estado de la API
- `GET /api/foods` - Obtener todos los alimentos
- `GET /api/foods/:id` - Obtener un alimento por ID
- `POST /api/foods` - Crear un nuevo alimento
- `PUT /api/foods/:id` - Actualizar un alimento
- `DELETE /api/foods/:id` - Eliminar un alimento

## Características

- ✅ CRUD completo de alimentos
- ✅ Cálculo de macronutrientes (calorías, proteínas, carbohidratos, grasas)
- ✅ Interfaz responsive y moderna
- ✅ Conexión a base de datos PostgreSQL
- ✅ Containerización con Docker
- ✅ Datos de ejemplo pre-cargados

## Variables de Entorno

Las variables de entorno están configuradas en el archivo `docker-compose.yml` y `.env` del backend:

- `DB_HOST`: Host de la base de datos
- `DB_PORT`: Puerto de PostgreSQL
- `DB_NAME`: Nombre de la base de datos
- `DB_USER`: Usuario de la base de datos
- `DB_PASSWORD`: Contraseña de la base de datos
