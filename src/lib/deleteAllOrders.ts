import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebase';

export async function deleteAllOrders() {
  const snapshot = await getDocs(collection(db, 'orders'));
  const deletions = snapshot.docs.map((d) => deleteDoc(doc(db, 'orders', d.id)));
  await Promise.all(deletions);
}
