import React from 'react';
import { render } from '@testing-library/react';
import { OrderProvider } from '@/context/OrderContext';

const AllProviders = ({ children }: { children: React.ReactNode }) => {
  return <OrderProvider>{children}</OrderProvider>;
};

const customRender = (ui: React.ReactElement, options = {}) =>
  render(ui, { wrapper: AllProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
