# Prueba Técnica FullStack Junior – Roda

**Roda App** es una aplicación para gestionar el cronograma de pagos. Permite visualizar los pagos de los clientes y su información con una interfaz moderna que incluye modo oscuro automático según el sistema del usuario.

---

## 🧩 Tecnologías Usadas

- **Frontend:** Next.js
- **Backend:** Flask + PostgreSQL

---

## ✅ Requisitos Previos

- **Python** >= 3.10  
- **Node.js** >= 16  
- **PostgreSQL**  
- **pipenv** o **venv**

---

## 🚀 Instalación

### 1. Clonar el Repositorio

```bash
git clone https://github.com/codewithsebas/app-roda.git
cd app-roda
```

## 2. Configurar el Backend (Flask)

- **🔧 Crear entorno virtual e instalar dependencias:**

---

```bash
cd backend-roda
python -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate
pip install -r requirements.txt
```

- **🛠️ Configurar archivo config.py en /backend con las credenciales de la base de datos:**

```bash
DB_TYPE = 'postgresql'
DB_HOST = os.getenv('DB_HOST', '****')
DB_PORT = os.getenv('DB_PORT', '****')
DB_NAME = os.getenv('DB_NAME', '****')
DB_USER = os.getenv('DB_USER', '****')
DB_PASSWORD = os.getenv('DB_PASSWORD', '****')
DB_SCHEMA = os.getenv('DB_SCHEMA', '****')
```
Ingresa en las comillas simples las credenciales de cada campo, para configurar la base de datos

--- 

## ▶️ Ejecutar el servidor Flask:

```bash
py app.py
```

--- 

## 3. Configurar el Frontend (Next.js)

```bash
cd frontend-roda
npm install
```

- **Crear archivo .env.local en /frontend-roda con:**
```bash
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

- **npm run dev**
```bash             
npm run dev
```
El frontend estará disponible en: http://localhost:3000

--- 

## 📦 Recursos Utilizados

- Frontend: Next.js, Tailwind CSS
- Backend: Flask, SQLAlchemy, Python-dotenv
- Base de Datos: PostgreSQL
- Despliegue: Vercel (frontend), pendiente para backend