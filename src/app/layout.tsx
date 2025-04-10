import { Inter } from 'next/font/google';
import './globals.css';
import { ReactNode } from 'react';
import { OrderProvider } from '@/context/OrderContext';
import { ReactQueryProvider } from '@/lib/ReactQueryProvider';
import Header from '@/components/Header';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'CervezaApp 🍻',
  description: 'Frontend challenge by Andrea',
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-brand-lightPurple text-gray-800`}>
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: '#fff',
              color: '#F686BD',
              fontWeight: '500',
              borderRadius: '0.75rem',
            },
            success: {
              iconTheme: {
                primary: '#FE5D9F',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#BE52B2',
                secondary: '#fff',
              },
            },
          }}
        />

        <Header />

        <ReactQueryProvider>
          <OrderProvider>{children}</OrderProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
};
