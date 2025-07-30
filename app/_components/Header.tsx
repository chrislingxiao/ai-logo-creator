'use client';

import { Button } from '@/components/ui/button';
import { UserButton, useUser } from '@clerk/nextjs';

import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  const { user } = useUser();

  return (
    <div className='px=10 2xl: flex items-center justify-between p-4 px-56 lg:px-32 xl:px-48'>
      <Link href={'/'}>
        <Image src={'/logo.svg'} alt='logo' width={180} height={100} />
      </Link>
      <div className='flex items-center gap-3'>
        {user ? (
          <Link href={'/dashboard'}>
            <Button className='cursor-pointer bg-blue-400 hover:bg-blue-500'>
              Dashboard
            </Button>
          </Link>
        ) : (
          <Button className='cursor-pointer bg-pink-400 hover:bg-pink-500'>
            Get Started
          </Button>
        )}
        <UserButton />
      </div>
    </div>
  );
}
