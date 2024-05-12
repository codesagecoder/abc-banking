"use client"

import CountUp from 'react-countup';

const AnimatedCounter = ({ amount }: { amount: number }) => {
  return (
    <CountUp
      className='w-full'
      decimals={2}
      prefix='$'
      decimal=','
      end={amount}
    />
  );
}

export default AnimatedCounter;