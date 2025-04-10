import { useQuery } from '@tanstack/react-query';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export function useGetOrderById(orderId: string) {
  return useQuery({
    queryKey: ['order', orderId],
    queryFn: async () => {
      const ref = doc(db, 'orders', orderId);
      const snap = await getDoc(ref);
      const data = snap.data();

      return {
        id: snap.id,
        created: data?.created.toDate().toLocaleString(),
        paid: data?.paid,
        subtotal: data?.subtotal,
        items: data?.items || [],
        rounds: data?.rounds || [],
      };
    },
    enabled: !!orderId,
  });
}
