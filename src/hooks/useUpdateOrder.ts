'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export function useUpdateOrder() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ orderId, data }: { orderId: string; data: any }) => {
      const ref = doc(db, 'orders', orderId);
      await updateDoc(ref, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders', true] });
      queryClient.invalidateQueries({ queryKey: ['orders', false] });
    },
  });

  return mutation;
}
