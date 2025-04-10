export type Beer = {
  name: string;
  price: number;
  quantity: number;
};

export const mockStock: Beer[] = [
  { name: 'Corona', price: 115, quantity: 20 },
  { name: 'Quilmes', price: 120, quantity: 0 },
  { name: 'Club Colombia', price: 110, quantity: 3 },
];
