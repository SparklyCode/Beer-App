'use client';

import { useQuery } from '@tanstack/react-query';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

export function useGetOrders(paid: boolean) {
  return useQuery({
    queryKey: ['orders', paid],
    queryFn: async () => {
      const q = query(collection(db, 'orders'), where('paid', '==', paid));
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          created: data.created.toDate().toLocaleString(),
          subtotal: data.subtotal,
          paid: data?.paid,
          items: data?.items || [],
          rounds: data?.rounds || [],
        };
      });
    },
  });
}
