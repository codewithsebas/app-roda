# Importamos las librerías y módulos necesarios
from flask import Blueprint, jsonify, request
from utils.database import get_db, execute_query
from models.payment_schedule import PaymentSchedule
from sqlalchemy.orm import Session
from datetime import datetime
import pandas as pd

# Creamos un blueprint para la API
api_bp = Blueprint('api', __name__)

# Ruta para obtener los créditos de los clientes
@api_bp.route('/credits', methods=['GET'])
def get_customer():
    try:
        # Consulta SQL para traer información de clientes, sus créditos y otros datos relacionados
        query = """
        SELECT 
            customer.cliente_id,
            customer.nombre_completo,
            customer.dt,
            customer.identity,
            payment_schedule.credito_id,
            payment_schedule.valor_cuota_pactada,
            payment_schedule.installment_due,
            loan.tipo_credito,
            loan.deuda_inicial AS deuda,
            loan.inversion AS inversion,
            tipo_credito.nombre AS nombre_tipo_credito,
            estado.nombre AS nombre_estado
        FROM customer
        LEFT JOIN payment_schedule ON customer.cliente_id = payment_schedule.cliente_id
        LEFT JOIN loan ON customer.cliente_id = loan.cliente_id
        LEFT JOIN tipo_credito ON loan.tipo_credito = tipo_credito.tipo_credito_id
        LEFT JOIN estado ON loan.estado = estado.estado_id
        """

        # Ejecutamos la consulta y lo convertimos en un DataFrame
        df = execute_query(query)

        # Función para limpiar valores NaN (los pasamos a None)
        def clean_nan(value):
            import math
            return None if isinstance(value, float) and math.isnan(value) else value

        # Convertimos los datos del DataFrame a una lista de diccionarios
        lista_clientes = [
            {k: clean_nan(v) for k, v in record.items()}
            for record in df.to_dict(orient='records')
        ]

        # Devolvemos los datos como respuesta JSON
        return jsonify({
            "success": True,
            "data": lista_clientes
        })

    except Exception as e:
        # Si hay un error, devolvemos un mensaje de error
        return jsonify({"success": False, "error": str(e)}), 500
