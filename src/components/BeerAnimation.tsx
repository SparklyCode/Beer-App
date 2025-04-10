'use client';

import Player from 'lottie-react';
import beerData from '@/animations/beer.json';
import moneyData from '@/animations/moneyRain.json';

type AnimationType = 'beer' | 'money';

interface IBeerAnimationProps {
  type: AnimationType;
  text?: string;
}

const BeerAnimation = ({ type, text }: IBeerAnimationProps) => {
  const animationData = type === 'beer' ? beerData : moneyData;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="flex flex-col items-center">
        <Player
          autoplay
          loop
          animationData={animationData}
          style={{ height: '180px', width: '180px' }}
        />
        {<p className="text-white mt-4 text-2xl"> {text}</p>}
      </div>
    </div>
  );
};

export default BeerAnimation;
