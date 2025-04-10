import React from 'react';
import AddRound from '@/components/AddRound';
import { OrderProvider } from '@/context/OrderContext';
import { render, screen, fireEvent } from '@/test-utils/test-utils';
import toast from 'react-hot-toast';

jest.mock('react-hot-toast', () => ({
  ...jest.requireActual('react-hot-toast'),
  error: jest.fn(),
  success: jest.fn(),
}));

describe('AddRound', () => {
  it('should show validation errors if form is empty', () => {
    render(
      <OrderProvider>
        <AddRound />
      </OrderProvider>
    );

    const button = screen.getByText(/Agregar ronda/i);
    fireEvent.click(button);

    expect(toast.error).toHaveBeenCalledWith(
      'Ingresá un nombre para la ronda',
      expect.any(Object)
    );
  });

  it('should add a round when form is valid', () => {
    render(
      <OrderProvider>
        <AddRound />
      </OrderProvider>
    );

    fireEvent.change(screen.getByPlaceholderText('¿Quién pide?'), {
      target: { value: 'Andrea' },
    });

    fireEvent.change(screen.getAllByRole('spinbutton')[0], {
      target: { value: '1' },
    });

    fireEvent.click(screen.getByText(/Agregar ronda/i));

    expect(screen.queryByText(/Ingresá un nombre/i)).not.toBeInTheDocument();
  });
});
