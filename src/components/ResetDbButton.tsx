'use client';

import { deleteAllOrders } from '@/lib/deleteAllOrders';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function ResetDbButton() {
  const [loading, setLoading] = useState(false);

  if (typeof window === 'undefined' || window.location.hostname !== 'localhost') return null;

  const handleReset = async () => {
    if (!confirm('¿Seguro que querés borrar TODAS las órdenes?')) return;

    setLoading(true);
    try {
      await deleteAllOrders();
      toast.success('Órdenes eliminadas 🧼');
    } catch (err) {
      toast.error('Error al eliminar las órdenes');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleReset}
      disabled={loading}
      className="fixed bottom-6 right-6 z-50 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded"
    >
      {loading ? 'Limpiando...' : '🧹 Reset DB'}
    </button>
  );
}
