'use client';
import React from 'react';

import { createContext, useContext, useState, ReactNode } from 'react';

export type OrderItem = {
  name: string;
  pricePerUnit: number;
  quantity: number;
  total: number;
};

export type Round = {
  name: string;
  items: OrderItem[];
};

type OrderContextType = {
  items: OrderItem[];
  addItem: (name: string, price: number) => void;
  resetOrder: () => void;
  addRound: (round: Round) => void;
  removeRound: (index: number) => void;
  editRound: (index: number, updatedRound: Round) => void;
  rounds: Round[];
};

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<OrderItem[]>([]);
  const [rounds, setRounds] = useState<Round[]>([]);

  const resetOrder = () => {
    setItems([]);
    setRounds([]);
  };

  const addItem = (name: string, price: number) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.name === name);
      if (existing) {
        return prev.map((item) =>
          item.name === name
            ? {
                ...item,
                quantity: item.quantity + 1,
                total: (item.quantity + 1) * item.pricePerUnit,
              }
            : item
        );
      } else {
        return [
          ...prev,
          { name, pricePerUnit: price, quantity: 1, total: price },
        ];
      }
    });
  };

  const addRound = (round: Round) => {
    setRounds((prev) => [...prev, round]);

    setItems((prevItems) => {
      const next = [...prevItems];

      round.items.forEach((newItem) => {
        const existing = next.find((i) => i.name === newItem.name);
        if (existing) {
          existing.quantity += newItem.quantity;
          existing.total += newItem.total;
        } else {
          next.push({ ...newItem });
        }
      });

      return next;
    });
  };

  const removeRound = (index: number) => {
    const roundToRemove = rounds[index];
    if (!roundToRemove) return;

    setRounds((prev) => prev.filter((_, i) => i !== index));

    setItems((prevItems) => {
      const updated = [...prevItems];

      roundToRemove.items.forEach((removeItem) => {
        const existing = updated.find((i) => i.name === removeItem.name);
        if (existing) {
          existing.quantity -= removeItem.quantity;
          existing.total -= removeItem.total;
          if (existing.quantity <= 0) {
            const indexToRemove = updated.findIndex(
              (i) => i.name === existing.name
            );
            if (indexToRemove !== -1) updated.splice(indexToRemove, 1);
          }
        }
      });

      return updated;
    });
  };

  const editRound = (index: number, updatedRound: Round) => {
    removeRound(index);
    setTimeout(() => {
      setRounds((prev) => {
        const next = [...prev];
        next.splice(index, 0, updatedRound);
        return next;
      });
      addRound(updatedRound);
    }, 0);
  };

  return (
    <OrderContext.Provider
      value={{
        items,
        addItem,
        resetOrder,
        addRound,
        removeRound,
        editRound,
        rounds,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
}
