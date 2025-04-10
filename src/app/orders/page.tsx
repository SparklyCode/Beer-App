'use client';

import { List } from 'lucide-react';
import dynamic from 'next/dynamic';

const OrderList = dynamic(() => import('@/components/OrderList'), {
    ssr: false,
  });

const OrdersPage = () => {
  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <List className="w-6 h-6 text-brand-pink" />
        Historial de Órdenes
      </h1>
      <OrderList paid={false} />
      <OrderList paid={true} />
    </main>
  );
};

export default OrdersPage;
