'use client';

import LookUp from '@/app/_data/Lookup';
import TitleDescription from './TitleDescription';
import { useEffect } from 'react';
import Image from 'next/image';
import { IFormData } from '@/app/_types/types';
import { Button } from '@/components/ui/button';
import { useUser, SignInButton } from '@clerk/nextjs';
import Link from 'next/link';

interface LogoIdeaProps {
  formData: IFormData;
}

const PriceModel = ({ formData }: LogoIdeaProps) => {
  const { user } = useUser();
  const isBrowser = typeof window !== 'undefined';
  useEffect(() => {
    if (isBrowser && formData?.title) {
      try {
        localStorage.setItem('formData', JSON.stringify(formData));
      } catch (error) {
        console.error('localStorage error:', error);
      }
    }
  }, [formData]);

  return (
    <div className='my-10'>
      <TitleDescription
        title={LookUp.LogoPricingModelTitle}
        description={LookUp.LogoPricingModelDesc}
      ></TitleDescription>

      <div className='mt-10 grid grid-cols-1 gap-10 md:grid-cols-2'>
        {LookUp.PriceOptions.map((option, idx) => {
          return (
            <div
              className='flex flex-col items-center rounded-xl border p-5'
              key={idx}
            >
              <Image
                src={option.icon}
                alt={option.title}
                width={60}
                height={60}
              />
              <h2 className='text-2xl font-medium'>{option.title}</h2>
              <div>
                {option.features?.map((feature, featureIdx) => (
                  <h2
                    key={`${idx}-${featureIdx}`}
                    className='mt-3 text-lg text-gray-600'
                  >
                    {feature}
                  </h2>
                ))}
              </div>
              {user ? (
                <Link href={'/logoCreator?type=' + option.title}>
                  <Button className='mt-5 cursor-pointer bg-pink-400 hover:bg-pink-500'>
                    {option.button}
                  </Button>
                </Link>
              ) : (
                <SignInButton
                  mode='modal'
                  forceRedirectUrl={'/logoCreator?type=' + option.title}
                >
                  <Button className='mt-5 cursor-pointer bg-pink-400 hover:bg-pink-500'>
                    {option.button}
                  </Button>
                </SignInButton>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PriceModel;
