import { useMutation } from '@tanstack/react-query';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { OrderItem } from '@/context/OrderContext';

type Round = {
  name: string;
  items: OrderItem[];
};

type NewOrder = {
  items: OrderItem[];
  rounds: Round[];
  subtotal: number;
};

export function useCreateOrder() {
  return useMutation({
    mutationFn: async ({ items, rounds, subtotal }: NewOrder) => {
      const order = {
        created: Timestamp.now(),
        paid: false,
        subtotal,
        taxes: 0,
        discounts: 0,
        items,
        rounds,
      };

      const docRef = await addDoc(collection(db, 'orders'), order);
      return docRef.id;
    },
  });
}
