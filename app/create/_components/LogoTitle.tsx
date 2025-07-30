'use client';

import LookUp from '@/app/_data/Lookup';
import TitleDescription from './TitleDescription';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IFormData } from '@/app/_types/types';

interface LogoTitleProps {
  formData?: IFormData;
  onInputChange: (value: string) => void;
}

const LogoTitle = ({ onInputChange }: LogoTitleProps) => {
  const searchParams = useSearchParams();
  const inputName = searchParams.get('title') ?? '';

  const [title, setTitle] = useState(inputName);

  const handleInputChange = (value: string) => {
    setTitle(value);
    onInputChange(value);
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    title && onInputChange(title);
  }, [title]);

  return (
    <div className='my-10'>
      <TitleDescription
        title={LookUp.LogoTitle}
        description={LookUp.LogoTitleDesc}
      ></TitleDescription>

      <input
        type='text'
        placeholder={LookUp.InputPlaceholder}
        className='mt-5 w-full rounded-lg border p-4'
        value={title}
        onChange={(e) => handleInputChange(e.target.value)}
      />
    </div>
  );
};

export default LogoTitle;
