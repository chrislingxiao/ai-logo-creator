import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React from 'react';

const LogoDone = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('.');
  };

  return (
    <div className='flex flex-col items-center justify-center gap-10 text-center'>
      <p>Thank you for creating your logo!</p>
      <Button
        className='w-60 cursor-pointer bg-pink-400 hover:bg-pink-500'
        onClick={handleClick}
      >
        Go to dashboard
      </Button>
    </div>
  );
};

export default React.memo(LogoDone);
