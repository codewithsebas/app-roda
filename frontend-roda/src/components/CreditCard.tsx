import { FormatDate } from '@/lib/formatDate';
import { Credit } from '@/types/credit';
import Image from 'next/image';
import React from 'react';

export default function CreditCard({
    nombre_completo,
    nombre_tipo_credito,
    nombre_estado,
    dt,
    inversion,
    deuda,
    valor_cuota_pactada,
    installment_due
}: Credit) {
    return (
        <div className="bg-[#d2c4f7] rounded-xl shadow-lg p-4 hover:shadow-xl transition relative overflow-hidden group hover:scale-105 duration-200">
            <div className="absolute inset-0 bg-[#d2c4f7] opacity-90 z-10"></div>
            <Image
                src="https://framerusercontent.com/images/2QlHvVmGVKScRnnp8QHfUf6A.jpeg"
                alt='Imagen de fondo'
                width={1000}
                height={1000}
                className='absolute w-full h-full object-cover top-0 left-0 opacity-15 group-hover:opacity-30 transition duration-500'
            />

            <div className='relative z-20'>
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900">{nombre_completo}</h2>
                        <div className="flex items-center gap-2 mt-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${nombre_estado === 'Activo' ? 'bg-green-100 text-green-800' :
                                nombre_estado === 'En mora' ? 'bg-red-100 text-red-800' :
                                    'bg-[#d8eb4e] text-black'
                                }`}>
                                {nombre_estado}
                            </span>
                            <span className="text-gray-600">{nombre_tipo_credito}</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-5">
                    <div className="bg-[#d8eb4e] p-3 rounded-lg backdrop-blur-sm">
                        <p className="text-sm text-gray-600">Inversión</p>
                        <p className="text-lg font-bold text-gray-900">${inversion?.toLocaleString()}</p>
                    </div>
                    <div className="bg-white/40 p-3 rounded-lg backdrop-blur-sm">
                        <p className="text-sm text-gray-600">Deuda actual</p>
                        <p className="text-lg font-bold text-gray-900">${deuda?.toLocaleString()}</p>
                    </div>
                </div>

                <div className="space-y-3">
                    <div className="flex justify-between border-b border-white/30 pb-2">
                        <span className="text-gray-700">Documento</span>
                        <span className="font-medium">{dt["Número documento"]}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/30 pb-2">
                        <span className="text-gray-700">Celular</span>
                        <span className="font-medium">{dt.celular_corregido}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/30 pb-2">
                        <span className="text-gray-700">Valor cuota</span>
                        <span className="font-medium">${valor_cuota_pactada?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-700">Próximo pago</span>
                        <span className="font-medium text-[#2c3e50]">
                            {FormatDate(installment_due)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}