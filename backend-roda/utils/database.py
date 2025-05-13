# Importamos los módulos necesarios para la base de datos y configuración
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from contextlib import contextmanager
from config import config
import pandas as pd

# Creamos la conexión al motor de base de datos con configuración personalizada
engine = create_engine(
    config.SQLALCHEMY_DATABASE_URI,
    connect_args={
        'options': f'-csearch_path={config.DB_SCHEMA}',  # definimos el schema por defecto
        'connect_timeout': 10  # tiempo de espera para conectarse
    },
    pool_pre_ping=True,  # verifica que la conexión esté viva
    echo=True  # muestra los logs de SQL en consola
)

# Configuramos la sesión para manejar transacciones con SQLAlchemy
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base para los modelos ORM
Base = declarative_base()

# Context manager para obtener y cerrar la sesión de la DB
@contextmanager
def get_db():
    db = SessionLocal()
    try:
        yield db  # entregamos la sesión
    finally:
        db.close()  # cerramos la sesión al final

# Función para ejecutar una consulta SQL y devolverla como un DataFrame
def execute_query(query: str, params: dict = None):
    with engine.connect() as connection:
        result = connection.execute(text(query), params or {})
        rows = result.fetchall()
        columns = result.keys()
        df = pd.DataFrame(rows, columns=columns)  # convertimos los resultados en un DataFrame
        return df
