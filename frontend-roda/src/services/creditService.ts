import { Credit } from "@/types/credit";

const API_URL = 'credits';

export async function fetchCredits(): Promise<Credit[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${API_URL}`);
  if (!res.ok) throw new Error('Error al obtener créditos');
  const data = await res.json();
  
  return data.data as Credit[];
}
