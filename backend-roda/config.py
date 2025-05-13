import os
from dotenv import load_dotenv
from urllib.parse import quote_plus

load_dotenv()

class Config:
    # Configuración de la base de datos
    DB_TYPE = 'postgresql'
    DB_HOST = os.getenv('DB_HOST', '35.196.20.95')
    DB_PORT = os.getenv('DB_PORT', '5432')
    DB_NAME = os.getenv('DB_NAME', 'roda-db')
    DB_USER = os.getenv('DB_USER', 'developer')
    DB_PASSWORD = os.getenv('DB_PASSWORD', '5Om"Q3D0U:DXH[q@')
    DB_SCHEMA = os.getenv('DB_SCHEMA', 'roda-case')

    # Configuración de Flask
    SECRET_KEY = os.getenv('SECRET_KEY', 'supersecretkey')
    DEBUG = os.getenv('DEBUG', 'True') == 'True'

    @property
    def SQLALCHEMY_DATABASE_URI(self):
        password_encoded = quote_plus(self.DB_PASSWORD)
        return f"{self.DB_TYPE}://{self.DB_USER}:{password_encoded}@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"

config = Config()
