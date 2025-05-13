# Importamos Flask, CORS y otros módulos necesarios
from flask import Flask
from flask_cors import CORS
from routes.api import api_bp
from config import config
import logging

# Función para crear y configurar la app de Flask
def create_app():
    app = Flask(__name__)
    app.config.from_object(config)  # cargamos la config desde el archivo config

    # Habilitamos CORS para permitir llamadas desde el frontend (por ejemplo, localhost:3000)
    CORS(app, resources={
        r"/api/*": {
            "origins": ["http://localhost:3000", "http://127.0.0.1:3000"],
            "methods": ["GET", "POST", "PUT", "DELETE"],
            "allow_headers": ["Content-Type", "Authorization"]
        }
    })

    # Configuramos el logging dependiendo si estamos en modo debug
    logging.basicConfig(
        level=logging.DEBUG if app.config['DEBUG'] else logging.INFO,
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    )

    # Registramos las rutas definidas en el blueprint api_bp
    app.register_blueprint(api_bp, url_prefix='/api')

    # Ruta simple para comprobar que la API está activa
    @app.route('/')
    def health_check():
        return {'status': 'healthy', 'message': '¡API de pagos Roda!'}

    return app

# Ejecutamos la app si este archivo es el principal
if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', port=5000, debug=app.config['DEBUG'])
else:
    # Si se importa desde otro archivo, igual creamos la app
    app = create_app()
