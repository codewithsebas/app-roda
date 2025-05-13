'use client'

import { useEffect, useState } from 'react';
import { fetchCredits } from '../services/creditService';
import { Credit } from '@/types/credit';

export function useCredits(reloadKey: number) {
  const [credits, setCredits] = useState<Credit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [documentSearch, setDocumentSearch] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchCredits();
        setCredits(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [reloadKey]); // <-- ahora sí se recarga cuando cambia

  const filteredCredits = credits.filter((credit) => {
    const matchesDoc = credit.dt && credit.dt["Número documento"]
      ? credit.dt["Número documento"].toLowerCase().includes(documentSearch.toLowerCase())
      : false;

    const matchesDate = dateFilter
      ? new Date(credit.installment_due).toISOString().split('T')[0] === dateFilter
      : true;

    return matchesDoc && matchesDate;
  });

  return {
    credits: filteredCredits,
    loading,
    error,
    documentSearch,
    setDocumentSearch,
    dateFilter,
    setDateFilter,
  };
}
