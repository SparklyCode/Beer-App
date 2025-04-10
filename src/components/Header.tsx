'use client';

import Link from 'next/link';
import { Beer, Home, ClipboardList } from 'lucide-react';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-brand-pink text-white h-[100px] px-6 shadow-md flex flex-col items-center justify-center">
      <div className="flex items-center gap-2 mb-1">
        <Beer className="w-6 h-6" />
        <h1 className="text-2xl font-bold tracking-wide">Cerveza App</h1>
      </div>

      <nav className="flex gap-6 text-sm font-medium">
        <Link
          href="/"
          className="flex items-center gap-1 hover:opacity-80 transition"
        >
          <Home className="w-4 h-4" />
          Home
        </Link>
        <Link
          href="/orders"
          className="flex items-center gap-1 hover:opacity-80 transition"
        >
          <ClipboardList className="w-4 h-4" />
          Tus órdenes
        </Link>
      </nav>
    </header>
  );
};

export default Header;
