'use client';

import React from 'react';
import { Beer as BeerIcon } from 'lucide-react';
import { mockStock } from '@/app/mockData/mockStock';

const BeerList = () => {
  return (
    <div className="bg-white border border-brand-orchid p-6 rounded-xl shadow mb-4">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <BeerIcon className="w-5 h-5 text-brand-pink" />
        Cervezas disponibles
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {mockStock.map((beer) => (
          <li
            key={beer.name}
            className="card flex justify-between items-center"
          >
            <div>
              <p className="font-semibold text-brand-cyclamen">{beer.name}</p>
              <p className="text-sm text-brand-gray">
                Disponible: {beer.quantity}
              </p>
            </div>
            <span className="text-sm bg-brand-lightPurple px-3 py-1 rounded-full">
              ${beer.price}
            </span>
          </li>
        ))}
      </div>
    </div>
  );
};

export default BeerList;
