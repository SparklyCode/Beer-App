'use client';

import { useState } from 'react';
import { useGetOrders } from '@/hooks/useGetOrders';
import { useUpdateOrder } from '@/hooks/useUpdateOrder';
import Link from 'next/link';
import {
  ChevronDown,
  ChevronUp,
  User,
  CalendarDays,
  Eye,
  CheckCircle,
  DollarSign,
} from 'lucide-react';
import clsx from 'clsx';
import dayjs from 'dayjs';
import BeerAnimation from '@/components/BeerAnimation';
import type { Round, OrderItem } from '@/context/OrderContext';

interface IOrderListProps {
  paid: boolean;
}

const OrderList = ({ paid }: IOrderListProps) => {
  const { data: orders = [], isLoading } = useGetOrders(paid);
  const { mutate: updateOrder, isPending } = useUpdateOrder();
  const [openOrderId, setOpenOrderId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [showAnimation, setShowAnimation] = useState<boolean>(false);

  const handleMarkAsPaid = (orderId: string) => {
    setUpdatingId(orderId);
    updateOrder(
      { orderId, data: { paid: true } },
      {
        onSuccess: () => {
          setShowAnimation(true);
          setTimeout(() => setShowAnimation(false), 3000);
        },
        onSettled: () => setUpdatingId(null),
      }
    );
  };

  const toggleOrder = (orderId: string) => {
    setOpenOrderId((prev) => (prev === orderId ? null : orderId));
  };

  const sortedOrders = [...orders].sort(
    (a, b) => b.created.toMillis?.() - a.created.toMillis?.()
  );

  return (
    <div className="mt-6">
      {showAnimation && <BeerAnimation type="money" text="¡Orden pagada!" />}
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        {paid ? (
          <>
            <CheckCircle className="w-5 h-5 text-green-600" />
            Órdenes pagadas
          </>
        ) : (
          <>
            <DollarSign className="w-5 h-5 text-yellow-500" />
            Órdenes pendientes
          </>
        )}
      </h2>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center mt-10">
          <BeerAnimation type="beer" text="Cargando órdenes.." />
        </div>
      ) : sortedOrders.length === 0 ? (
        <p className="text-gray-500">No hay órdenes aún.</p>
      ) : (
        <ul className="space-y-4">
          {sortedOrders.map((order) => {
            const isOpen = openOrderId === order.id;
            const date = dayjs(order.created?.toDate?.()).format(
              'DD/MM/YYYY HH:mm'
            );
            const names = order.rounds?.map((r: Round) => r.name).join(', ');

            return (
              <li
                key={order.id}
                className="p-4 border rounded-lg shadow-sm bg-white transition-all"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <Link
                      href={`/orders/${order.id}`}
                      className="text-pink-600 text-sm underline"
                    >
                      <Eye size={14} className="inline mr-1" /> Ver detalle
                    </Link>

                    <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                      <CalendarDays size={14} /> {date}
                    </p>
                    {names && (
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <User size={14} /> {names}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-row">
                    <div className="text-right">
                      <p className="font-bold text-green-700 text-lg">
                        Total: ${order.subtotal}
                      </p>
                      {!paid && (
                        <button
                          onClick={() => handleMarkAsPaid(order.id)}
                          disabled={updatingId === order.id}
                          className="mt-2 px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 disabled:opacity-50"
                        >
                          {updatingId === order.id
                            ? 'Guardando...'
                            : 'Marcar como pagada'}
                        </button>
                      )}
                    </div>
                    <button
                      onClick={() => toggleOrder(order.id)}
                      className="ml-4 text-brand-pink hover:text-brand-cyclamen"
                    >
                      {isOpen ? <ChevronUp /> : <ChevronDown />}
                    </button>
                  </div>
                </div>

                <div
                  className={clsx(
                    'transition-all overflow-hidden',
                    isOpen ? 'max-h-40 mt-4' : 'max-h-0'
                  )}
                >
                  {order.rounds?.map((round: Round, idx: number) => (
                    <div
                      key={idx}
                      className="text-sm text-gray-600 border-t pt-2 mt-2"
                    >
                      <ul className="ml-4 list-disc">
                        {round.items.map((item: OrderItem, i: number) => (
                          <li key={i}>
                            {item.quantity} × {item.name} = ${item.total}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default OrderList;
