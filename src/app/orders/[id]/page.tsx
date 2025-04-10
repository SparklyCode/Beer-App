'use client';

import { useParams } from 'next/navigation';
import { useGetOrderById } from '@/hooks/useGetOrderById';
import BeerAnimation from '@/components/BeerAnimation';
import { FileText, CheckCircle, Clock, Users } from 'lucide-react';

const OrderDetailPage = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetOrderById(id as string);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center mt-10">
        <BeerAnimation type="beer" text="Cargando tu orden..." />
      </div>
    );
  }
  if (!data) return <p className="p-6">Orden no encontrada.</p>;

  return (
    <main className="min-h-screen p-6 space-y-6 bg-white">
      <h1 className="text-2xl font-bold flex items-center gap-2 truncate">
        <FileText className="w-6 h-6 text-brand-pink" />
        Orden {data.id}
      </h1>

      <div>
        <p className="text-sm text-gray-500">Fecha: {data.created}</p>
        <p className="text-sm text-gray-500 flex">
          {'Estado: '}
          {data.paid ? (
            <span className="flex items-center gap-1 text-green-600 ml-2">
              <CheckCircle size={16} />
              Pagada
            </span>
          ) : (
            <span className="flex items-center gap-1 text-yellow-500 ml-2">
              <Clock size={16} />
              Pendiente
            </span>
          )}
        </p>
      </div>

      <section className="border-t pt-4">
        <h2 className="text-lg font-semibold mb-2">Resumen general</h2>
        <ul className="space-y-1 text-sm">
          {data.items.map((item: any) => (
            <li key={item.name} className="flex justify-between">
              <span>
                {item.quantity} × {item.name}
              </span>
              <span className="font-medium">${item.total}</span>
            </li>
          ))}
        </ul>
        <p className="mt-2 font-bold text-right">Subtotal: ${data.subtotal}</p>
      </section>

      {data.rounds.length > 0 && (
        <section className="border-t pt-4">
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <Users className="w-5 h-5 text-brand-cyclamen" />
            Rondas por persona
          </h2>
          <ul className="space-y-4">
            {data.rounds.map((round: any, index: number) => (
              <li key={index} className="border rounded p-3 bg-gray-50">
                <h4 className="font-semibold mb-2">{round.name}</h4>
                <ul className="space-y-1 text-sm">
                  {round.items.map((item: any) => (
                    <li key={item.name} className="flex justify-between">
                      <span>{`${item.quantity} × ${item.name}`}</span>
                      <span className="font-medium">${item.total}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
};

export default OrderDetailPage;
