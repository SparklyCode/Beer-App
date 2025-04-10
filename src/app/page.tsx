'use client';

import dynamic from 'next/dynamic';

const AddRound = dynamic(() => import('@/components/AddRound'), { ssr: false });
const RoundSummary = dynamic(() => import('@/components/RoundSummary'), { ssr: false });
const BeerList = dynamic(() => import('@/components/BeerList'), { ssr: false });
const PayOrderButton = dynamic(() => import('@/components/PayOrderButton'), { ssr: false });

const Home = () => {
  return (
    <main className="min-h-screen p-6 bg-brand-lightPurple text-gray-800">
      <AddRound />
      <RoundSummary />
      <BeerList />
      <PayOrderButton />
    </main>
  );
};

export default Home;
