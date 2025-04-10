'use client';
import React from 'react';
import { useState } from 'react';
import { useOrder } from '@/context/OrderContext';
import toast from 'react-hot-toast';
import { UsersRound, Edit3, AlertCircle } from 'lucide-react';
import { mockStock, Beer } from '@/app/mockData/mockStock';

const AddRound = () => {
  const [name, setName] = useState('');
  const [selected, setSelected] = useState<Record<string, number>>({});
  const { addRound } = useOrder();

  const handleQuantityChange = (beer: Beer, qty: number) => {
    setSelected((prev) => ({
      ...prev,
      [beer.name]: qty,
    }));
  };

  const handleAdd = () => {
    if (!name.trim()) {
      toast.error('Ingresá un nombre para la ronda', {
        icon: <Edit3 className="text-brand-pink" />,
      });
      return;
    }

    if (Object.values(selected).every((q) => q === 0)) {
      toast.error('Seleccioná al menos una cerveza', {
        icon: <AlertCircle className="text-brand-pink" />,
      });
      return;
    }

    const items = Object.entries(selected)
      .filter(([, qty]) => qty > 0)
      .map(([beerName, qty]) => {
        const beer = mockStock.find((b) => b.name === beerName)!;
        return {
          name: beer.name,
          pricePerUnit: beer.price,
          quantity: qty,
          total: beer.price * qty,
        };
      });

    addRound({ name, items });

    setName('');
    setSelected({});
  };

  return (
    <div className="bg-white border border-brand-orchid p-6 rounded-xl shadow mb-4">
      <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
        <UsersRound className="w-5 h-5 text-brand-pink" />
        Agregar nueva ronda
      </h3>

      <input
        type="text"
        placeholder="¿Quién pide?"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border px-3 py-2 rounded"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {mockStock.map((beer) => (
          <div key={beer.name} className="border rounded p-3">
            <p className="font-medium">{beer.name}</p>
            <p className="text-sm text-gray-500">${beer.price}</p>
            <input
              type="number"
              min={0}
              max={beer.quantity}
              value={selected[beer.name] || 0}
              className="mt-2 w-full border px-2 py-1 rounded"
              disabled={beer.quantity === 0}
              onChange={(e) => {
                const value = parseInt(e.target.value) || 0;
                const safeValue = Math.min(value, beer.quantity);
                handleQuantityChange(beer, safeValue);
              }}
            />
          </div>
        ))}
      </div>

      <button
        onClick={handleAdd}
        className="bg-brand-pink hover:bg-brand-cyclamen text-white px-4 py-2 rounded mt-4"
      >
        Agregar ronda
      </button>
    </div>
  );
};

export default AddRound;
