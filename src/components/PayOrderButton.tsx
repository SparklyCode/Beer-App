'use client';

import { useOrder } from '@/context/OrderContext';
import toast from 'react-hot-toast';
import BeerAnimation from '@/components/BeerAnimation';
import { useCreateOrder } from '@/hooks/useCreateOrder';
import { FileText, CheckCircle, XCircle } from 'lucide-react';

const PayOrderButton = () => {
  const { items, rounds, resetOrder } = useOrder();
  const { mutate, isPending } = useCreateOrder();

  const subtotal = items.reduce((acc, item) => acc + item.total, 0);

  const handleSubmit = () => {
    if (items.length === 0) return;

    mutate(
      { items, rounds, subtotal },
      {
        onSuccess: (id) => {
          toast.success('Orden enviada con éxito', {
            icon: <CheckCircle className="text-green-600" />,
          });
          resetOrder();
        },
        onError: (err) => {
          console.error(err);
          toast.error('Error guardando la orden', {
            icon: <XCircle className="text-red-600" />,
          });
        },
      }
    );
  };

  return isPending ? (
    <div className="flex flex-col items-center mt-6 absolute">
      <BeerAnimation type="beer" text="Creando tu orden..." />
    </div>
  ) : (
    <button
      className="bg-brand-pink hover:bg-brand-cyclamen text-white px-4 py-2 rounded font-bold mt-4 disabled:bg-gray-300 disabled:text-gray-600 disabled:cursor-not-allowed flex items-center gap-2"
      onClick={handleSubmit}
      disabled={rounds.length === 0}
    >
      <FileText size={18} />
      Crear Orden
    </button>
  );
};
export default PayOrderButton;
