'use client'

import { useState } from 'react';
import CreditCard from './CreditCard';
import CreditFilter from './CreditFilter';
import { useCredits } from '../hooks/useCredits';
import Loading from './Loading';
import Error from './Error';

export default function CreditList() {
    const [reloadKey, setReloadKey] = useState(0);

    const {
        credits,
        loading,
        error,
        documentSearch,
        setDocumentSearch,
        dateFilter,
        setDateFilter,
    } = useCredits(reloadKey);

    const reload = () => {
        setReloadKey(prev => prev + 1);
    };

    const cleanFilters = () => {
        setDateFilter('');
        setDocumentSearch('');
    };

    if (loading) return <Loading />;
    if (error) {
        return (
            <div className='flex flex-col items-center justify-center min-h-screen text-center'>
                <Error message={error} />
                <button onClick={reload} className='mt-4 bg-[#d2c4f7] px-4 py-2 rounded-lg cursor-pointer duration-200 hover:bg-[#bdb0df]'>
                    Volver a intentar
                </button>
            </div>
        );
    }

    return (
        <div className='px-3 sm:px-8 m-auto sm:min-w-5xl sm:max-w-7xl min-h-screen'>
            <CreditFilter
                documentSearch={documentSearch}
                setDocumentSearch={setDocumentSearch}
                dateFilter={dateFilter}
                setDateFilter={setDateFilter}
            />
            {credits.length === 0 ? (
                <div className='flex flex-col gap-3 justify-center items-center mt-20'>
                    <p className="text-gray-500">No se encontraron resultados.</p>
                    <button onClick={cleanFilters} className='bg-[#d2c4f7] px-4 py-2 rounded-lg cursor-pointer duration-200 hover:bg-[#bdb0df]'>
                        Volver
                    </button>
                </div>
            ) : (
                <div className='flex flex-col gap-2 mt-4'>
                    <div className='flex items-center justify-between pb-2 border-b mb-2 border-gray-400'>
                        <p className="text-xl text-gray-600 font-semibold w-full">Creditos - {credits.length}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {credits.map((credit) => (
                            <CreditCard
                                key={`${credit.cliente_id}-${credit.credito_id}-${credit.installment_due}`}
                                {...credit}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
