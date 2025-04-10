import BeerList from '@/components/BeerList';
import PayOrderButton from '@/components/PayOrderButton';
import AddRound from '@/components/AddRound';
import RoundSummary from '@/components/RoundSummary';

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
