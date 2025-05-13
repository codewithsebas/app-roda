'use client'

import CreditCard from './CreditCard';
import CreditFilter from './CreditFilter';
import { useCredits } from '../hooks/useCredits';
import Loading from './Loading';
import Error from './Error';

export default function CreditList() {
    const {
        credits,
        loading,
        error,
        documentSearch,
        setDocumentSearch,
        dateFilter,
        setDateFilter,
    } = useCredits();

    if (loading) return <Loading />;
    if (error) return <Error message={error} />;

    return (
        <div className='px-3 sm:px-8 m-auto  sm:min-w-5xl sm:max-w-7xl min-h-screen'>

            {credits.length === 0 ? (
                <p className="text-gray-500">No se encontraron resultados.</p>
            ) : (
                <div className='flex flex-col gap-2'>
                    <div className='flex items-center justify-between pb-2 border-b mb-2 border-gray-400'>
                        <p className=" text-xl text-gray-600 font-semibold w-full">Creditos - {credits.length}</p>
                        <CreditFilter
                            documentSearch={documentSearch}
                            setDocumentSearch={setDocumentSearch}
                            dateFilter={dateFilter}
                            setDateFilter={setDateFilter}
                        />
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
