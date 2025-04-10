'use client';

import { useOrder } from '@/context/OrderContext';
import { Trash2, Beer } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const RoundSummary = () => {
  const { rounds, removeRound } = useOrder();

  if (rounds.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="round-summary"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.25 }}
        className="p-4 border rounded-lg bg-white shadow-sm mt-6 space-y-4"
      >
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Beer className="w-5 h-5 text-brand-pink" />
          Rondas agregadas
        </h3>

        <ul className="space-y-4">
          {rounds.map((round, index) => (
            <li key={index} className="border rounded p-3 bg-gray-50">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold">{round.name}</h4>
                <button
                  onClick={() => removeRound(index)}
                  className="text-red-500 hover:text-red-700"
                  title="Eliminar ronda"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <ul className="space-y-1 text-sm">
                {round.items.map((item) => (
                  <li key={item.name} className="flex justify-between">
                    <span>
                      {item.quantity} × {item.name}
                    </span>
                    <span className="font-medium">${item.total}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </motion.div>
    </AnimatePresence>
  );
};
export default RoundSummary;
