export type Credit = {
  cliente_id: number;
  credito_id: number | null;
  deuda: number | null;
  dt: {
    "Número documento": string;
    celular_corregido: string;
  };
  identity: string;
  installment_due: string;
  inversion: number | null;
  nombre_completo: string;
  nombre_estado: string;
  nombre_tipo_credito: string;
  valor_cuota_pactada: number | null;
};
