'use client';

import { Button } from '@/components/ui/button';
import LookUp from '../_data/Lookup';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Hero = () => {
  const router = useRouter();

  const [userInput, setUserInput] = useState('');

  const submit = () => {
    if (userInput.trim() === '') {
      return;
    }

    router.push(`/create?title=${encodeURIComponent(userInput.trim())}`);
  };

  return (
    <div className='mt-32 flex flex-col items-center gap-5'>
      <h2 className='text-center text-5xl font-bold text-pink-400'>
        {LookUp.HeroHeading}
      </h2>
      <h2 className='text-center text-5xl font-bold'>
        {LookUp.HeroSubHeading}
      </h2>
      <p className='text-center text-lg font-semibold text-gray-500'>
        {LookUp.HeroDesc}
      </p>

      <div className='flex w-full items-center justify-center gap-3 sm:flex-col md:flex-row'>
        <input
          className='w-full rounded-md border p-3 shadow-md sm:w-full md:w-1/3'
          type='text'
          placeholder={LookUp.InputPlaceholder}
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <Button
          className='cursor-pointer bg-pink-400 p-6 hover:bg-pink-500 sm:w-full md:w-40'
          disabled={userInput.trim() === ''}
          onClick={submit}
        >
          Get Started
        </Button>
      </div>
      <Image
        src={'/images/landing.png'}
        width={500}
        height={500}
        alt='landing'
        className='mt-7 h-full w-full'
      />
    </div>
  );
};

export default Hero;
