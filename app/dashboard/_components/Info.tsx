'use client';
import { useContext } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import {
  UserDetailContext,
  UserDetailContextType,
} from '@/app/_context/UserDetailContext';

const Info = () => {
  const { userDetail } = useContext<UserDetailContextType>(UserDetailContext);

  return (
    <>
      <div className='flex items-center justify-between'>
        <h2 className='text-3xl font-bold text-pink-400'>
          Hello, {userDetail?.name}
        </h2>
        <div className='flex items-center gap-2'>
          <Image src={'/images/coin.png'} alt='coin' width={40} height={40} />
          <h2 className='text-3xl font-bold'>{userDetail?.credits}</h2>
        </div>
      </div>
      <div className='mt-6 flex items-center justify-between'>
        <h2 className='text-2xl font-bold'>Dashboard</h2>
        <Link href='/create'>
          <Button className='cursor-pointer bg-pink-400 hover:bg-pink-500'>
            + Create New Logo
          </Button>
        </Link>
      </div>
    </>
  );
};

export default Info;
