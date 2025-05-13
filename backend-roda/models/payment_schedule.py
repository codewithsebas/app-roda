from sqlalchemy import Column, Integer, String, Date, Numeric, ForeignKey
from utils.database import Base  # Base es la clase base de SQLAlchemy para los modelos

# Definimos la clase que representa la tabla de cronogramas de pago
class PaymentSchedule(Base):
    __tablename__ = 'payment_schedule'  # Nombre de la tabla en la base de datos

    # Columnas principales
    id = Column(Integer, primary_key=True, index=True)  # ID único para cada fila
    cliente_id = Column(Integer, ForeignKey('customer.cliente_id'))  # Relación con la tabla customer
    credito_id = Column(Integer, index=True)  # ID del crédito, también con índice para búsquedas rápidas

    # Información del pago pactado
    valor_cuota_pactada = Column(Numeric(10, 2))  # Valor acordado de la cuota
    installment_due = Column(Date)  # Fecha en la que se debe pagar la cuota

    # Detalles del pago (algunos pueden ser nulos si no se ha pagado aún)
    payment_number = Column(Integer, nullable=True)  # Número de cuota
    principal_amount = Column(Numeric(10, 2), nullable=True)  # Cuánto va al capital
    interest_amount = Column(Numeric(10, 2), nullable=True)  # Cuánto es de interés
    total_payment = Column(Numeric(10, 2), nullable=True)  # Total pagado
    balance = Column(Numeric(10, 2), nullable=True)  # Saldo restante del crédito
    status = Column(String(20), nullable=True)  # Estado del pago (ej. 'Pagado', 'Pendiente')
    paid_date = Column(Date, nullable=True)  # Fecha en la que realmente se pagó
    paid_amount = Column(Numeric(10, 2), nullable=True)  # Monto que se pagó

    # Método para convertir los datos a diccionario
    def to_dict(self):
        return {
            "id": self.id,
            "cliente_id": self.cliente_id,
            "credito_id": self.credito_id,
            "valor_cuota_pactada": float(self.valor_cuota_pactada) if self.valor_cuota_pactada else None,
            "installment_due": self.installment_due.isoformat() if self.installment_due else None,
            "payment_number": self.payment_number,
            "principal_amount": float(self.principal_amount) if self.principal_amount else None,
            "interest_amount": float(self.interest_amount) if self.interest_amount else None,
            "total_payment": float(self.total_payment) if self.total_payment else None,
            "balance": float(self.balance) if self.balance else None,
            "status": self.status,
            "paid_date": self.paid_date.isoformat() if self.paid_date else None,
            "paid_amount": float(self.paid_amount) if self.paid_amount else None
        }
